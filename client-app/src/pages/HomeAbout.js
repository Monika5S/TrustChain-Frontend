import React from "react";
import { Link } from "react-router-dom";

function HomeAbout() {
  return (
    <div>
      <header>
        <h1>Welcome to Our Platform</h1>
        <p>
          Your gateway to managing and supporting various charitable causes,
          stores, and more.
        </p>
      </header>
      <main>
        <section>
          <h2>Get Started</h2>
          <p>Sign up or log in to access your dashboard based on your role.</p>
          <nav>
            <ul>
              <li>
                <Link to="/login">Login</Link>
              </li>
              <li>
                <Link to="/sign-up">Sign Up</Link>
              </li>
            </ul>
          </nav>
        </section>
      </main>
      <footer>
        <p>&copy; 2024 Our Platform. All rights reserved.</p>
      </footer>
    </div>
  );
}

export default HomeAbout;
