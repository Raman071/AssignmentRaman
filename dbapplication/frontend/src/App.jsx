import { useState, useEffect } from "react";
import axios from "axios";

function App() {
  const [users, setUsers] = useState([]);
  const [newUser, setNewUser] = useState({
    name: "",
    email: "",
    age: "",
  });

  // Fetch users from the backend when the component mounts
  useEffect(() => {
    axios
      .get("http://localhost:3000/users")
      .then((response) => {
        setUsers(response.data); // Set the users state
      })
      .catch((error) => {
        console.error("Error fetching users:", error);
      });
  }, []);

  // Handle form input changes
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewUser((prevUser) => ({
      ...prevUser,
      [name]: value,
    }));
  };

  // Handle the form submission to add a new user
  const handleSubmit = (e) => {
    e.preventDefault();

    // Send a POST request to add the new user
    axios
      .post("http://localhost:3000/users", newUser)
      .then((response) => {
        // Once the user is added, update the user list
        setUsers([...users, response.data]);

        // Reset the form inputs
        setNewUser({ name: "", email: "", age: "" });
      })
      .catch((error) => {
        console.error("Error adding user:", error);
      });
  };

  return (
    <div className="App">
      <h1>User List</h1>
      
      {/* Add User Form */}
      <h2>Add a New User</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <label>Name:</label>
          <input
            type="text"
            name="name"
            value={newUser.name}
            onChange={handleInputChange}
            required
          />
        </div>
        <div>
          <label>Email:</label>
          <input
            type="email"
            name="email"
            value={newUser.email}
            onChange={handleInputChange}
            required
          />
        </div>
        <div>
          <label>Age:</label>
          <input
            type="number"
            name="age"
            value={newUser.age}
            onChange={handleInputChange}
            required
          />
        </div>
        <button type="submit">Add User</button>
      </form>

      {/* User List */}
      <h2>Users</h2>
      {users.length === 0 ? (
        <p>No users found.</p>
      ) : (
        <ul>
          {users.map((user) => (
            <li key={user.id}>
              {user.name} - {user.email} - Age: {user.age}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

export default App;
