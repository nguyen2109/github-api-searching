"use client";
import { useState } from "react";
import axios from "axios";

const Page = () => {
  const [username, setUsername] = useState("");
  const [result, setResult] = useState("");

  const handleFormSubmit = async (event) => {
    event.preventDefault();

    const cleanedUsername = username.replace(/\s+/g, ""); // Loại bỏ tất cả các khoảng trắng

    if (!cleanedUsername) {
      setResult("Please enter a valid username.");
      return;
    }

    try {
      const response = await axios.get(
        `https://api.github.com/users/${cleanedUsername}`
      );
      const data = response.data;

      setResult(JSON.stringify(data, null, 2));
    } catch (error) {
      setResult("Error fetching data.");
    }
  };

  const handleUsernameChange = (event) => {
    setUsername(event.target.value);
  };

  return (
    <div>
      <form onSubmit={handleFormSubmit}>
        <input type="text" value={username} onChange={handleUsernameChange} />
        <button type="submit">Submit</button>
      </form>
      <div>
        <pre>{result}</pre>
      </div>
    </div>
  );
};

export default Page;
