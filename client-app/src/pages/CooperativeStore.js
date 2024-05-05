import React, { useState, useEffect } from "react";
import { DisplayStore } from "../components";

var products = [{ name: "", desc: "", price: "", status: "" }];
export function CooperativeStore() {
  return (
    <div className="w-100">
      <h3>Your MarketPlace For High-Quality </h3>
      <h1>Digital Products </h1>
      <DisplayStore title="All Campaigns" products={products} />
    </div>
  );
}
