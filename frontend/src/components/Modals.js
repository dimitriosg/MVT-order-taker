/* eslint-disable no-unused-vars */
// src/components/Modals.js

import React, { useState, useEffect } from 'react';
import { Modal } from 'react-bootstrap';

const ErrorModal = ({ show, message, onClose }) => {
    const [errorMessage, setErrorMessage] = useState('');
    const [showErrorModal, setShowErrorModal] = useState(false);

    const displayError = (message) => {
        setErrorMessage(message);
        setShowErrorModal(true);
        const timer = setTimeout(() => {
            setShowErrorModal(false);
        }, 5000);
        return () => clearTimeout(timer);
    };

    useEffect(() => {
        // Assume displayError is globally available
        window.displayError = displayError;
    }, []);


    return (
        <Modal show={showErrorModal} centered onHide={() => setShowErrorModal(false)}>
            <Modal.Header closeButton>
                <Modal.Title>Error</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <p className="text-danger">{errorMessage}</p>
            </Modal.Body>
        </Modal>
    );
};

const ConfirmationModalItem = ({ show, message, onConfirm, onCancel, children }) => {

    return (
        <Modal show={show} centered onHide={onCancel}>
            <Modal.Header closeButton>
                <Modal.Title>Confirmation</Modal.Title>
            </Modal.Header>
            <Modal.Body>
            {Array.isArray(message) ? message.map((msg, idx) => <p key={idx}>{msg}</p>) : <p>{message}</p>}
                <div className="d-flex justify-content-between my-2">
                    {children}
                </div>

                <div className="d-flex justify-content-end">
                    <button className="btn btn-secondary mr-2" onClick={onCancel}>Cancel</button>
                    <button className="btn btn-danger" onClick={onConfirm}>Confirm</button>
                </div>
            </Modal.Body>
        </Modal>
    );
};

const ConfirmationModalUser = ({ 
    show, 
    message, 
    onConfirm, 
    onCancel, 
    selectedStatus, 
    setSelectedStatus, 
    selectedUser 
}) => { 
    const statusOptions = ["Active", "Deactivated", "Locked"];

    const buttonStyles = (status) => ({
        backgroundColor: selectedStatus === status ? "#007BFF" : "#E0E0E0",  // Highlight selected status with a different color
        color: selectedStatus === status ? "white" : "black",
        margin: "0 5px",
        padding: "5px 10px",
        border: "none",
        cursor: "pointer",
        borderRadius: "5px"
    });

    return (
        <Modal show={show} centered onHide={onCancel}>
            <Modal.Header closeButton>
                <Modal.Title>Confirmation</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <p>{Array.isArray(message) ? message.join("\n") : message}</p>
                <div 
                    role="radiogroup"
                    aria-label="Select status"
                    style={{ 
                        display: "flex", 
                        justifyContent: "space-between", 
                        marginBottom: "20px" }
                    }>
                    {statusOptions.map(status => (
                        <div key={status} style={{ marginBottom: "10px" }}>
                            <button 
                                role="radio"
                                aria-checked={selectedStatus === status}
                                style={buttonStyles(status)}
                                onClick={() => setSelectedStatus(status)}
                                disabled={selectedUser && selectedUser.accountStatus === status}
                            >
                                {status}
                            </button>
                            {selectedUser && selectedUser.accountStatus === status && (
                            <>
                                <div style={{ 
                                    fontSize: "12px", 
                                    color: "red", 
                                    marginTop: "5px" }
                                    }>
                                    current status
                                </div>
                            </>
                            )}
                        </div>
                    ))}
                </div>
                <div className="d-flex justify-content-end">
                    <button className="btn btn-secondary mr-2" onClick={onCancel}>Cancel</button>
                    <button className="btn btn-danger" onClick={onConfirm} disabled={!selectedStatus}>Confirm</button>
                </div>
            </Modal.Body>
        </Modal>
    );
};

const ConfirmationModalUserRemove = ({ 
    show, 
    message, 
    onConfirm, 
    onCancel, 
    children, 
    successMessage
}) => {

    const renderMessage = () => {
        if (successMessage) {
            return (
                <p style={{ color: 'green', fontWeight: 'bold' }}>
                    {successMessage}
                </p>
            );
        }
        if (Array.isArray(message)) {
            return message.map((msg, idx) => <p key={idx}>{msg}</p>);
        }
        return <p>{message}</p>;
    };

    return (
        <Modal show={show} centered onHide={onCancel}>
            <Modal.Header closeButton>
                <Modal.Title>Confirmation</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                {renderMessage()} 
                
                <div className="d-flex justify-content-between my-2">
                    {children}
                </div>

                <div className="d-flex justify-content-end">
                    <button className="btn btn-secondary mr-2" onClick={onCancel}>Cancel</button>
                    <button className="btn btn-danger" onClick={onConfirm}>Confirm</button>
                </div>
            </Modal.Body>
        </Modal>
    );
};


export { 
    ErrorModal, 
    ConfirmationModalUser,
    ConfirmationModalItem, 
    ConfirmationModalUserRemove
};
