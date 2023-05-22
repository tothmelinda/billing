import React, { useEffect, useState } from "react";
import axios from "axios";
import { Modal, Button } from "react-bootstrap";
import UserUpdateFormPopup from "./UserUpdateFormPopup";
import UserAddFormPopup from "./UserAddFormPopup";
import "./FormPopup.css";

interface User {
  id: number;
  lastName: string;
  firstName: string;
  email: string;
  password: string;
  phoneNumber: string;
  role: string;
}

function UserComponent() {
  const [users, setUsers] = useState<User[]>([]);
  const [editingUser, setEditingUser] = useState<User | null>(null);
  const [isUpdateModalOpen, setIsUpdateModalOpen] = useState(false);
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);

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
    try {
      await axios.delete(`http://localhost:8080/users/${id}`);
      fetchData();
    } catch (error) {
      console.log("Error deleting user: ", error);
    }
  };

  const updateUser = (user: User) => {
    setEditingUser(user);
    setIsUpdateModalOpen(true);
  };

  const handleSubmit = async (updatedUser: User) => {
    try {
      await axios.put(
        `http://localhost:8080/users/${updatedUser.id}`,
        updatedUser
      );
      setEditingUser(null); // Close the form
      setIsUpdateModalOpen(false); // Close the update modal
      fetchData(); // Refresh the user data after update
    } catch (error) {
      console.log("Error updating user: ", error);
    }
  };

  const handleAddSubmit = async (newUser: User) => {
    try {
      await axios.post("http://localhost:8080/users", newUser);
      setIsAddModalOpen(false); // Close the add modal
      fetchData(); // Refresh the user data after adding a new user
    } catch (error) {
      console.log("Error adding user: ", error);
    }
  };

  const handleCancel = () => {
    setEditingUser(null); // Close the form
    setIsAddModalOpen(false); // Close the add form
  };

  const handleCloseModal = () => {
    setEditingUser(null);
    setIsUpdateModalOpen(false);
    setIsAddModalOpen(false);
  };

  return (
    <div className="data-component-wrapper">
      <div className="image-overlay"></div>
      <div className="data-component-content">
        <div className="container" style={{ textAlign: "center" }}>
          <Button
            variant="primary"
            className="mx-2"
            onClick={() => setIsAddModalOpen(true)}
          >
            Add User
          </Button>
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
                      <Button
                        variant="outline-primary"
                        className="mx-2"
                        onClick={() => updateUser(user)}
                      >
                        Update
                      </Button>
                      <Button
                        variant="danger"
                        className="mx-2"
                        onClick={() => deleteUser(user.id)}
                      >
                        Delete
                      </Button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
            {editingUser && (
              <Modal
                show={isUpdateModalOpen}
                onHide={handleCloseModal}
                centered
              >
                <Modal.Header
                  closeButton
                  style={{ background: "#333", color: "white" }}
                >
                  <Modal.Title>Update User</Modal.Title>
                </Modal.Header>
                <Modal.Body style={{ background: "#333" }}>
                  <UserUpdateFormPopup
                    user={editingUser}
                    onSubmit={handleSubmit}
                    onCancel={handleCloseModal}
                  />
                </Modal.Body>
              </Modal>
            )}
          </div>
        </div>
        {isAddModalOpen && (
          <Modal show={isAddModalOpen} onHide={handleCloseModal} centered>
            <Modal.Header
              closeButton
              style={{ background: "#333", color: "white" }}
            >
              <Modal.Title>Add User</Modal.Title>
            </Modal.Header>
            <Modal.Body style={{ background: "#333" }}>
              <UserAddFormPopup
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
                onCancel={handleCloseModal}
              />
            </Modal.Body>
          </Modal>
        )}
      </div>
    </div>
  );
}

export default UserComponent;
