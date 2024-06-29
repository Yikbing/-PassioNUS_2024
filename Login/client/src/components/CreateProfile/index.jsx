import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import styles from "./styles.module.css";

const CreateProfile = () => {
    const [data, setData] = useState({
        username: "",
        faculty: "",
        year: "",
        gender: ""
    });
    const [error, setError] = useState("");
    const navigate = useNavigate(); // useNavigate hook for navigation

    const handleChange = ({ currentTarget: input }) => {
        setData({ ...data, [input.name]: input.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const userId = localStorage.getItem("userId"); // Get userId from local storage
            const url = "http://localhost:8080/api/create_profile"; // Updated URL
            const res = await axios.post(url, { ...data, userId }); // Include userId in the request body
            console.log('Profile created successfully:', res.data); // Logging response
            navigate("/interests"); // Navigate to the interest page after successful profile creation
            window.location.reload(); // reload page
        } catch (error) {
            console.error('Error creating profile:', error); // Logging error
            if (
                error.response &&
                error.response.status >= 400 &&
                error.response.status <= 500
            ) {
                setError(error.response.data.message);
            }
        }
    };

    return (
        <div className={styles.create_profile_container}>
            <div className={styles.form_container}>
                <h2>Create Profile</h2>
                <form onSubmit={handleSubmit}>
                    <div className={styles.form_group}>
                        <label htmlFor="name">Name:</label>
                        <input
                            type="text"
                            id="name"
                            name="username"
                            placeholder="Enter your name"
                            value={data.username}
                            onChange={handleChange}
                            required
                            autoComplete="off"
                            className={styles.input}
                        />
                    </div>
                    <div className={styles.form_group}>
                        <label htmlFor="faculty">Faculty:</label>
                        <select
                            id="faculty"
                            name="faculty"
                            value={data.faculty}
                            onChange={handleChange}
                            required
                            className={styles.input}
                        >
                            <option value="">Select your faculty</option>
                            <option value="Engineering">Engineering</option>
                            <option value="Computing">Computing</option>
                            <option value="Medicine">Medicine</option>
                            <option value="Law">Law</option>
                            <option value="Business">Business</option>
                            <option value="Social Sciences">Social Sciences</option>
                        </select>
                    </div>
                    <div className={styles.form_group}>
                        <label htmlFor="year">Year of Study:</label>
                        <input
                            type="number"
                            id="year"
                            name="year"
                            placeholder="Enter your year of study"
                            value={data.year}
                            onChange={handleChange}
                            required
                            min="1"
                            max="4"
                            className={styles.input}
                        />
                    </div>
                    <div className={styles.form_group}>
                        <label htmlFor="gender">Gender:</label>
                        <select
                            id="gender"
                            name="gender"
                            value={data.gender}
                            onChange={handleChange}
                            className={styles.input}
                        >
                            <option value="">Select your gender</option>
                            <option value="Male">Male</option>
                            <option value="Female">Female</option>
                            <option value="Other">Other</option>
                        </select>
                    </div>
                    {error && <div className={styles.error_msg}>{error}</div>}
                    <button type="submit" className={styles.submit_btn}>
                        Create Profile
                    </button>
                </form>
            </div>
        </div>
    );
};

export default CreateProfile;
