import React, { useState, useEffect} from 'react';
import axios from 'axios';
import styles from "./styles.module.css";
import ReactQuill from "react-quill";
import 'react-quill/dist/quill.snow.css';

const CreateEvents = () => {
    const [data, setData] = useState({
        title: '',
        summary: '',
        venue: '',
        date: '',
        content: ''
    });
    const [file, setFile] = useState(null);
    const [error, setError] = useState('');
    const [success, setSuccess] = useState('');

    const handleChange = ({ currentTarget: input }) => {
        setData({ ...data, [input.name]: input.value });
    };

    const handleFileChange = (e) => {
        setFile(e.target.files[0]);
    };

    const validateForm = () => {
        if (!data.title || !data.summary || !data.venue || !data.date || !data.content) {
            setError('All fields are required.');
            return false;
        }
        return true;
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError('');
        setSuccess('');

        if (!validateForm()) {
            return;
        }

        const formData = new FormData();
        formData.append('title', data.title);
        formData.append('summary', data.summary);
        formData.append('venue', data.venue);
        formData.append('date', data.date);
        formData.append('content', data.content);
        if (file) {
            formData.append('file', file);
        }

        try {
            const url = "http://localhost:8080/api/events";
            const response = await axios.post(url, formData, {
                headers: {
                    'Content-Type': 'multipart/form-data',
                },
            });
            console.log('Success:', response.data);
            setSuccess('Event created successfully!');
            // Optionally, reset the form here
            setData({
                title: '',
                summary: '',
                venue: '',
                date: '',
                content: ''
            });
            setFile(null);
            // Redirect or show success message
            setTimeout(() => {
                window.location = "/events"; // redirect after 2s
            }, 2000);
        } catch (error) {
            if (error.response && error.response.status >= 400 && error.response.status <= 500) {
                setError(error.response.data.message);
            } else {
                setError('Something went wrong. Please try again later.');
            }
            console.error('Error:', error);
        }
    };

    useEffect(() => {
        if (error || success) {
            const timer = setTimeout(() => {
                setError('');
                setSuccess('');
            }, 3000);
            return () => clearTimeout(timer);
        }
    }, [error, success]); // To clear error or success msg after 3s

    return (
        <form className={styles.container} onSubmit={handleSubmit}>
            <input 
                type="text" 
                name="title" 
                placeholder="Title" 
                value={data.title}
                onChange={handleChange} 
            />
            <input 
                type="text" 
                name="summary"
                placeholder="Summary"
                value={data.summary}
                onChange={handleChange} 
            />
            <input 
                type="text" 
                name="venue"
                placeholder="Venue"
                value={data.venue}
                onChange={handleChange} 
            />
            <input 
                type="date" 
                name="date"
                placeholder="Date"
                value={data.date}
                onChange={handleChange} 
            />
            <input 
                type="file" 
                className={styles.fileInput} 
                onChange={handleFileChange}
            />
            <div className={styles.quillContainer}>
                <ReactQuill 
                    className={styles.quill}
                    value={data.content}
                    onChange={content => setData({ ...data, content })}
                />
            </div>
            {error && <div className={styles.error}>{error}</div>}
            {success && <div className={styles.success}>{success}</div>}
            <button type="submit" className={styles.createButton}>Create Event</button>
        </form>
    );
};

export default CreateEvents;
