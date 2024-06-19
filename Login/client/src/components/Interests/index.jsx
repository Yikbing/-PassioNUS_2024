import React, { useState } from "react";
import axios from "axios";
import "./style.css";


//const userId = req.session.user_id; 
const InterestsForm = () => {
    const [formData, setFormData] = useState({
        Sports: false,
        Music: false,
        Art: false,
        Cooking: false,
        Volunteering: false,
        Video_Games: false,
        Dance: false
    });

    const handleChange = (e) => {
        const { name, checked } = e.target;
        setFormData({
            ...formData,
            [name]: checked
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.post("http://localhost:8080/api/interests", formData);
            alert(response.data);
        } catch (error) {
            alert("Error submitting interests: " + error.message);
        }
    };

    const handleGoBack = () => {
        window.location.href = "/home";
    };

    return (
        <div>
            <button onClick={handleGoBack}>Go Back to Home</button>

        <form onSubmit={handleSubmit}>
            <label>
            <div className="image-container">
                    {formData.Sports && <img className="item-image" src="/images/sports-logo.png" alt="Sports Logo" />}
                </div>
                Sports:
                <input
                    type="checkbox"
                    name="Sports"
                    checked={formData.Sports}
                    onChange={handleChange}
                />
            </label>
            <label>
            <div className="image-container">
                    {formData.Music && <img className="item-image" src="/images/music-logo.png" alt="Music Logo" />}
                </div>
                Music:
                <input
                    type="checkbox"
                    name="Music"
                    checked={formData.Music}
                    onChange={handleChange}
                />
            </label>
            <label>
            <div className="image-container">
                    {formData.Art && <img className="item-image" src="/images/art-logo.png" alt="Art Logo" />}
                </div>
                Art:
                <input
                    type="checkbox"
                    name="Art"
                    checked={formData.Art}
                    onChange={handleChange}
                />
            </label>
            <label>
            <div className="image-container">
                {formData.Cooking && <img className="item-image" src="/images/cooking-logo.png" alt="Cooking Logo" />}
            </div>
                Cooking:
                <input
                    type="checkbox"
                    name="Cooking"
                    checked={formData.Cooking}
                    onChange={handleChange}
                />
            </label>
            <label>
            <div className="image-container">
                {formData.Volunteering && <img className="item-image" src="/images/volunteering-logo.png" alt="Volunteering Logo" />}
            </div>
                Volunteering:
                <input
                    type="checkbox"
                    name="Volunteering"
                    checked={formData.Volunteering}
                    onChange={handleChange}
                />
            </label>
            <label>
            <div className="image-container">
                {formData.Video_Games && <img className="item-image" src="/images/video-games-logo.png" alt="Video Games Logo" />}
            </div>
                Video Games:
                <input
                    type="checkbox"
                    name="Video_Games"
                    checked={formData.Video_Games}
                    onChange={handleChange}
                />
            </label>
            <label>
            <div className="image-container">
                {formData.Dance && <img className="item-image" src="/images/dance-logo.png" alt="Dance Logo" />}
            </div>
                Dance:
                <input
                    type="checkbox"
                    name="Dance"
                    checked={formData.Dance}
                    onChange={handleChange}
                />
            </label>
            <button type="submit">Submit</button>
        </form>
        </div>
    );
};

export default InterestsForm;