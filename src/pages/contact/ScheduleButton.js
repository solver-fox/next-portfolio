import { useEffect, useState } from "react";
import styles from './ScheduleButton.module.css';
import { Icon } from 'components/Icon';

const ScheduleButton = () => {
    const [showModal, setShowModal] = useState(false);
    useEffect(() => {
        const link = document.createElement("link");
        link.href = "https://assets.calendly.com/assets/external/widget.css";
        link.rel = "stylesheet";
        document.head.appendChild(link);

        const script = document.createElement("script");
        script.src = "https://assets.calendly.com/assets/external/widget.js";
        script.async = true;
        document.body.appendChild(script);

        return () => {
            document.head.removeChild(link);
            document.body.removeChild(script);
        };
    }, []);

    const handleClick = () => {
        setShowModal(true);
    };

    const handleClose = () => {
        setShowModal(false);
    };

    return (
        <>
            <button
                onClick={handleClick}
                className={styles.scheduleBtn}
                aria-label="Schedule time with me"
            >
                <Icon className={styles.icon} icon="calendar" />
            </button>
            {showModal && (
                <div className={styles.scheduleModalOverlay}>
                    <div className={styles.scheduleModal}>
                        <button onClick={handleClose} className={styles.scheduleCloseBtn} aria-label="Close schedule modal">
                            <span>&times;</span>
                        </button>
                        <iframe
                            src="https://calendly.com/charleshardy1225/new-meeting?embed_domain=localhost&embed_type=Inline"
                            className={styles.scheduleIframe}
                            title="Schedule time with me"
                            scrolling="auto"
                        />
                    </div>
                </div>
            )}
        </>
    );
};

export default ScheduleButton;
