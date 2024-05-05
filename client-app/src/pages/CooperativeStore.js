import React from "react";
import { DisplayProduct } from "../components";

var products = [
  {
    name: "Digital Painting",
    img_url: "https://public-files.gumroad.com/s0w3cmhelgdlnm8dmupxolqgk233",
    desc: "Ghibli-style landscape. In this 36 page PDF you'll be guided through the process of painting digitally.",
    price: "0.35",
    status: "available",
    supported_campaign_pid: 1,
    more: "In this 36 page PDF you'll be guided through the process of painting digitally. This tutorial takes you from opening photoshop for the first time to creating a finished illustration. Tools and techniques are explained along the way in beginner-friendly language, with handy arrows showing you where to click. You'll also get a PSD of my painting, so you can look through each of my layers and see how this piece was made.",
  },
  {
    name: "The Doodle Library",
    img_url: "https://public-files.gumroad.com/jspgh3g5dcwuwlpdbie2ft6kjgod",
    desc: "Over a thousand unique hand drawn line art doodles. Illustration in SVG and PNG formats.",
    price: "0.25",
    status: "available",
    supported_campaign_pid: 2,
    more: "Over a thousand unique hand drawn line art doodles. Open path illustration in SVG and PNG formats designed to increase comprehension, retention, and delight audiences with simple animations, stick figures, faces, expressions, places, animals, objects, transportation, special characters, food, mythical beings and simple shapes",
  },

  {
    name: "Cyberpunk Wallpaper",
    img_url: "https://public-files.gumroad.com/yesd70soe2b27oh2d7i2v143csko",
    desc: "Mobile wallpaper with futuristic neon-glitch effects inspired by Cyberpunk 2077.",
    price: "0.25",
    status: "available",
    supported_campaign_pid: 3,
    more: "Mobile wallpaper with futuristic neon-glitch effects inspired by Cyberpunk 2077.",
  },
];

export function CooperativeStore() {
  return (
    <div className="w-100 text-white px-3 py-2">
      <div className="text-center">
        <h3>Your Marketplace For High-Quality </h3>
        <h1>Digital Products</h1>
      </div>

      <div className="d-flex justify-content-around p-3">
        <DisplayProduct products={products} />
      </div>
    </div>
  );
}
