import { Link } from "react-router-dom";
import styles from "./styles.module.css";

const Events = () => {
    return (
    <div className={styles.left}>
        <h1>Create a new post</h1>
        <Link to="/create_event">
            <button type="button" className={styles.white_btn}>
                Create Post
            </button>
        </Link>
    </div>
    );
}

export default Events;