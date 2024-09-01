import React from "react";
import BondTemplate from "./BondTemplate";

const BondGenerate = () => {
  const bondData = {
    farmer: { name: "John Doe", type: "individual", address: "123 Farmer's Lane" },
    buyer: { name: "Jane Smith", type: "corporation", address: "456 Market Street" },
    propertyType: "Crops",
    minPrice: "500,000",
    date: "1st September, 2024",
  };

  return (
    <div>
      <BondTemplate {...bondData} />
    </div>
  );
};

export default BondGenerate;
