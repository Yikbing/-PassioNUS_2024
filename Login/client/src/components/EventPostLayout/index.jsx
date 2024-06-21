import styles from "./styles.module.css";

const EventPostLayout = ({ title, summary, venue, date, cover, content }) => {
    // Function to format the date
    const formatDate = (dateString) => {
        const options = { day: '2-digit', month: '2-digit', year: 'numeric' };
        return new Date(dateString).toLocaleDateString('en-GB', options);
    };    
    
    return (
        <div className={styles.post}>
            <div className={styles.image}>
                <img src={'http://localhost:8080/'+cover} alt=""/>
            </div>
            <div className={styles.texts}>
                <h2>{title}</h2>
                <p className={styles.info}>
                    <span className={styles.venue}>{venue}</span>
                    <span className={styles.date}>{formatDate(date)}</span>
                </p>
                <p className={styles.summary}>{summary}</p>
            </div>
        </div>
    );
};

export default EventPostLayout;
