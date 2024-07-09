import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './User.css';
import Filter from '../components/Filter';

function User() {
  const [users, setUsers] = useState([]);
  const [filter, setFilter] = useState({
    gender: '',
    availability: '',
    domain: '',
  });
  const [editingUser, setEditingUser] = useState(null);

  useEffect(() => {
    fetchData();
  }, [filter]);

  const fetchData = async () => {
    try {
      const response = await axios.get('https://user-crud-app-api.onrender.com/api/users', {
        params: filter,
      });
      setUsers(response.data);
    } catch (error) {
      console.error('Error fetching data:', error.message);
    }
  };

  const handleFilterChange = (name, value) => {
    setFilter({
      ...filter,
      [name]: value,
    });
  };

  const handleEdit = (user) => {
    setEditingUser(user);
  };

  const handleSaveEdit = async () => {
    try {
      // Assume the server API supports updating user details
      await axios.put(`https://user-crud-app-api.onrender.com/api/users/${editingUser._id}`, editingUser);
      fetchData();
      setEditingUser(null);
    } catch (error) {
      console.error('Error updating user:', error.message);
    }
  };

  const handleCancelEdit = () => {
    setEditingUser(null);
  };

  const handleDelete = async (userId) => {
    const shouldDelete = window.confirm('Are you sure you want to delete?');
    if (shouldDelete) {
      try {
        await axios.delete(`https://user-crud-app-api.onrender.com/api/users/${userId}`);
        fetchData();
      } catch (error) {
        console.error('Error deleting data:', error.message);
      }
    }
  };

  return (
    <div className="userContainer">
      <Filter onFilterChange={handleFilterChange} />
      <div className="cardContainer">
        {users.map((user) => (
          <div className="card" key={user._id}>
            <div className="editIcon" onClick={() => handleEdit(user)}>
              <ion-icon name="create-outline" title="Edit"></ion-icon>
            </div>
            <div className="deleteIcon" onClick={() => handleDelete(user._id)}>
              <ion-icon name="trash-outline" title="Delete"></ion-icon>
            </div>
            <div className="avatarContainer">
              <img
                src={user.avatar}
                alt={`Avatar of ${user.first_name}`}
                className="avatar"
              />
              {user.gender.toLowerCase() === 'male' && (
                <ion-icon
                  name="male"
                  className={`genderIcon Male`}
                  title={user.gender}
                ></ion-icon>
              )}
              {user.gender.toLowerCase() === 'female' && (
                <ion-icon
                  name="female"
                  className={`genderIcon Female`}
                  title={user.gender}
                ></ion-icon>
              )}
              {user.gender.toLowerCase() === 'bigender' && (
                <ion-icon
                  name="transgender"
                  className={`genderIcon Bigender`}
                  title={user.gender}
                ></ion-icon>
              )}
              <div
                className={`availabilityIcon ${
                  user.available ? 'green' : 'red'
                }`}
                title={user.available ? 'Available' : 'Not Available'}
              ></div>
            </div>
            <h3>{`${user.first_name} ${user.last_name}`}</h3>
            <p className="userEmail">{user.email}</p>
            <p>{user.gender}</p>
            <p>{user.domain}</p>
            <p>Available: {user.available ? 'Yes' : 'No'}</p>
          </div>
        ))}
      </div>

      {/* Edit User Popup */}
      {editingUser && (
        <div className="editUserOverlay">
          <div className="editUserContainer">
            <h2>Edit User</h2>
            <label htmlFor="editFirstName">First Name</label>
            <input
              type="text"
              id="editFirstName"
              name="first_name"
              value={editingUser.first_name}
              onChange={(e) =>
                setEditingUser({
                  ...editingUser,
                  first_name: e.target.value,
                })
              }
            />

            <label htmlFor="editLastName">Last Name</label>
            <input
              type="text"
              id="editLastName"
              name="last_name"
              value={editingUser.last_name}
              onChange={(e) =>
                setEditingUser({
                  ...editingUser,
                  last_name: e.target.value,
                })
              }
            />

            <label htmlFor="editEmail">Email</label>
            <input
              type="email"
              id="editEmail"
              name="email"
              value={editingUser.email}
              onChange={(e) =>
                setEditingUser({
                  ...editingUser,
                  email: e.target.value,
                })
              }
            />

            <label htmlFor="editGender">Gender</label>
            <select
              id="editGender"
              name="gender"
              value={editingUser.gender}
              onChange={(e) =>
                setEditingUser({
                  ...editingUser,
                  gender: e.target.value,
                })
              }
            >
              <option value="male">Male</option>
              <option value="female">Female</option>
              <option value="bigender">Bigender</option>
            </select>

            <label htmlFor="editDomain">Domain</label>
            <input
              type="text"
              id="editDomain"
              name="domain"
              value={editingUser.domain}
              onChange={(e) =>
                setEditingUser({
                  ...editingUser,
                  domain: e.target.value,
                })
              }
            />

            <label htmlFor="editAvailability">Availability</label>
            <select
              id="editAvailability"
              name="availability"
              value={editingUser.available}
              onChange={(e) =>
                setEditingUser({
                  ...editingUser,
                  available: e.target.value === 'true',
                })
              }
            >
              <option value="true">Yes</option>
              <option value="false">No</option>
            </select>

            <div className="editUserButtons">
              <button onClick={handleSaveEdit}>Save</button>
              <button onClick={handleCancelEdit}>Cancel</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default User;
