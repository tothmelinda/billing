import React, { useState } from "react";
import { Modal, Button, Form } from "react-bootstrap";

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

interface UserAddFormPopupProps {
  user: User;
  onSubmit: (newUser: User) => Promise<void>;
  onCancel: () => void;
}

const UserAddFormPopup: React.FC<UserAddFormPopupProps> = ({
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

  const handleFormSubmit = async (e: React.FormEvent) => {
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

    await onSubmit(newUser);
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
      <Form.Group controlId="password">
        <Form.Label>Password:</Form.Label>
        <Form.Control
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
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
      <Form.Group controlId="image">
        <Form.Label>Image:</Form.Label>
        <Form.Control
          type="text"
          value={image}
          onChange={(e) => setImage(e.target.value)}
        />
      </Form.Group>
      <Form.Group controlId="role">
        <Form.Label>Role:</Form.Label>
        <Form.Control
          type="text"
          value={role}
          onChange={(e) => setRole(e.target.value)}
        />
      </Form.Group>
      <div className="add-form-popup-buttons">
        <Button variant="primary" type="submit">
          Add
        </Button>
        <Button variant="secondary" onClick={onCancel}>
          Cancel
        </Button>
      </div>
    </Form>
  );
};

export default UserAddFormPopup;
