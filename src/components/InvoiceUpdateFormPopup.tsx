import React, { useState } from "react";
import { Modal, Button, Form } from "react-bootstrap";

interface Invoice {
  id: number;
  user: {
    id: number;
  };
  description: string;
  totalAmount: number;
  dateIssued: string;
  dueDate: string;
  paidDate: string;
  isPaid: boolean;
  paymentMethod: string;
}

interface InvoiceUpdateFormPopupProps {
  invoice: Invoice;
  onSubmit: (updatedInvoice: Invoice) => void;
  onCancel: () => void;
}

const InvoiceUpdateFormPopup: React.FC<InvoiceUpdateFormPopupProps> = ({
  invoice,
  onSubmit,
  onCancel,
}) => {
  const [userId, setUserId] = useState(invoice.user.id);
  const [description, setDescription] = useState(invoice.description);
  const [totalAmount, setTotalAmount] = useState(invoice.totalAmount);
  const [dateIssued, setDateIssued] = useState(invoice.dateIssued);
  const [dueDate, setDueDate] = useState(invoice.dueDate);
  const [paidDate, setPaidDate] = useState(invoice.paidDate);
  const [isPaid, setIsPaid] = useState(invoice.isPaid);
  const [paymentMethod, setPaymentMethod] = useState(invoice.paymentMethod);

  const handleFormSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const updatedInvoice: Invoice = {
      ...invoice,
      user: {
        id: userId,
      },
      description,
      totalAmount,
      dateIssued,
      dueDate,
      paidDate,
      isPaid,
      paymentMethod,
    };

    onSubmit(updatedInvoice);
  };

  function InvoiceUpdate() {
    const [userId, setUserId] = useState(0);
    const [totalAmount, setTotalAmount] = useState(0);
    const [isPaid, setIsPaid] = useState(false);
  }
  const handleUserIdChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = parseInt(e.target.value, 10);
    setUserId(value);
  };

  const handleTotalAmountChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = parseInt(e.target.value, 10);
    setTotalAmount(value);
  };

  const handleIsPaidChange = () => {
    setIsPaid(!isPaid);
  };

  return (
    <Form onSubmit={handleFormSubmit}>
      <Form.Group controlId="userId">
        <Form.Label>User id:</Form.Label>
        <Form.Control
          type="number"
          value={userId}
          onChange={handleUserIdChange}
        />
      </Form.Group>
      <Form.Group controlId="lastName">
        <Form.Label>Description:</Form.Label>
        <Form.Control
          type="text"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
        />
      </Form.Group>
      <Form.Group controlId="totalAmount">
        <Form.Label>Total amount:</Form.Label>
        <Form.Control
          type="number"
          value={totalAmount}
          onChange={handleTotalAmountChange}
        />
      </Form.Group>
      <Form.Group controlId="dateIssued">
        <Form.Label>Issue date:</Form.Label>
        <Form.Control
          type="date"
          value={dateIssued}
          onChange={(e) => setDateIssued(e.target.value)}
        />
      </Form.Group>
      <Form.Group controlId="dueDate">
        <Form.Label>Due date:</Form.Label>
        <Form.Control
          type="date"
          value={dueDate}
          onChange={(e) => setDueDate(e.target.value)}
        />
      </Form.Group>
      <Form.Group controlId="paidDate">
        <Form.Label> Payment date:</Form.Label>
        <Form.Control
          type="date"
          value={paidDate}
          onChange={(e) => setPaidDate(e.target.value)}
        />
      </Form.Group>
      <Form.Group controlId="isPaid">
        <Form.Label>Is paid:</Form.Label>
        <Form.Check
          type="checkbox"
          checked={isPaid}
          onChange={handleIsPaidChange}
        />
      </Form.Group>
      <Form.Group controlId="paymentMethod">
        <Form.Label>Payment method:</Form.Label>
        <Form.Control
          type="text"
          value={paymentMethod}
          onChange={(e) => setPaymentMethod(e.target.value)}
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

export default InvoiceUpdateFormPopup;
