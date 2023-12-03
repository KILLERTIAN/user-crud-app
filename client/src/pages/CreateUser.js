import React, { useState } from 'react';
import './CreateUser.css';


const avatarList = [
    'https://robohash.org/sintessequaerat.png?size=50x50&set=set1',
    'https://robohash.org/temporibusporrolaboriosam.png?size=50x50&set=set1',
    'https://robohash.org/laboriosamdolorepossimus.png?size=50x50&set=set1',
    "https://robohash.org/ullamsuntet.png?size=50x50&set=set1",
    "https://robohash.org/utquirepudiandae.png?size=50x50&set=set1",
    "https://robohash.org/maximequiomnis.png?size=50x50&set=set1",
    "https://robohash.org/occaecatinihilquos.png?size=50x50&set=set1",
    "https://robohash.org/praesentiumquasicorporis.png?size=50x50&set=set1",
    "https://robohash.org/nihilexcepturiomnis.png?size=50x50&set=set1",
   "https://robohash.org/commodiestvoluptatem.png?size=50x50&set=set1",
   "https://robohash.org/cupiditatemaioresaut.png?size=50x50&set=set1",
   
];

function CreateUser() {
    const [formData, setFormData] = useState({
        firstName: '',
        lastName: '',
        email: '',
        gender: '',
        domain: '',
    });

    const [selectedAvatar, setSelectedAvatar] = useState('https://robohash.org/laboriosamdolorepossimus.png?size=50x50&set=set1');
    const [isEditingAvatar, setIsEditingAvatar] = useState(false);

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData({
            ...formData,
            [name]: value,
        });
    };

    const handleSubmit = async (e) => {
    e.preventDefault();

    try {
        // Make a POST request to the server endpoint
        const response = await fetch('http://localhost:8000/api/users', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ ...formData, avatar: selectedAvatar }),
        });

        // Check if the request was successful (status code 2xx)
        if (response.ok) {
            console.log('User created successfully!');
        } else {
            console.error('Failed to create user:', response.statusText);
        }
    } catch (error) {
        console.error('An error occurred while creating the user:', error);
    }
};


    const handleAvatarClick = (avatar) => {
        setSelectedAvatar(avatar);
        setIsEditingAvatar(false);
    };

    return (
        <div className='createUserContainer'>
            <div className="createUserBox">
                <div className="createUserAvatarContainer">
                    <div className="userAvatarContainer">
                        <img src={selectedAvatar} alt="User Avatar" className="avatar" />

                        <button onClick={() => setIsEditingAvatar(true)} className="editAvatarButton">
                            <ion-icon name="pencil"></ion-icon>
                        </button>
                    </div>

                    {isEditingAvatar && (
                        <div className="avatarEditingPopup">
                            <h3>Choose an Avatar</h3>
                            <div className="avatarOptions">
                                {avatarList.map((avatar) => (
                                    <img
                                        key={avatar}
                                        src={avatar}
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
