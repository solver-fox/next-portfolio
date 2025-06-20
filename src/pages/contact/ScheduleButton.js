import { useEffect, useState } from "react";

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
            <img
                onClick={handleClick}
                src={"/schedule.png"}
                alt="Schedule time with me"
                style={{
                    background: 'none',
                    border: 'none',
                    padding: 0,
                    cursor: 'pointer',
                    position: 'absolute',
                    right: '18px',
                    bottom: '100px',
                    transition: "transform 0.5s",
                    width: '70px',
                    height: '70px',
                }}
            />
            {showModal && (
                <div style={{
                    position: 'fixed',
                    top: 0,
                    left: 0,
                    width: '100vw',
                    height: '100vh',
                    background: 'rgba(0,0,0,0.35)',
                    zIndex: 2000,
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                }}>
                    <div style={{
                        background: '#fff',
                        borderRadius: 10,
                        boxShadow: '0 8px 32px rgba(0,0,0,0.18)',
                        width: '95vw',
                        maxWidth: 700,
                        height: '90vh',
                        maxHeight: 'none',
                        overflow: 'visible',
                        display: 'flex',
                        flexDirection: 'column',
                        position: 'relative',
                    }}>
                        <button onClick={handleClose} style={{
                            position: 'absolute',
                            top: 12,
                            right: 16,
                            background: '#fff',
                            border: '2px solid #888',
                            borderRadius: '50%',
                            width: 40,
                            height: 40,
                            fontSize: 24,
                            color: '#222',
                            cursor: 'pointer',
                            zIndex: 2,
                            boxShadow: '0 2px 8px rgba(0,0,0,0.10)',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            transition: 'background 0.2s, border 0.2s',
                        }}
                            aria-label="Close schedule modal"
                        >
                            <span style={{ fontWeight: 700, fontSize: 28, lineHeight: 1 }}>&times;</span>
                        </button>
                        <iframe
                            src="https://calendly.com/charleshardy1225/new-meeting?embed_domain=localhost&embed_type=Inline"
                            style={{
                                width: '100%',
                                height: '100%',
                                border: 'none',
                                overflow: 'visible',
                                display: 'block',
                            }}
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
