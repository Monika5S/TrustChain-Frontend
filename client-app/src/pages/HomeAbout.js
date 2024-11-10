import React from "react";
import { Link } from "react-router-dom";
import { donation } from "../assets";

function HomeAbout() {
  return (
    <div className="bg-primary-subtle">
      <header
        className="text-center py-5"
        style={{
          backgroundImage:
            "url(https://bbdniit.ac.in/wp-content/uploads/2020/09/banner-background-without-image-min.jpg)",
        }}
      >
        <div className="container">
          <h1 className="display-4 fw-bold mb-3">👋 Welcome to TrustChain</h1>
          <p className="lead mb-4">
            Shop with Purpose, Make a Difference. At TrustChain, we bring
            together trusted stores and charities to create a seamless
            experience for you to pay forward simply by purchasing products.
          </p>
          <Link
            to="/sign-up"
            className="btn btn-lg btn-outline-dark px-4 py-2 rounded-pill shadow-sm"
          >
            Get Started
          </Link>
        </div>
      </header>

      <main className="container mt-5">
        <section className="row align-items-center bg-white-subtle p-5 rounded-4 shadow-lg my-4">
          <div className="col-md-6 mb-4 mb-md-0">
            <h2 className="text-secondary fw-bold mb-4">⚙️ How It Works</h2>
            <div className="mb-4">
              <h5 className="text-dark fw-semibold">Browse Products</h5>
              <p>
                Discover a range of high-quality products from stores that
                support causes. Each purchase helps fund charitable initiatives.
              </p>
            </div>
            <div className="mb-4">
              <h5 className="text-dark fw-semibold">Support a Charity</h5>
              <p>
                Select your favorite product and choose a charity campaign to
                support. Every purchase is a step toward positive change.
              </p>
            </div>
            <div className="mb-4">
              <h5 className="text-dark fw-semibold">Purchase & Donate</h5>
              <p>
                Pay with your wallet (MetaMask), and watch as part of your
                payment is sent directly to a charity of your choice.
              </p>
            </div>
            <div>
              <h5 className="text-dark fw-semibold">Get Your Receipt</h5>
              <p>
                Receive a transaction receipt with details about your purchase
                and donation. Your support is documented.
              </p>
            </div>
          </div>
          <div className="col-md-6">
            <img
              src={donation}
              alt="How it works"
              className="img-fluid p-3 rounded-3 shadow-lg"
            />
          </div>
        </section>

        <section className="bg-success-subtle p-5 rounded-4 shadow-lg text-center my-5">
          <h3 className="fw-bold">🌍 Join the Movement</h3>
          <p className="lead mb-4">
            Whether you're shopping for a product or supporting a cause,
            TrustChain lets you make a real difference with every purchase.
            Ready to make an impact?
          </p>
          <Link
            to="/login"
            className="btn btn-light btn-lg px-4 py-2 rounded-pill shadow-sm me-3"
          >
            Log In
          </Link>
          <Link
            to="/sign-up"
            className="btn btn-outline-light btn-lg px-4 py-2 rounded-pill shadow-sm"
          >
            Sign Up
          </Link>
        </section>
      </main>
      <footer className="w-100 text-center py-4 bg-dark text-white">
        <p>&copy; 2024 TrustChain. All rights reserved. 🌟</p>
      </footer>
    </div>
  );
}

export default HomeAbout;
