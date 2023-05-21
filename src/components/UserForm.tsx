import React, { useState } from "react";
import "./UserForm.css";

interface User {
  id: number;
  lastName: string;
  firstName: string;
  email: string;
  password: string;
  phoneNumber: string;
  role: string;
}

interface UserFormProps {
  user: User;
  onSubmit: (updatedUser: User) => void;
  onCancel: () => void;
}

const UserForm: React.FC<UserFormProps> = ({ user, onSubmit, onCancel }) => {
  const [firstName, setFirstName] = useState(user.firstName);
  const [lastName, setLastName] = useState(user.lastName);
  const [email, setEmail] = useState(user.email);
  const [phoneNumber, setPhoneNumber] = useState(user.phoneNumber);

  const handleFormSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    const updatedUser: User = {
      ...user,
      firstName,
      lastName,
      email,
      phoneNumber,
    };

    onSubmit(updatedUser);
  };

  return (
    <form onSubmit={handleFormSubmit}>
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
        Phone Number:
        <input
          type="tel"
          value={phoneNumber}
          onChange={(e) => setPhoneNumber(e.target.value)}
        />
      </label>
      <button type="submit">Save</button>
      <button type="button" onClick={onCancel}>
        Cancel
      </button>
    </form>
  );
};

export default UserForm;
