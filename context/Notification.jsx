import React from 'react';

const Notification = ( {message, display }) => {
    if (!display) return null;  // Don't render if not active

    return (
        <div class="alert alert-info" role="alert">
  {message}  Give it a click if you like
</div>
    );
};

export default Notification;