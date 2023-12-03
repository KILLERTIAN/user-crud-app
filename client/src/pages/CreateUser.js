import React, { useState } from 'react';
import './CreateUser.css';

const avatarList = [
  'avatar1.jpg',
  'avatar2.jpg',
  'avatar3.jpg',
  // Add more avatar URLs as needed
];

function CreateUser() {
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    gender: '',
    domain: '',
  });

  const [selectedAvatar, setSelectedAvatar] = useState('default-avatar.jpg');
  const [isEditingAvatar, setIsEditingAvatar] = useState(false);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // You can add the logic to handle form submission (e.g., send data to the server)
    console.log('Form submitted:', { ...formData, avatar: selectedAvatar });
  };

  const handleAvatarClick = (avatar) => {
    setSelectedAvatar(avatar);
    setIsEditingAvatar(false);
  };

  return (
    <div className='createUserContainer'>
      <div className="createUserBox">
        <div className="createUserAvatarContainer">
          <img src={`path/to/avatars/${selectedAvatar}`} alt="User Avatar" className="avatar" />
          <button onClick={() => setIsEditingAvatar(true)}>Edit Avatar</button>

          {isEditingAvatar && (
            <div className="avatarEditingPopup">
              <h3>Choose an Avatar</h3>
              <div className="avatarOptions">
                {avatarList.map((avatar) => (
                  <img
                    key={avatar}
                    src={`path/to/avatars/${avatar}`}
                    alt={`Avatar ${avatar}`}
                    onClick={() => handleAvatarClick(avatar)}
                  />
                ))}
              </div>
            </div>
          )}
        </div>
        <div className="createUserDataContainer">
          <form onSubmit={handleSubmit}>
            <label htmlFor="firstName">First Name</label>
            <input
              type="text"
              id="firstName"
              name="firstName"
              value={formData.firstName}
              onChange={handleInputChange}
              required
              autoComplete="given-name"
            />

            <label htmlFor="lastName">Last Name</label>
            <input
              type="text"
              id="lastName"
              name="lastName"
              value={formData.lastName}
              onChange={handleInputChange}
              required
              autoComplete="family-name"
            />

            <label htmlFor="email">Email</label>
            <input
              type="email"
              id="email"
              name="email"
              value={formData.email}
              onChange={handleInputChange}
              required
            />

            <label htmlFor="gender">Gender</label>
            <select
              id="gender"
              name="gender"
              value={formData.gender}
              onChange={handleInputChange}
              required
            >
              <option value="">Select Gender</option>
              <option value="male">Male</option>
              <option value="female">Female</option>
              <option value="bigender">Bigender</option>
            </select>

            <label htmlFor="domain">Domain</label>
            <input
              type="text"
              id="domain"
              name="domain"
              value={formData.domain}
              onChange={handleInputChange}
              required
            />

            <button type="submit">Create User</button>
          </form>
        </div>
      </div>
    </div>
  );
}

export default CreateUser;
