import { Link } from "react-router-dom";
import styles from "./styles.module.css";
import { useEffect, useState } from "react";
import EventPostLayout from "../EventPostLayout";

const Events = () => {
    const [events, setEvents] = useState([]);
    useEffect(() => {
        fetch('http://localhost:8080/api/events').then(response =>{
            response.json().then(events => {
                setEvents(events);
            });
        });
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
        {events.length > 0 && events.map(event => (
            <EventPostLayout {...event} />
        ))}
        </div>
    </div>
    );
};

export default Events;