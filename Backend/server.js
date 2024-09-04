// <<<<<<< HEAD
const port = process.env.PORT || 4000;
const multer = require("multer");
const path = require("path");
const cors = require("cors");
const fs = require("fs");
const { type } = require("os");
require('dotenv').config();
const express = require("express");
const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

const Farmer = require("./models/Farmer");
const Buyer = require("./models/Buyer");

const app = express();
app.use(express.json());
app.use(cors());

const DATABASE =process.env.DATABASE;
const BASE_URL = process.env.BASE_URL;
const jwtSecret = "secret_agri";

//connecting with database
mongoose
  .connect(DATABASE)
  .then(() => console.log("Connected to MongoDB"))
  .catch((err) => console.log("Failed to connect to MongoDB", err));

//Auth middleware
function authMiddleware(req, res, next) {
  const authHeader = req.headers["authorization"];
  
  if (!authHeader) {
    // console.log("Token is not there");
    return res.status(403).send("Token is required");
  }
  
  // Split the authHeader to remove "Bearer " prefix
  const token = authHeader.split(' ')[1];
  // console.log(token);
  if (!token) {
    return res.status(403).send("Token format is invalid");
  }

  jwt.verify(token, jwtSecret, (err, user) => {
    if (err) {
      return res.status(403).send("Invalid token");
    }

    req.user = user; // Store user information from the token payload
    // console.log(req.user);
    next(); // Proceed to the next middleware or route handler
  });
}

// Serve images statically
app.use('/images', express.static(path.join(__dirname, 'upload/images')));

// Set up Multer for image upload
const storage = multer.diskStorage({
  destination: './upload/images',
  filename: (req, file, cb) => {
   cb(null, `${Date.now()}-${file.originalname}`);
  },
  });
  
  const upload = multer({ storage });

// Buyer Registration 
app.post('/register/buyer', upload.single('photo'), async (req, res) => {
  try {
    const { username, email, aadhar, password, address} = req.body;
    if (!username) {
      return res.status(400).json({ error: 'Username is required' });
    }
    const hashedPassword = await bcrypt.hash(password, 10);

    const newBuyer = new Buyer({
      photo: req.file ? req.file.filename : '',
      username,
      email,
      aadhar,
      password: hashedPassword,
      address,
    });

    await newBuyer.save();

    // Log the newly created buyer
    console.log('New Buyer:', newBuyer);

    const token = jwt.sign({ id: newBuyer._id, role: 'buyer' }, jwtSecret, { expiresIn: "1h" });

    res.json({ message: `${username} registered successfully`, token });
  } catch (error) {
    console.error('Error in Buyer Registration:', error);
    res.status(400).json({ error: error.message });
  }
});

// Farmer Registration 
app.post('/register/farmer', upload.single('photo'), async (req, res) => {
  try {
    const { username, email, aadhar, password, address, land, productCategory, products, bankName,accnum,isfccode, branch, } = req.body;

    const hashedPassword = await bcrypt.hash(password, 10);

    const bankDetails = {
      bankName,
      accnum,
      isfccode,
      branch,
    };
    const newFarmer = new Farmer({
      photo: req.file ? req.file.filename : '',
      username,
      email,
      aadhar,
      password: hashedPassword,
      address,
      land,
      productCategory,
      products,
      bankDetails,
    });

    await newFarmer.save();

    // Log the newly created farmer
    console.log('New Farmer:', newFarmer);

    const token = jwt.sign({ id: newFarmer._id, role: 'farmer' }, jwtSecret, { expiresIn: "1h" });

    res.json({ message: `${username} registered successfully`, token });
  } catch (error) {
    console.error('Error in Farmer Registration:', error);
    res.status(400).json({ error: error.message });
  }
});
  
//Creating API for user login
app.post("/login", async (req, res) => {
  const { email, password, role } = req.body;

  try {
    let user;
    if (role === "farmer") {
      user = await Farmer.findOne({ email });
    } else if (role === "buyer") {
      user = await Buyer.findOne({ email });
    } else {
      return res.status(400).send("Invalid role");
    }

    if (!user || !(await bcrypt.compare(password, user.password))) {
      return res.status(401).send("Invalid credentials");
    }

    const token = jwt.sign({ id: user._id, role }, jwtSecret, {
      expiresIn: "1h",
    });
    res.json({ token });
  } catch (error) {
    res.status(500).send(error.message);
  }
});

//Creating API for fetching all users
app.get("/allfarmers", async (req, res) => {
  let Farmers = await Farmer.find({});
  console.log("All Farmers are fetched");
  res.send(Farmers);
});

app.get("/allbuyers", async (req, res) => {
  let Buyers = await Buyer.find({});
  console.log("All Buyers are fetched");
  res.send(Buyers);
});

