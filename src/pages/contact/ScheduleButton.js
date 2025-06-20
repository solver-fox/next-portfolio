import { useEffect, useState } from "react";

const ScheduleButton = () => {
    const [isHovered, setIsHovered] = useState(false);
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
                onMouseEnter={() => setIsHovered(true)}
                onMouseLeave={() => setIsHovered(false)}
                style={{
                    background: 'white',
                    border: '1px solid #e0e0e0',
                    borderRadius: 16,
                    boxShadow: isHovered ? '0 4px 24px rgba(0,0,0,0.18)' : '0 2px 8px rgba(0,0,0,0.10)',
                    padding: 0,
                    cursor: 'pointer',
                    position: 'absolute',
                    right: '100px',
                    bottom: '100px',
                    transition: 'transform 0.3s, box-shadow 0.3s',
                    transform: isHovered ? 'scale(1.08)' : 'scale(1)',
                    width: '88px',
                    height: '88px',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                }}
                aria-label="Schedule time with me"
            >
                <img
                    src={"/schedule.png"}
                    alt="Schedule time with me"
                    style={{
                        width: '60%',
                        height: '60%',
                        objectFit: 'contain',
                        borderRadius: 12,
                        boxShadow: isHovered ? '0 2px 8px rgba(0,0,0,0.10)' : 'none',
                        background: 'none',
                    }}
                />
            </button>
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
                            <span style={{fontWeight: 700, fontSize: 28, lineHeight: 1}}>&times;</span>
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
