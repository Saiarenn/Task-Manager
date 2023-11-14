import React, {useEffect, useState} from 'react';
import {useNavigate, useParams} from 'react-router-dom';
import axios from 'axios';
import {$host} from "../http";
import '../style/EmailConfirmation.css'
import {CALENDAR_ROUTE} from "../utils/consts";

const EmailConfirmation = () => {
    const navigate = useNavigate()
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
        <div className="confirm-con">
            <h1><i className="fa fa-check-circle" aria-hidden="true"></i> Email is verified</h1>
            <p>Your email is verified for <a href="#">@someusername</a>.</p>
            <p>Redirecting you to app.</p>
            <button className="confirm-button" onClick={() => navigate(CALENDAR_ROUTE)}>Go to app now</button>
        </div>
    );
};

export default EmailConfirmation;
