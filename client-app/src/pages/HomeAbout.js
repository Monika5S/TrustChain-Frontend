import React from "react";
import { Link } from "react-router-dom";

function HomeAbout() {
  return (
    <div className="bg-light-subtle p-4">
      <header className="p-3 m-3 rounded">
        <h1>👋 Welcome to TrustChain </h1>
        <p>
          Shop with Purpose, Make a Difference At TrustChain, we bring together
          trusted stores and charities to create a seamless expereience for you
          to support causes you care about, simply by purchasing the products.
        </p>
      </header>
      <main>
        <section className="bg-secondary p-3 m-3 border border-0 rounded text-dark">
          <h2>⚙️ Get Started</h2>
          <p>Sign up or log in to access the platform.</p>
          <nav>
            <ul>
              <li>
                <Link to="/login" className="fw-bold">
                  Login
                </Link>
              </li>
              <li>
                <Link to="/sign-up" className="fw-bold">
                  Sign Up
                </Link>
              </li>
            </ul>
          </nav>
        </section>

        <div className="p-3 m-3 rounded">
          <h3>⚒️ How It Works</h3>
          <h6>Browse Products</h6>
          <p>
            Shop for products from stores that commit to giving back. Each store
            sets a donation percentage from your purchase price that goes
            directly to charity.
          </p>
          <h6>Support a Charity</h6>
          <p>
            When you select a product, you'll also choose a charity campaign
            from store supported charity organization.
          </p>
          <h6>Purchase and Donate</h6>
          <p>
            Complete your purchase using your wallet (MetaMask), and watch as a
            portion of your payment is directly transferred to the charity.
          </p>
          <h6>Get Your Payment Receipt</h6>
          <p>
            After your purchase, you'll receive a transaction receipt with order
            and donation details.
          </p>
        </div>

        <h6 className="bg-secondary p-3 m-3 border rounded text-dark">
          🌍 Join the Movement
          <br /> Whether you're shopping for a product or supporting a cause,
          TrustChain lets you make a real difference with every purchase. Ready
          to get started? Log in or sign up today.
        </h6>
      </main>
      <footer>
        <p>&copy; 2024 Our Platform. All rights reserved. 🌟</p>
      </footer>
    </div>
  );
}

export default HomeAbout;
