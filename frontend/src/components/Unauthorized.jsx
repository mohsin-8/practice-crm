import React from "react";
import { useNavigate } from "react-router-dom";

const Unauthorized = () => {
    const navigate = useNavigate();

    const goBack = () => {
        navigate(-1);
    };

    return (
        <div style={styles.container}>
            <h1 style={styles.title}>Unauthorized Access</h1>
            <p style={styles.message}>
                You do not have the required permissions to view this page.
            </p>
            <button style={styles.button} onClick={goBack}>
                Go Back
            </button>
        </div>
    );
};

const styles = {
    container: {
        textAlign: "center",
        marginTop: "100px",
    },
    title: {
        fontSize: "2.5rem",
        color: "#ff4d4f",
    },
    message: {
        fontSize: "1.2rem",
        color: "#555",
        marginBottom: "20px",
    },
    button: {
        backgroundColor: "#007bff",
        color: "white",
        padding: "10px 20px",
        fontSize: "1rem",
        border: "none",
        borderRadius: "5px",
        cursor: "pointer",
    },
};

export default Unauthorized;