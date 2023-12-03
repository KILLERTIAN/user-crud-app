import React from "react";
import "./Filter.css";

const Filter = ({ onFilterChange }) => {
  const handleFilterChange = (e) => {
    const { name, value } = e.target;
    onFilterChange(name, value);
  };

  return (
    <div className="filterContainer">
      <select
        name="gender"
        className="filterDropdown"
        onChange={handleFilterChange}
      >
        <option value="">All Genders</option>
        <option value="male">Male</option>
        <option value="female">Female</option>
        <option value="bigender">Bigender</option>
      </select>

      <select
        name="availability"
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
        <option value="domain1">Domain 1</option>
        <option value="domain2">Domain 2</option>
        <option value="domain3">Domain 3</option>
      </select>

      <button className="filterButton">Apply Filters</button>
    </div>
  );
};

export default Filter;
