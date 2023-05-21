import React, { useState } from "react";
import axios from "axios";
import "./UserForm.css";

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

interface InvoiceFormProps {
  invoice: Invoice;
  onSubmit: (newInvoice: Invoice) => Promise<void>;
  onCancel: () => void;
}

const InvoiceForm: React.FC<InvoiceFormProps> = ({
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

  const handleFormSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    const newInvoice: Invoice = {
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

    onSubmit(newInvoice);
  };

  return (
    <form onSubmit={handleFormSubmit} style={{ color: "white" }}>
      <label>
        User id:
        <input
          type="number"
          value={userId.toString()}
          onChange={(e) => setUserId(e.target.valueAsNumber)}
        />
      </label>
      <label>
        Description:
        <input
          type="text"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
        />
      </label>
      <label>
        Total amount:
        <input
          type="number"
          value={totalAmount}
          onChange={(e) => setTotalAmount(e.target.valueAsNumber)}
        />
      </label>
      <label>
        Issue date:
        <input
          type="date"
          value={dateIssued}
          onChange={(e) => setDateIssued(e.target.value)}
        />
      </label>
      <label>
        Due date:
        <input
          type="date"
          value={dueDate}
          onChange={(e) => setDueDate(e.target.value)}
        />
      </label>
      <label>
        Payment date:
        <input
          type="date"
          value={paidDate}
          onChange={(e) => setPaidDate(e.target.value)}
        />
      </label>
      <label>
        Is paid:
        <input
          type="checkbox"
          checked={isPaid}
          onChange={(e) => setIsPaid(e.target.checked)}
        />
      </label>
      <label>
        Payment method:
        <input
          type="text"
          value={paymentMethod}
          onChange={(e) => setPaymentMethod(e.target.value)}
        />
      </label>
      <button type="submit">Save</button>
      <button type="button" onClick={onCancel}>
        Cancel
      </button>
    </form>
  );
};

export default InvoiceForm;
