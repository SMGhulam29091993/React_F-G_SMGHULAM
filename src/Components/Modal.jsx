import React from 'react';

const Modal = ({ showModal, closeModal, data }) => {
    if (!showModal) return null;
  
    return (
        <div className="fixed inset-0 bg-gray-600 bg-opacity-50 flex justify-center items-center z-50">
            <div className="bg-white p-5 rounded-lg w-3/4 max-w-lg">
                <button onClick={closeModal} className="float-right text-gray-700 hover:text-gray-900">X</button>
                <h2 className="text-xl font-semibold mb-4">User Details</h2>
                <div>
                    <p><strong>Customer Name:</strong> {data.name}</p>
                    <p><strong>Customer Email:</strong> {data.email}</p>
                    <p><strong>Customer Number:</strong> {data.number}</p>
                    <p><strong>Please rate the quality of the service received from the host:</strong> {data.host}</p>
                    <p><strong>Was our restaurant clean?</strong> {data.clean}</p>
                    <p><strong>Please rate the quality of the beverages:</strong> {data.beverages}</p>
                    <p><strong>Please rate your overall dining experience:</strong> {data.dining}</p>
                </div>
                <button onClick={closeModal} className="mt-4 bg-blue-500 text-white px-4 py-2 rounded">Close</button>
            </div>
        </div>
    );
};

export default Modal;
