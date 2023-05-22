import React, { useState } from "react";
import { Modal, Button, Form } from "react-bootstrap";

interface User {
  id: number;
  lastName: string;
  firstName: string;
  email: string;
  password: string;
  phoneNumber: string;
  role: string;
}

interface UserUpdateFormPopupProps {
  user: User;
  onSubmit: (updatedUser: User) => void;
  onCancel: () => void;
}

const UserUpdateFormPopup: React.FC<UserUpdateFormPopupProps> = ({
  user,
  onSubmit,
  onCancel,
}) => {
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
    <Form onSubmit={handleFormSubmit}>
      <Form.Group controlId="firstName">
        <Form.Label>First Name:</Form.Label>
        <Form.Control
          type="text"
          value={firstName}
          onChange={(e) => setFirstName(e.target.value)}
        />
      </Form.Group>
      <Form.Group controlId="lastName">
        <Form.Label>Last Name:</Form.Label>
        <Form.Control
          type="text"
          value={lastName}
          onChange={(e) => setLastName(e.target.value)}
        />
      </Form.Group>
      <Form.Group controlId="email">
        <Form.Label>Email:</Form.Label>
        <Form.Control
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
      </Form.Group>
      <Form.Group controlId="phoneNumber">
        <Form.Label>Phone Number:</Form.Label>
        <Form.Control
          type="tel"
          value={phoneNumber}
          onChange={(e) => setPhoneNumber(e.target.value)}
        />
      </Form.Group>
      <div className="update-form-popup-buttons">
        <Button variant="primary" type="submit">
          Save
        </Button>
        <Button variant="secondary" onClick={onCancel}>
          Cancel
        </Button>
      </div>
    </Form>
  );
};

export default UserUpdateFormPopup;
