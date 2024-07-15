import React from 'react';
import styles from "./styles.module.css";

const Main = () => {
	const handleLogout = () => {
		localStorage.removeItem("token");
		window.location.reload();
	};

	return (
		<div className={styles.main_container}>
			<nav className={styles.navbar}>
				<h1>Homepage</h1>
				<div className={styles.nav_links}>
					<a href="#">Edit Profile</a>
					<a href="#">Account Settings</a>
					<a href="chat">Chats</a>
					<a href="#">Events</a>
					<a href="/interests">Interests</a>
				</div>
				<button className={styles.white_btn} onClick={handleLogout}>
					Logout
				</button>
			</nav>
			<main className={styles.main_content}>
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
						Feel free to reach out to us at any time. You can email us at <a href="e1156223@u.nus.edu" type='email'>e1156223@u.nus.edu</a>(boss yb) or call us at 9876 4321.
					</p>
				</section>
			</main>
			<footer className={styles.footer}>
				<p>&copy; 2024 My Website</p>
			</footer>
		</div>
	);
};

export default Main;
