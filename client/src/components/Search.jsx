import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "../components/Search.css";

function SearchComponent({ onSearch }) {
  const [inputValue, setInputValue] = useState("");
  const navigate = useNavigate();

  const handleSearch = async (e) => {
    e.preventDefault();
    if (inputValue.trim() === "") {
      alert("Please enter a city name");
      return;
    }
    try {
      await onSearch(inputValue.trim());  // Call the search function passed via props
      setInputValue(""); // Clear the input field after search
      navigate("/"); // Navigate back to home page after search
    } catch (error) {
      console.error("Error during search:", error.message);
    }
  };

  return (
    <div className="container">
      <form className="form" onSubmit={handleSearch}>
        <input
          type="text"
          value={inputValue}
          onChange={(e) => setInputValue(e.target.value)}  // Update input value
          placeholder="Enter city name"
        />
        <button className="btn btn-primary" type="submit">
          Search
        </button>
      </form>
    </div>
  );
}

export default SearchComponent;
