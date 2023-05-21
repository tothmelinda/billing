import { useEffect, useState } from "react";
import axios from "axios";
import { Link, useParams } from "react-router-dom";
import UserForm from "./UserForm";
import UserAddForm from "./UserAddForm";

interface User {
  id: number;
  lastName: string;
  firstName: string;
  email: string;
  password: string;
  phoneNumber: string;
  role: string;
}

// const { id } = useParams();

function UserComponent() {
  const [users, setUsers] = useState<User[]>([]);
  const [editingUser, setEditingUser] = useState<User | null>(null);
  const [showAddForm, setShowAddForm] = useState(false);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const result = await axios.get("http://localhost:8080/users");
      setUsers(result.data);
    } catch (error) {
      console.log("Error fetching data: ", error);
    }
  };

  const deleteUser = async (id: number) => {
    await axios.delete(`http://localhost:8080/users/${id}`);
    fetchData();
  };

  const updateUser = (user: User) => {
    setEditingUser(user);
  };

  const handleSubmit = async (updatedUser: User) => {
    try {
      await axios.put(
        `http://localhost:8080/users/${updatedUser.id}`,
        updatedUser
      );
      setEditingUser(null); // Close the form
      fetchData(); // Refresh the user data after update
    } catch (error) {
      console.log("Error updating user: ", error);
    }
  };

  const handleAddSubmit = async (newUser: User) => {
    try {
      await axios.post("http://localhost:8080/users", newUser);
      setShowAddForm(false); // Close the form
      fetchData(); // Refresh the user data after adding a new user
    } catch (error) {
      console.log("Error adding user: ", error);
    }
  };

  const handleCancel = () => {
    setEditingUser(null); // Close the form
    setShowAddForm(false); // Close the add form
  };

  return (
    <div className="data-component-wrapper">
      <div className="image-overlay"></div>
      <div className="data-component-content">
        <div className="container" style={{ textAlign: "center" }}>
          <button
            className="btn btn-primary mx-2"
            onClick={() => setShowAddForm(true)}
          >
            Add User
          </button>
          <div className="py-4">
            <table className="table border shadow">
              <thead>
                <tr>
                  <th scope="col" className="table-header">
                    id
                  </th>
                  <th scope="col" className="table-header">
                    First Name
                  </th>
                  <th scope="col" className="table-header">
                    Last Name
                  </th>
                  <th scope="col" className="table-header">
                    Email
                  </th>
                  <th scope="col" className="table-header">
                    Phone number
                  </th>
                  <th scope="col" className="table-header">
                    Role
                  </th>
                  <th scope="col" className="table-header">
                    Action
                  </th>
                </tr>
              </thead>
              <tbody>
                {users.map((user) => (
                  <tr key={user.id}>
                    <td className="table-cell">{user.id}</td>
                    <td className="table-cell">{user.firstName}</td>
                    <td className="table-cell">{user.lastName}</td>
                    <td className="table-cell">{user.email}</td>
                    <td className="table-cell">{user.phoneNumber}</td>
                    <td className="table-cell">{user.role}</td>
                    <td style={{ textAlign: "center" }}>
                      <button
                        className="btn btn-outline-primary mx-2"
                        onClick={() => updateUser(user)}
                      >
                        Update
                      </button>
                      <button
                        className="btn btn-danger mx-2"
                        onClick={() => deleteUser(user.id)}
                      >
                        Delete
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
            {editingUser && (
              <UserForm
                user={editingUser}
                onSubmit={handleSubmit}
                onCancel={handleCancel}
              />
            )}
          </div>
        </div>
        {showAddForm && (
          <UserAddForm
            user={{
              id: 0,
              lastName: "",
              firstName: "",
              email: "",
              password: "",
              phoneNumber: "",
              image: "",
              role: "",
            }}
            onSubmit={handleAddSubmit}
            onCancel={handleCancel}
          />
        )}
      </div>
    </div>
  );
}

export default UserComponent;
