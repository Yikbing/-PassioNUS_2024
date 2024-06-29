import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import styles from "./styles.module.css";

const InterestsForm = () => {
    const [data, setData] = useState({
        Sports: false,
        Music: false,
        Art: false,
        Cooking: false,
        Volunteering: false,
        Video_Games: false,
        Dance: false
    });
    const [error, setError] = useState("");
    const navigate = useNavigate(); // useNavigate hook for navigation

    const handleChange = ({ currentTarget: input }) => {
        setData({ ...data, [input.name]: input.checked });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const userId = localStorage.getItem("userId"); // Get userId from local storage
            const url = "http://localhost:8080/api/interests"; // Updated URL
            const res = await axios.post(url, { ...data, userId }); // Include userId in the request body
            console.log('Interests saved successfully:', res.data); // Logging response
            navigate("/home"); // Navigate to the dashboard after successful interests submission
            window.location.reload(); // reload page
        } catch (error) {
            console.error('Error submitting interests:', error); // Logging error
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
        <div className={styles.interests_form_container}>
            <div className={styles.form_container}>
                <h2>Select Your Interests</h2>
                <form onSubmit={handleSubmit}>
                    <label>
                        Sports:
                        <input
                            type="checkbox"
                            name="Sports"
                            checked={data.Sports}
                            onChange={handleChange}
                        />
                    </label>
                    <label>
                        Music:
                        <input
                            type="checkbox"
                            name="Music"
                            checked={data.Music}
                            onChange={handleChange}
                        />
                    </label>
                    <label>
                        Art:
                        <input
                            type="checkbox"
                            name="Art"
                            checked={data.Art}
                            onChange={handleChange}
                        />
                    </label>
                    <label>
                        Cooking:
                        <input
                            type="checkbox"
                            name="Cooking"
                            checked={data.Cooking}
                            onChange={handleChange}
                        />
                    </label>
                    <label>
                        Volunteering:
                        <input
                            type="checkbox"
                            name="Volunteering"
                            checked={data.Volunteering}
                            onChange={handleChange}
                        />
                    </label>
                    <label>
                        Video Games:
                        <input
                            type="checkbox"
                            name="Video_Games"
                            checked={data.Video_Games}
                            onChange={handleChange}
                        />
                    </label>
                    <label>
                        Dance:
                        <input
                            type="checkbox"
                            name="Dance"
                            checked={data.Dance}
                            onChange={handleChange}
                        />
                    </label>
                    {error && <div className={styles.error_msg}>{error}</div>}
                    <button type="submit" className={styles.submit_btn}>
                        Submit Interests
                    </button>
                </form>
            </div>
        </div>
    );
};

export default InterestsForm;
