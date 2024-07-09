import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./CreateUser.css";

export const avatarList = [
    "https://robohash.org/sintessequaerat.png?size=50x50&set=set1",
    "https://robohash.org/temporibusporrolaboriosam.png?size=50x50&set=set1",
    "https://robohash.org/laboriosamdolorepossimus.png?size=50x50&set=set1",
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
    const navigate = useNavigate(); // Initialize useNavigate hook

    const [formData, setFormData] = useState({
        first_name: "",
        last_name: "",
        email: "",
        gender: "",
        domain: "",
        available: false,
    });

    const [selectedAvatar, setSelectedAvatar] = useState(
        "https://robohash.org/laboriosamdolorepossimus.png?size=50x50&set=set1"
    );
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
            const response = await fetch("https://user-crud-app-api.onrender.com/api/users", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({ ...formData, avatar: selectedAvatar }),
            });

            // Check if the request was successful (status code 2xx)
            if (response.ok) {
                window.alert("User created successfully!");
                navigate("/users"); // Navigate to the users page after successful creation
            } else {
                console.error("Failed to create user:", response.statusText);
            }
        } catch (error) {
            console.error("An error occurred while creating the user:", error);
        }
    };

    const handleAvatarClick = (avatar) => {
        setSelectedAvatar(avatar);
        setIsEditingAvatar(false);
    };

    return (
        <div className="createUserContainer">
            <h1>Enter User Details</h1>
            <div className="createUserBox">
                <div className="createUserAvatarContainer">
                    <div className="userAvatarContainer">
                        <img src={selectedAvatar} alt="User Avatar" className="avatar" />

                        <button
                            onClick={() => setIsEditingAvatar(true)}
                            className="editAvatarButton"
                        >
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
                        <label htmlFor="first_name">First Name</label>
                        <input
                            type="text"
                            id="first_name"
                            name="first_name"
                            value={formData.first_name}
                            onChange={handleInputChange}
                            required
                            autoComplete="given-name"
                        />

                        <label htmlFor="last_name">Last Name</label>
                        <input
                            type="text"
                            id="last_name"
                            name="last_name"
                            value={formData.last_name}
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
                            <option value="Male">Male</option>
                            <option value="Female">Female</option>
                            <option value="Bigender">Bigender</option>
                        </select>

                        <label htmlFor="domain">Domain</label>
                        <select
                            id="domain"
                            name="domain"
                            value={formData.domain}
                            onChange={handleInputChange}
                            required
                        >
                            <option value="">All Domains</option>
                            <option value="Marketing">Marketing</option>
                            <option value="Finance">Finance</option>
                            <option value="Sales">Sales</option>
                            <option value="Business Development">Business Development</option>
                            <option value="IT">IT</option>
                            <option value="UI Designing">UI Designing</option>
                        </select>

                        <label htmlFor="available">Availability</label>
                        <select
                            id="available"
                            name="available"
                            value={formData.available}
                            onChange={handleInputChange}
                            required
                        >
                            <option value="">All Availabilities</option>
                            <option value="true">Available</option>
                            <option value="false">Not Available</option>
                        </select>

                        <button type="submit">Create User</button>
                    </form>
                </div>
            </div>
        </div>
    );
}

export default CreateUser;
