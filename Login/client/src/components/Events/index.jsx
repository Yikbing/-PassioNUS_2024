import { Link } from "react-router-dom";
import styles from "./styles.module.css";
import { useEffect, useState } from "react";
import EventPostLayout from "../EventPostLayout";

const Events = () => {
    const [events, setEvents] = useState([]);

    useEffect(() => {
        const fetchEvents = async () => {
            try {
                const response = await fetch(`${import.meta.env.VITE_API_BASE_URL}/api/events`);
                if (!response.ok) {
                    throw new Error('Network response was not ok');
                }
                const events = await response.json();
                setEvents(events);
            } catch (error) {
                console.error('Error fetching events:', error);
            }
        };

        fetchEvents();
    }, []);
    
    return (
        <div>
            <div className={styles.left}>
                <h1>Create a new post</h1>
                <Link to="/create_event">
                    <button type="button" className={styles.white_btn}>
                        Create Post
                    </button>
                </Link>
            </div>
            <div className={styles.container}>
                {events.length > 0 ? (
                    events.map(event => (
                        <EventPostLayout key={event._id} {...event} />
                    ))
                ) : (
                    <p>No events found</p>
                )}
            </div>
        </div>
    );
};

export default Events;
