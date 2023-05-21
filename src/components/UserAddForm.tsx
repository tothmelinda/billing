import React, { useState } from "react";
import axios from "axios";
import "./UserForm.css";

interface User {
  id: number;
  lastName: string;
  firstName: string;
  email: string;
  password: string;
  phoneNumber: string;
  image: string;
  role: string;
}

interface UserAddFormProps {
  user: User;
  onSubmit: (newUser: User) => Promise<void>; // Update the onSubmit function type
  onCancel: () => void;
}

const UserAddForm: React.FC<UserAddFormProps> = ({
  user,
  onSubmit,
  onCancel,
}) => {
  const [firstName, setFirstName] = useState(user.firstName);
  const [lastName, setLastName] = useState(user.lastName);
  const [email, setEmail] = useState(user.email);
  const [password, setPassword] = useState(user.password);
  const [phoneNumber, setPhoneNumber] = useState(user.phoneNumber);
  const [image, setImage] = useState(user.image);
  const [role, setRole] = useState(user.role);

  const handleFormSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    const newUser: User = {
      ...user,
      firstName,
      lastName,
      email,
      password,
      phoneNumber,
      image,
      role,
    };

    onSubmit(newUser);
  };

  return (
    <form onSubmit={handleFormSubmit} style={{ color: "white" }}>
      <label>
        First Name:
        <input
          type="text"
          value={firstName}
          onChange={(e) => setFirstName(e.target.value)}
        />
      </label>
      <label>
        Last Name:
        <input
          type="text"
          value={lastName}
          onChange={(e) => setLastName(e.target.value)}
        />
      </label>
      <label>
        Email:
        <input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
      </label>
      <label>
        Password:
        <input
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
      </label>
      <label>
        Phone Number:
        <input
          type="tel"
          value={phoneNumber}
          onChange={(e) => setPhoneNumber(e.target.value)}
        />
      </label>
      <label>
        Image:
        <input
          type="text"
          value={image}
          onChange={(e) => setImage(e.target.value)}
        />
      </label>
      <label>
        Role:
        <input
          type="role"
          value={role}
          onChange={(e) => setRole(e.target.value)}
        />
      </label>
      <button type="submit">Save</button>
      <button type="button" onClick={onCancel}>
        Cancel
      </button>
    </form>
  );
};

export default UserAddForm;
