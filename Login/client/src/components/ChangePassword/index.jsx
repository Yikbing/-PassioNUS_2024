import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import styles from "./styles.module.css";

const ChangePassword = () => {
  const [data, setData] = useState({
    currentPassword: "",
    newPassword: "",
    confirmPassword: "",
  });
  const [error, setError] = useState("");
  const [message, setMessage] = useState("");
  const navigate = useNavigate();

  const handleChange = ({ currentTarget: input }) => {
    setData({ ...data, [input.name]: input.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const userId = localStorage.getItem("userId"); // Ensure userId is available
      const url = `http://localhost:8080/api/change-password`;
      const { data: res } = await axios.post(
        url,
        { ...data, userId },
        {
          headers: { "x-auth-token": localStorage.getItem("token") }, // Include auth token if needed
        }
      );
      setMessage(res.message);
      setError("");

      // Redirect to /home after 2 seconds
      setTimeout(() => {
        navigate("/home");
      }, 2000);
    } catch (error) {
      if (
        error.response &&
        error.response.status >= 400 &&
        error.response.status <= 500
      ) {
        setError(error.response.data.message);
        setMessage("");
      }
    }
  };

  // Clear error and success messages after 3 seconds
  useEffect(() => {
    if (error || message) {
      const timer = setTimeout(() => {
        setError("");
        setMessage("");
      }, 3000);

      return () => clearTimeout(timer);
    }
  }, [error, message]);

  return (
    <div className={styles.change_password_container}>
      <h2>Change Password</h2>
      <form onSubmit={handleSubmit}>
        <div className={styles.form_group}>
          <label htmlFor="currentPassword">Current Password:</label>
          <input
            type="password"
            id="currentPassword"
            name="currentPassword"
            placeholder="Enter current password"
            value={data.currentPassword}
            onChange={handleChange}
            required
          />
        </div>
        <div className={styles.form_group}>
          <label htmlFor="newPassword">New Password:</label>
          <input
            type="password"
            id="newPassword"
            name="newPassword"
            placeholder="Enter new password"
            value={data.newPassword}
            onChange={handleChange}
            required
          />
        </div>
        <div className={styles.form_group}>
          <label htmlFor="confirmPassword">Confirm New Password:</label>
          <input
            type="password"
            id="confirmPassword"
            name="confirmPassword"
            placeholder="Confirm new password"
            value={data.confirmPassword}
            onChange={handleChange}
            required
          />
        </div>
        {error && <div className={styles.error_msg}>{error}</div>}
        {message && <div className={styles.success_msg}>{message}</div>}
        <button type="submit" className={styles.submit_btn}>
          Change Password
        </button>
      </form>
    </div>
  );
};

export default ChangePassword;
