import React, {useEffect, useState} from 'react';
import {useParams} from 'react-router-dom';
import axios from 'axios';
import {$host} from "../http";

const EmailConfirmation = () => {
    const urlParams = new URLSearchParams(window.location.search);
    const token = urlParams.get('token');
    const [confirmationStatus, setConfirmationStatus] = useState('pending');

    const confirmEmail = async () => {
        const response = await $host.post(`api/v1/user/confirmemail?token=${token}`);
        if (response.data) {
            setConfirmationStatus('success')
        }
    };

    useEffect(() => {
        confirmEmail();
    }, [token]);

    return (
        <div>
            {confirmationStatus === 'pending' && <p>Confirming email...</p>}
            {confirmationStatus === 'success' && <p>Email confirmed successfully!</p>}
            {confirmationStatus === 'error' && <p>Error confirming email. Please try again later.</p>}
        </div>
    );
};

export default EmailConfirmation;
