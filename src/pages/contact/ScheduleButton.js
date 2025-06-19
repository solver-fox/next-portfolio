import { useEffect, useState } from "react";

const ScheduleButton = () => {
    const [isHovered, setIsHovered] = useState(false);
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
        if (window.Calendly) {
            window.Calendly.initPopupWidget({
                url: "https://calendly.com/charleshardy1225/new-meeting",
            });
        }
    };

    return (
        <img
            src={"/schedule.png"}
            alt="Schedule time with me"
            onClick={handleClick}
            style={{
                background: 'none',
                border: 'none',
                padding: 0,
                cursor: 'pointer',
                position: 'absolute',
                right: '100px',
                bottom: '100px',
                transition: "transform 0.5s",
                transform: isHovered ? "scale(1.1)" : "scale(1)",
                width: '100px',
                height: '100px',
            }}
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
        />

    );
};

export default ScheduleButton;
