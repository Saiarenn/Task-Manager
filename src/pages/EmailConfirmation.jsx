import React, {useContext, useEffect, useState} from 'react';
import {useNavigate, useParams} from 'react-router-dom';
import {$host} from "../http";
import '../style/EmailConfirmation.css'
import {CALENDAR_ROUTE, LOGIN_ROUTE} from "../utils/consts";
import {Context} from "../index";

const EmailConfirmation = () => {
    const navigate = useNavigate()
    const {token} = useParams();
    const [confirmationStatus, setConfirmationStatus] = useState('pending');
    const {user} = useContext(Context)
    const confirmEmail = async () => {
        try {
            const response = await $host.post(`api/v1/user/confirmemail?token=${token}`);
            if (response.data) {
                setConfirmationStatus('success')
            } else {
                setConfirmationStatus('error');
            }
        } catch (error) {
            console.error('Error confirming email:', error);
            setConfirmationStatus('error');
        }
    };

    useEffect(() => {
        confirmEmail();
    }, [token]);

    return (
        <div className={'d-flex align-content-center'}>
            {confirmationStatus === 'pending' && <p>Confirming email...</p>}
            {confirmationStatus === 'success' &&
                <div className="confirm-con">
                    <h1><i className="fa fa-check-circle" aria-hidden="true"></i> Email is verified</h1>
                    <p>Your email is verified for <a href={`mailto:${user.user.sub}`}>{user.user.sub}</a>.</p>
                    <p>Redirecting you to app.</p>
                    <button className="confirm-button" onClick={() => navigate(CALENDAR_ROUTE)}>Go to App</button>
                </div>
            }
            {confirmationStatus === 'error' && <p>Error confirming email. Please try again later.</p>}
        </div>
    );
};

export default EmailConfirmation;
