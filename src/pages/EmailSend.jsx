import React from 'react';

const EmailSend = () => {
    return (
        <div style={styles.container}>
            <div style={styles.card}>
                <h1 style={styles.heading}>Confirm Your Email</h1>
                <p style={styles.message}>
                    Thank you for signing up! To complete your registration, please click the confirmation link
                    sent to your email address.
                </p>
            </div>
        </div>
    );
};

const styles = {
    container: {
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        height: '88vh',
    },
    card: {
        backgroundColor: '#fff',
        padding: '20px',
        borderRadius: '8px',
        boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
        textAlign: 'center',
        maxWidth: '400px',
    },
    heading: {
        color: '#333',
        fontSize: '24px',
        marginBottom: '15px',
    },
    message: {
        color: '#666',
        fontSize: '16px',
        lineHeight: '1.5',
    },
};

export default EmailSend;