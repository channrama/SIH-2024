import React, { useEffect, useState } from 'react';
import axios from 'axios';
import './DisplayNotification.css';

const DisplayNotification = ({userId,role}) => {
  const [notifications, setNotifications] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchNotifications = async () => {
      try {
        const token = localStorage.getItem('token');
      const config = { headers: { Authorization: `Bearer ${token}` } };
      const response = await axios.get('/notifications', config);
      setNotifications(response.data);
      } catch (error) {
        setError(error.message || 'An error occurred');
      } finally {
        setLoading(false);
      }
    };
    fetchNotifications();
  }, []);

  const markAsRead = async (notificationId) => {
    try {
      const token = localStorage.getItem('token');
      const config = { headers: { Authorization: `Bearer ${token}` } };
      
      await axios.patch(`/notifications/${notificationId}/read`, {}, config);
      
      // Update the notification status locally
      const updatedNotifications = notifications.map((notification) =>
        notification._id === notificationId
          ? { ...notification, status: 'Read' }
          : notification
      );
      setNotifications(updatedNotifications);
      
    } catch (error) {
      console.error('Error marking notification as read:', error);
    }
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }
  
  return (
    <div className="displayNotifications">
      <h2>Notifications</h2>
      {notifications.length === 0 ? (
        <p>No messages are found.</p>
      ) : (
        <table className="notificationsTable">
          <thead>
            <tr>
              <th>Type</th>
              <th>Message</th>
              <th>Date</th>
              <th>Status</th>
              <th>Mark as Read</th>
            </tr>
          </thead>
          <tbody>
          {[...notifications].reverse().map((notification, index) => (
              <tr key={index}>
                <td>{notification.type}</td>
                <td>{notification.message}</td>
                <td>{new Date(notification.timestamp).toLocaleString()}</td>
                <td>{notification.status}</td>
                <td>
                  {notification.status === 'Unread' ? (
                    <button
                      type="button"
                      onClick={() => markAsRead(notification._id)}
                    >
                      Mark
                    </button>
                  ) : (
                    <span></span>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  )
}

export default DisplayNotification
