import React, { useEffect } from "react";
import html2canvas from "html2canvas";
import { jsPDF } from "jspdf";
import "./BondTemplate.css";

const BondTemplate = ({ farmer, buyer, productType, minPrice, date, address }) => {
  const downloadBond = async () => {
    const bondElement = document.getElementById("bond");

    // Wait for images to load before capturing the canvas
    const loadImages = () => {
      return new Promise((resolve) => {
        const images = Array.from(bondElement.getElementsByTagName("img"));
        let loadedCount = 0;
        images.forEach((img) => {
          img.onload = () => {
            loadedCount++;
            if (loadedCount === images.length) {
              resolve();
            }
          };
          // Handle cached images that might not trigger onload
          if (img.complete) {
            loadedCount++;
            if (loadedCount === images.length) {
              resolve();
            }
          }
        });
      });
    };

    await loadImages();

    // Capture the bond content as a canvas
    const canvas = await html2canvas(bondElement, {
      scale: 2, // Higher scale for better quality
      useCORS: true, // Enable cross-origin image support
      logging: true, // Enable console logging for debugging
      width: bondElement.scrollWidth, // Use the full width of the element
      height: bondElement.scrollHeight, // Use the full height of the element
    });

    const imgData = canvas.toDataURL("image/png");
    const pdf = new jsPDF({
      orientation: "portrait",
      unit: "mm",
      format: "a4",
    });

    const pageWidth = pdf.internal.pageSize.getWidth();
    const imgWidth = pageWidth - 20; // Margins for borders
    const imgHeight = (canvas.height * imgWidth) / canvas.width;

    pdf.addImage(imgData, "PNG", 10, 10, imgWidth, imgHeight);
    pdf.save("Farm_Purchase_Agreement.pdf");
  };
  farmer="Ramappa"
  buyer="Manoj"
  productType = "Crops"
  minPrice="5000"
  date="09/01/2024"
  address='Tumkur'
  return (
    <div>
        {console.log( farmer, buyer, productType, minPrice, date, address)};
      <div className="container" id="bond">
        <header>
          <div className="gov-info">
            <h1 className="logo">Government of India</h1>
          </div>
          <div className="state-info">State of Karnataka</div>
          <div className="revision-info">Rev. 1348D1E</div>
        </header>

        <h1>FARM PRODUCT PURCHASE AGREEMENT</h1>
        <p>
          This Farm Product Purchase Agreement (this “Agreement”) is entered into as of
          the {date} by and among/between:
        </p>

        <div className="party-info">
          <div className="party">
            <label><strong>Farmer:</strong></label> <strong>{farmer}</strong>.
          </div>

          <div className="party">
            <label><strong>Buyer:</strong></label> <strong>{buyer}</strong>.
          </div>
        </div>

        <p>
          Each Farmer and Buyer may be referred to in this Agreement
          individually as a “Party” and collectively as the “Parties.”
        </p>

        <h2>1. Property</h2>
        <p>
          Farmer hereby agrees to sell to Buyer, and Buyer hereby agrees to
          purchase from Farmer (the “Transaction”), the following agricultural
          products and assets:
        </p>

        <ul>
          <li>
            <input
              type="radio"
              name="property_type"
              checked={productType === "Poultry"}
              readOnly
            />{" "}
            Poultry
          </li>
          <li>
            <input
              type="radio"
              name="property_type"
              checked={productType === "Dairy"}
              readOnly
            />{" "}
            Dairy (including all livestock)
          </li>
          <li>
            <input
              type="radio"
              name="property_type"
              checked={productType === "Crops"}
              readOnly
            />{" "}
            Crops
          </li>
        </ul>

        <p>
          The sale does not include any real estate or land. The products being
          sold are located at {address}.
        </p>

        <h2>2. Purchase Price</h2>
        <p>
          The purchase price for the Property is ₹{minPrice}(the “Purchase Price”) payable by Buyer as follows:
        </p>

        <ul>
          <li>
            (A) Earnest Money Deposit. ₹1000 (the “Deposit”), due upon the
            signing of this Agreement, the receipt of which is hereby
            acknowledged, to be held in escrow pursuant to this Agreement. The
            Deposit shall be applied to the Purchase Price at the Closing.
          </li>
          <li>
            (B) Closing Balance. The remainder of the Purchase Price is due upon
            the delivery of the products/assets at the Closing. This amount is
            subject to change based on adjustments made pursuant to this
            Agreement.
          </li>
        </ul>

        <p>
          Unless otherwise stated in the Agreement, all payments shall be made
          in proceeds that are immediately available to Farmer by one of the
          following methods:
        </p>

        <ul>
          <li>
            <input type="checkbox" defaultChecked /> Official bank check
          </li>
          <li>
            <input type="checkbox" /> Personal check
          </li>
        </ul>

        <img
          src="https://static.vecteezy.com/system/resources/previews/006/566/283/non_2x/verified-stamp-rubber-style-red-round-grunge-approved-sign-rubber-stamp-on-white-illustration-free-vector.jpg"
          alt="Verified Stamp"
          className="verified-stamp"
        />
      </div>
      <button onClick={downloadBond}>Download Bond</button>
    </div>
  );
};

export default BondTemplate;
