import React from 'react';

const Notification = ( {message, display }) => {
    if (!display) return null;  // Don't render if not active

    return (
        <div className="notification"> 
            {message}
        </div>
    );
};

export default Notification;