//API to get farmer details
app.get("/farmers/me", authMiddleware, async (req, res) => {
  const farmer = await Farmer.findById(req.user.id);
  if (!farmer) return res.status(404).send("Farmer not found");
  res.json(farmer);
});

//API to get buyer details
app.get("/buyers/me", authMiddleware, async (req, res) => {
  const buyer = await Buyer.findById(req.user.id);
  if (!buyer) return res.status(404).send("Buyer not found");
  res.json(buyer);
});

//API for adding buyer's posts
app.post("/buyers/me/post", authMiddleware, async (req, res) => {
  try {
    const newpost = {
      productCategory: req.body.productCategory,
      product: req.body.product,
      minPrice: req.body.minPrice,
      agreementType: req.body.agreementType,
    };
    const buyer = await Buyer.findById(req.user.id);
    buyer.posts.push(newpost);
    await buyer.save();
    res.json(buyer);
  } catch (err) {
    res.status(500).send("Server error");
  }
});

// API for deleting a buyer's post
app.delete(
  "/buyers/:buyerId/posts/:postId",
  authMiddleware,
  async (req, res) => {
    try {
      const { buyerId, postId } = req.params;

      // Find the buyer by ID
      const buyer = await Buyer.findById(buyerId);
      if (!buyer) {
        return res.status(404).send("Buyer not found");
      }

      // Find the index of the post to be deleted
      const postIndex = buyer.posts.findIndex(
        (post) => post._id.toString() === postId
      );
      if (postIndex === -1) {
        return res.status(404).send("Post not found");
      }

      // Remove the post from the array
      buyer.posts.splice(postIndex, 1);

      // Save the updated buyer document
      await buyer.save();

      res.json({ success: true, message: "Post deleted successfully" });
    } catch (err) {
      res.status(500).send("Server error");
    }
  }
);

//Creating API for requesting for agreement by buyers to farmer
app.post(
  "/farmers/:id/agreements/request",
  authMiddleware,
  async (req, res) => {
    const { productType, product, minPrice, agreementType } = req.body;
    const buyerId = req.user.id;
    const farmer = await Farmer.findById(req.params.id);
    if (!farmer) return res.status(404).send("Farmer not found");

    const buyer = await Buyer.findById(buyerId);
    if (!buyer) return res.status(404).send("Buyer not found");

    // Notify Farmer
    farmer.notifications.push({
      message: `Agreement requested by ${buyer.username} for ${productType} -${product}`,
      type: "Request",
    });
    await farmer.save();

    //Updating framer's agreement request
    const buyerName = buyer.username;
    const farmerId = req.params.id;
    farmer.agreeRequest.push({
      buyerId,
      farmerId,
      buyerName,
      productType,
      product,
      minPrice,
      agreementType,
    });
    await farmer.save();
    // Notify Buyer
    buyer.notifications.push({
      message: `You have requested an agreement with ${farmer.username} for ${productType} - ${product}`,
      type: "Request",
    });
    await buyer.save();

    res.send("Agreement request sent");
  }
);

//API for applying for agreement with buyer by farmer
app.post("/buyers/:id/posts/apply", authMiddleware, async (req, res) => {
  const {  productType, product, minPrice, agreementType } = req.body;
  const farmerId =req.user.id;
  const buyer = await Buyer.findById(req.params.id);
  if (!buyer) return res.status(404).send("Buyer not found");

  const farmer = await Farmer.findById(farmerId);
  if (!farmer) return res.status(404).send("Farmer not found");

  // Notify Buyer
  buyer.notifications.push({
    message: `${farmer.username} applied to your post for ${productType} - ${product}`,
    type: "Request",
  });
  await buyer.save();

  //Updating buyer's agreement request
  const farmerName = buyer.username;
  const buyerId = req.params.id;
  buyer.agreeRequest.push({
    buyerId,
    farmerId,
    farmerName,
    productType,
    product,
    minPrice,
    agreementType,
  });
  await buyer.save();

  // Notify Farmer
  farmer.notifications.push({
    message: `You applied to ${buyer.username}'s post for ${productType} - ${product}`,
    type: "Request",
  });
  await farmer.save();

  res.send("Application sent");
});

//API for accepting agreement
app.post("/agreements/accept", authMiddleware, async (req, res) => {
  const { farmerId, buyerId, productType, product, minPrice, agreementType } =
    req.body;
  const farmer = await Farmer.findById(farmerId);
  const buyer = await Buyer.findById(buyerId);

  if (!farmer || !buyer)
    return res.status(404).send("Farmer or Buyer not found");

  const newAgreement = {
    farmerId: farmerId,
    buyerId: buyerId,
    farmerName: farmer.username,
    buyerName: buyer.username,
    productType,
    product,
    minPrice,
    agreementType,
  };

  farmer.agreements.push(newAgreement);
  buyer.agreements.push(newAgreement);

  // Notify Farmer and Buyer
  farmer.notifications.push({
    message: `Agreement confirmed with ${buyer.username} for ${productType} - ${product}`,
    type: "Agreement",
  });
  buyer.notifications.push({
    message: `Agreement confirmed with ${farmer.username} for ${productType} - ${product}`,
    type: "Agreement",
  });

  await farmer.save();
  await buyer.save();

  res.send("Agreement accepted and saved");
});

