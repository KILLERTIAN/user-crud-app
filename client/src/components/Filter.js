import React from "react";
import debounce from "lodash.debounce";
import "./Filter.css";

const Filter = ({ onFilterChange }) => {
  const handleFilterChange = debounce((e) => {
    const { name, value } = e.target;
    onFilterChange(name, value);
  }, 300);

  return (
    <div className="filterContainer">
      <select
        name="gender"
        className="filterDropdown"
        onChange={handleFilterChange}
      >
        <option value="">All Genders</option>
        <option value="Male">Male</option>
        <option value="Female">Female</option>
        <option value="Bigender">Bigender</option>
      </select>

      <select
        name="available"
        className="filterDropdown"
        onChange={handleFilterChange}
      >
        <option value="">All Availabilities</option>
        <option value="true">Available</option>
        <option value="false">Not Available</option>
      </select>

      <select
        name="domain"
        className="filterDropdown"
        onChange={handleFilterChange}
      >
        <option value="">All Domains</option>
        <option value="Marketing">Marketing</option>
        <option value="Finance">Finance</option>
        <option value="Sales">Sales</option>
        <option value="Business Development">Business Development</option>
        <option value="IT">IT</option>
        <option value="UI Designing">UI Designing</option>
      </select>

      <div className='userSearch'>
          <input type='text' placeholder='Search user name or Id' className='searchInput' onChange={handleFilterChange}/>
          <ion-icon className='userSearchIcon' name='search'></ion-icon>
        </div>
    </div>
  );
};

export default Filter;
