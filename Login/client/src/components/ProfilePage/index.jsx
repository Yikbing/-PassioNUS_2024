import React, { useState, useEffect } from "react";
import axios from "axios";
import styles from "./styles.module.css";

const ProfilePage = () => {
  const [profile, setProfile] = useState({
    name: "",
    faculty: "",
    year: "",
    gender: "",
    interests: {
      Sports: false,
      Music: false,
      Art: false,
      Cooking: false,
      Volunteering: false,
      Video_Games: false,
      Dance: false,
    },
  });
  const [originalProfile, setOriginalProfile] = useState(null);
  const [isEditing, setIsEditing] = useState(false);
  const [error, setError] = useState("");
  const [message, setMessage] = useState("");

  useEffect(() => {
    const fetchProfileAndInterests = async () => {
      try {
        const userId = localStorage.getItem("userId");

        // Fetch profile data
        const profileUrl = `http://localhost:8080/api/profile/${userId}`;
        const profileRes = await axios.get(profileUrl);
        const profileData = profileRes.data;

        // Fetch interests data
        const interestsUrl = `http://localhost:8080/api/interests/${userId}`;
        const interestsRes = await axios.get(interestsUrl);
        const interestsData = interestsRes.data;

        // Combine profile and interests data
        setProfile({
          ...profileData,
          interests: interestsData,
        });
      } catch (error) {
        console.error("Error fetching profile and interests:", error);
        if (
          error.response &&
          error.response.status >= 400 &&
          error.response.status <= 500
        ) {
          setError(error.response.data.message);
        }
      }
    };

    fetchProfileAndInterests();
  }, []);

  useEffect(() => {
    if (message) {
      const timer = setTimeout(() => {
        setMessage("");
      }, 5000);

      return () => clearTimeout(timer);
    }
  }, [message]);

  const handleChange = ({ currentTarget: input }) => {
    if (input.type === "checkbox") {
      setProfile({
        ...profile,
        interests: {
          ...profile.interests,
          [input.name]: input.checked,
        },
      });
    } else {
      setProfile({ ...profile, [input.name]: input.value });
    }
  };

  const handleEdit = () => {
    setOriginalProfile(profile);
    setIsEditing(true);
  };

  const handleCancel = () => {
    setProfile(originalProfile);
    setIsEditing(false);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const userId = localStorage.getItem("userId");

      // Update profile data
      const profileUrl = `http://localhost:8080/api/profile/${userId}`;
      const profileData = {
        name: profile.name,
        faculty: profile.faculty,
        year: profile.year,
        gender: profile.gender,
      };
      await axios.put(profileUrl, profileData);

      // Update interests data
      const interestsUrl = `http://localhost:8080/api/interests/${userId}`;
      await axios.put(interestsUrl, profile.interests);

      setIsEditing(false);
      setMessage("Profile and Interests updated successfully!");
    } catch (error) {
      console.error("Error updating profile and interests:", error);
      if (
        error.response &&
        error.response.status >= 400 &&
        error.response.status <= 500
      ) {
        setError(error.response.data.message);
      }
    }
  };

  if (error) {
    return <div className={styles.error_msg}>{error}</div>;
  }

  return (
    <div className={styles.profile_interests_container}>
      <h2 className={styles.title}>Profile and Interests</h2>
      {message && <div className={styles.success_msg}>{message}</div>}
      {isEditing ? (
        <form onSubmit={handleSubmit}>
          {/* Profile Section */}
          <div className={styles.section}>
            <h3>Profile</h3>
            <div className={styles.form_group}>
              <label htmlFor="name" className={styles.form_group_label}>
                Name:
              </label>
              <input
                type="text"
                id="name"
                name="name"
                placeholder="Enter your name"
                value={profile.name}
                onChange={handleChange}
                required
                autoComplete="off"
                className={styles.input}
              />
            </div>
            <div className={styles.form_group}>
              <label htmlFor="faculty" className={styles.form_group_label}>
                Faculty:
              </label>
              <select
                id="faculty"
                name="faculty"
                value={profile.faculty}
                onChange={handleChange}
                required
                className={styles.form_group_select}
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
              <label htmlFor="year" className={styles.form_group_label}>
                Year of Study:
              </label>
              <input
                type="number"
                id="year"
                name="year"
                placeholder="Enter your year of study"
                value={profile.year}
                onChange={handleChange}
                required
                min="1"
                max="4"
                className={styles.form_group_input}
              />
            </div>
            <div className={styles.form_group}>
              <label htmlFor="gender" className={styles.form_group_label}>
                Gender:
              </label>
              <select
                id="gender"
                name="gender"
                value={profile.gender}
                onChange={handleChange}
                className={styles.form_group_select}
              >
                <option value="">Select your gender</option>
                <option value="Male">Male</option>
                <option value="Female">Female</option>
                <option value="Other">Other</option>
              </select>
            </div>
          </div>

          {/* Interests Section */}
          <div className={styles.section}>
            <h3>Interests</h3>
            <div className={styles.form_group}>
              <label className={styles.form_group_label}>
                <input
                  type="checkbox"
                  name="Sports"
                  checked={profile.interests.Sports}
                  onChange={handleChange}
                  className={styles.checkbox_input}
                />
                Sports
              </label>
            </div>
            <div className={styles.form_group}>
              <label className={styles.form_group_label}>
                <input
                  type="checkbox"
                  name="Music"
                  checked={profile.interests.Music}
                  onChange={handleChange}
                  className={styles.checkbox_input}
                />
                Music
              </label>
            </div>
            <div className={styles.form_group}>
              <label className={styles.form_group_label}>
                <input
                  type="checkbox"
                  name="Art"
                  checked={profile.interests.Art}
                  onChange={handleChange}
                  className={styles.checkbox_input}
                />
                Art
              </label>
            </div>
            <div className={styles.form_group}>
              <label className={styles.form_group_label}>
                <input
                  type="checkbox"
                  name="Cooking"
                  checked={profile.interests.Cooking}
                  onChange={handleChange}
                  className={styles.checkbox_input}
                />
                Cooking
              </label>
            </div>
            <div className={styles.form_group}>
              <label className={styles.form_group_label}>
                <input
                  type="checkbox"
                  name="Volunteering"
                  checked={profile.interests.Volunteering}
                  onChange={handleChange}
                  className={styles.checkbox_input}
                />
                Volunteering
              </label>
            </div>
            <div className={styles.form_group}>
              <label className={styles.form_group_label}>
                <input
                  type="checkbox"
                  name="Video_Games"
                  checked={profile.interests.Video_Games}
                  onChange={handleChange}
                  className={styles.checkbox_input}
                />
                Video Games
              </label>
            </div>
            <div className={styles.form_group}>
              <label className={styles.form_group_label}>
                <input
                  type="checkbox"
                  name="Dance"
                  checked={profile.interests.Dance}
                  onChange={handleChange}
                  className={styles.checkbox_input}
                />
                Dance
              </label>
            </div>
          </div>

          <button type="submit" className={styles.submit_btn}>
            Save Profile and Interests
          </button>
          <button
            type="button"
            onClick={handleCancel}
            className={styles.cancel_btn}
          >
            Cancel
          </button>
        </form>
      ) : (
        <>
          <div className={styles.section}>
            <h3>Profile</h3>
            <div className={styles.profile_item}>
              <strong className={styles.profile_item_strong}>Name:</strong>{" "}
              {profile.name}
            </div>
            <div className={styles.profile_item}>
              <strong className={styles.profile_item_strong}>Faculty:</strong>{" "}
              {profile.faculty}
            </div>
            <div className={styles.profile_item}>
              <strong className={styles.profile_item_strong}>Year:</strong>{" "}
              {profile.year}
            </div>
            <div className={styles.profile_item}>
              <strong className={styles.profile_item_strong}>Gender:</strong>{" "}
              {profile.gender}
            </div>
          </div>

          <div className={styles.section}>
            <h3>Interests</h3>
            <div className={styles.interests_item}>
              <strong className={styles.interests_item_strong}>Sports:</strong>{" "}
              {profile.interests.Sports ? "Yes" : "No"}
            </div>
            <div className={styles.interests_item}>
              <strong className={styles.interests_item_strong}>Music:</strong>{" "}
              {profile.interests.Music ? "Yes" : "No"}
            </div>
            <div className={styles.interests_item}>
              <strong className={styles.interests_item_strong}>Art:</strong>{" "}
              {profile.interests.Art ? "Yes" : "No"}
            </div>
            <div className={styles.interests_item}>
              <strong className={styles.interests_item_strong}>Cooking:</strong>{" "}
              {profile.interests.Cooking ? "Yes" : "No"}
            </div>
            <div className={styles.interests_item}>
              <strong className={styles.interests_item_strong}>
                Volunteering:
              </strong>{" "}
              {profile.interests.Volunteering ? "Yes" : "No"}
            </div>
            <div className={styles.interests_item}>
              <strong className={styles.interests_item_strong}>
                Video Games:
              </strong>{" "}
              {profile.interests.Video_Games ? "Yes" : "No"}
            </div>
            <div className={styles.interests_item}>
              <strong className={styles.interests_item_strong}>Dance:</strong>{" "}
              {profile.interests.Dance ? "Yes" : "No"}
            </div>
          </div>

          <button onClick={handleEdit} className={styles.edit_btn}>
            Edit Profile and Interests
          </button>
        </>
      )}
    </div>
  );
};

export default ProfilePage;