// Deleting agreeRequest from a farmer's document
app.delete(
  "/farmers/:farmerId/agreerequest/:requestId",
  authMiddleware,
  async (req, res) => {
    try {
      const { farmerId, requestId } = req.params;

      // Find the farmer by ID
      const farmer = await Farmer.findById(farmerId);
      if (!farmer) {
        return res.status(404).send("Farmer not found");
      }

      // Find the index of the request to be deleted
      const reqIndex = farmer.agreeRequest.findIndex(
        (req) => req._id.toString() === requestId
      );
      if (reqIndex === -1) {
        return res.status(404).send("Request not found");
      }

      // Remove the request from the array
      farmer.agreeRequest.splice(reqIndex, 1);

      // Save the updated farmer document
      await farmer.save();

      res.json({
        success: true,
        message: "Agreement request deleted successfully",
      });
    } catch (err) {
      console.error(err);
      res.status(500).send("Server error");
    }
  }
);

// Deleting agreeRequest from a buyer's document
app.delete(
  "/buyers/:buyerId/agreerequest/:requestId",
  authMiddleware,
  async (req, res) => {
    try {
      const { buyerId, requestId } = req.params;

      // Find the buyer by ID
      const buyer = await Buyer.findById(buyerId);
      if (!buyer) {
        return res.status(404).send("Buyer not found");
      }

      // Find the index of the request to be deleted
      const reqIndex = buyer.agreeRequest.findIndex(
        (req) => req._id.toString() === requestId
      );
      if (reqIndex === -1) {
        return res.status(404).send("Request not found");
      }

      // Remove the request from the array
      buyer.agreeRequest.splice(reqIndex, 1);

      // Save the updated buyer document
      await buyer.save();

      res.json({
        success: true,
        message: "Agreement request deleted successfully",
      });
    } catch (err) {
      console.error(err);
      res.status(500).send("Server error");
    }
  }
);

// Endpoint to get all posts for a specific buyer
app.get('/buyer/:buyerId/posts', async (req, res) => {
      const buyerId = req.params.buyerId;
      let posts=[];
      // Fetch all posts associated with the buyerId
      const buyer = await Buyer.findById(buyerId);
      if (buyer)  posts = buyer.posts;
      res.json(posts);
});

//API for fetching agreements
app.get("/agreements", authMiddleware, async (req, res) => {
  const { id, role } = req.user;
  let agreements = [];

  if (role === "farmer") {
    const farmer = await Farmer.findById(id);
    if (farmer) agreements = farmer.agreements;
  } else if (role === "buyer") {
    const buyer = await Buyer.findById(id);
    if (buyer) agreements = buyer.agreements;
  }
  res.json(agreements);
});

//API for fetching agreement requests
app.get("/agreerequest", authMiddleware, async (req, res) => {
  const { id, role } = req.user;
  let requests = [];

  if (role === "farmer") {
    const farmer = await Farmer.findById(id);
    if (farmer) requests = farmer.agreeRequest;
  } else if (role === "buyer") {
    const buyer = await Buyer.findById(id);
    if (buyer) requests = buyer.agreeRequest;
  }
  res.json(requests);
});

//API for fetching notifications
app.get("/notifications", authMiddleware, async (req, res) => {
  const { id, role } = req.user;
  let notifications = [];
  if (role === "farmer") {
    const farmer = await Farmer.findById(id);
    if (farmer) notifications = farmer.notifications;
  } else if (role === "buyer") {
    const buyer = await Buyer.findById(id);
    if (buyer) notifications = buyer.notifications;
  }
  res.json(notifications);
});

//API to mark an unread message to read
app.patch(
  "/notifications/:notificationId/read",
  authMiddleware,
  async (req, res) => {
    const { id, role } = req.user;
    const { notificationId } = req.params;
    let user;

    if (role === "farmer") {
      user = await Farmer.findById(id);
    } else if (role === "buyer") {
      user = await Buyer.findById(id);
    }

    if (!user) return res.status(404).send("User not found");

    // Find the specific notification
    const notification = user.notifications.id(notificationId);
    if (!notification) return res.status(404).send("Notification not found");

    // Update the status to 'Read'
    notification.status = "Read";

    await user.save();

    res.send("Notification marked as read");
  }
);

app.listen(port, (error) => {
  if (!error) console.log(`Server running on port ${port}`);
  else console.log("Error : " + error);
});
// =======
// //main server
// >>>>>>> a5a7169f02ebed25572dadebf8d6ad83c61e538b
