import React from 'react';
import styles from "./styles.module.css"; // Ensure this path is correct

const Main = () => {
  return (
    <div className={styles.main_container}>
      <div className={styles.main_content}>
        <section id="about" className={styles.section}>
          <h2>About Us</h2>
          <p>
            Welcome to our website! We are PassioNUS, and this is our Orbital 24 project.<br/>
            With the goal of being a one-stop website for all the things you need to explore your interests in the campus to help you find your exciting university life!
          </p>
        </section>
        <section id="contact" className={styles.section}>
          <h2>Contact Us</h2>
          <p>
            Feel free to reach out to us at any time. You can email us at <a href="mailto:e1156223@u.nus.edu">e1156223@u.nus.edu</a> (boss yb) or call us at 9876 4321.
          </p>
        </section>
      </div>
    </div>
  );
};

export default Main;
