import React from "react";
import { Outlet } from "react-router-dom";
import styles from "./styles.module.css";
import { Link } from "react-router-dom";

const Layout = () => {
  const handleLogout = () => {
    localStorage.removeItem("token");
    window.location = "/";
  };

  return (
    <div className={styles.main_container}>
      <nav className={styles.navbar}>
        <Link to="/" className={styles.homepage_btn}>
          Homepage
        </Link>
        <div className={styles.nav_links}>
          <Link to="/matching">Matching</Link>
          <Link to="/study">Study Buddy</Link>
          <Link to="/events">Events</Link>
          <Link to="/Chat">Games</Link>
          <Link to="/profile">Edit Profile</Link>
          <Link to="/settings">Settings</Link>
        </div>
        <button className={styles.white_btn} onClick={handleLogout}>
          Logout
        </button>
      </nav>
      <div className={styles.main_content}>
        <Outlet /> {/* This is where the nested routes will be rendered */}
      </div>
      <footer className={styles.footer}>
        <p>&copy; 2024 My Website</p>
      </footer>
    </div>
  );
};

export default Layout;
