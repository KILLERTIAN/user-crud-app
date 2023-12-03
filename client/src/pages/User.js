import React, { useState, useEffect } from "react";
import axios from "axios";
import "./User.css";
import Filter from "../components/Filter";

function User() {
  const [users, setUsers] = useState([]);
  const [filter, setFilter] = useState({
    gender: "",
    availability: "",
    domain: "",
  });

  useEffect(() => {
    fetchData();
  }, [filter]);

  const fetchData = async () => {
    try {
      const response = await axios.get("http://localhost:8000/api/users", {
        params: filter,
      });
      setUsers(response.data);
    } catch (error) {
      console.error("Error fetching data:", error.message);
    }
  };

  const handleFilterChange = (name, value) => {
    setFilter({
      ...filter,
      [name]: value,
    });
  };

  return (
    <div className="userContainer">
    <Filter onFilterChange={handleFilterChange} />
      <div className="cardContainer">
        {users.map((user) => (
          <div className="card" key={user._id}>
            <div className="avatarContainer">
              <img
                src={user.avatar}
                alt={`Avatar of ${user.first_name}`}
                className="avatar"
              />
              {user.gender.toLowerCase() === "male" && (
                <ion-icon
                  name="male"
                  class={`genderIcon Male`}
                  title={user.gender}
                ></ion-icon>
              )}
              {user.gender.toLowerCase() === "female" && (
                <ion-icon
                  name="female"
                  class={`genderIcon Female`}
                  title={user.gender}
                ></ion-icon>
              )}
              {user.gender.toLowerCase() === "bigender" && (
                <ion-icon
                  name="transgender"
                  class={`genderIcon Bigender`}
                  title={user.gender}
                ></ion-icon>
              )}
              <div
                className={`availabilityIcon ${
                  user.available ? "green" : "red"
                }`}
                title={user.available ? "Available" : "Not Available"}
              ></div>
            </div>
            <h3>{`${user.first_name} ${user.last_name}`}</h3>
            <p className="userEmail">{user.email}</p>
            <p>{user.gender}</p>
            <p>Domain: {user.domain}</p>
            <p>Available: {user.available ? "Yes" : "No"}</p>
          </div>
        ))}
      </div>
    </div>
  );
}

export default User;