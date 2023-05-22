import React, { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import { format, parse, toDate } from "date-fns";
import { Modal, Button } from "react-bootstrap";
import InvoiceUpdateFormPopup from "./InvoiceUpdateFormPopup";
import InvoiceAddFormPopup from "./InvoiceAddFormPopup";
import "./FormPopup.css";

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

function InvoiceComponent() {
  const [invoice, setInvoice] = useState<Invoice[]>([]);
  const [editingInvoice, setEditingInvoice] = useState<Invoice | null>(null);
  const [isUpdateModalOpen, setIsUpdateModalOpen] = useState(false);
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const result = await axios.get<Invoice[]>(
        "http://localhost:8080/invoices"
      );
      setInvoice(result.data);
    } catch (error) {
      console.log("Error fetching data: ", error);
    }
  };

  const deleteInvoice = async (id: number) => {
    await axios.delete(`http://localhost:8080/invoices/${id}`);
    fetchData();
  };

  const updateInvoice = (invoice: Invoice) => {
    setEditingInvoice(invoice);
    setIsUpdateModalOpen(true);
  };

  const handleAddSubmit = async (newInvoice: Invoice) => {
    try {
      const dateIssued = parse(newInvoice.dateIssued, "yyyy-MM-dd", new Date());
      const dueDate = parse(newInvoice.dueDate, "yyyy-MM-dd", new Date());

      const paidDate = parse(newInvoice.paidDate, "yyyy-MM-dd", new Date());

      const formattedDateIssued = format(dateIssued, "yyyy-MM-dd");
      const formattedDueDate = format(dueDate, "yyyy-MM-dd");
      const formattedPaidDate = format(paidDate, "yyyy-MM-dd");

      const updatedInvoice: Invoice = {
        ...newInvoice,
        dateIssued: formattedDateIssued,
        dueDate: formattedDueDate,
        paidDate: formattedPaidDate,
      };
      await axios.post("http://localhost:8080/invoices", updatedInvoice);
      setEditingInvoice(null);
      setIsUpdateModalOpen(false);
      fetchData();
    } catch (error) {
      console.log("Error adding indexes: ", error);
    }
  };

  const handleUpdateSubmit = async (updatedInvoice: Invoice) => {
    try {
      const dateIssued = format(
        new Date(updatedInvoice.dateIssued),
        "yyyy-MM-dd"
      );
      const dueDate = format(new Date(updatedInvoice.dueDate), "yyyy-MM-dd");
      const paidDate = format(new Date(updatedInvoice.paidDate), "yyyy-MM-dd");

      const updatedInvoiceData: Invoice = {
        ...updatedInvoice,
        dateIssued,
        dueDate,
        paidDate,
      };

      await axios.put(
        `http://localhost:8080/invoices/${updatedInvoice.id}`,
        updatedInvoiceData
      );
      setEditingInvoice(null);
      fetchData();
    } catch (error) {
      console.log("Error updating invoice: ", error);
    }
  };

  const handleCancel = () => {
    setEditingInvoice(null);
    setIsAddModalOpen(false);
  };

  const handleCloseModal = () => {
    setEditingInvoice(null);
    setIsUpdateModalOpen(false);
    setIsAddModalOpen(false);
  };

  return (
    <div className="user-component-wrapper">
      <div className="image-overlay"></div>
      <div className="user-component-content">
        <div className="container" style={{ textAlign: "center" }}>
          <button
            className="btn btn-primary mx-2"
            onClick={() => setIsAddModalOpen(true)}
          >
            Add invoice
          </button>
          <div className="py-4">
            <table className="table border shadow">
              <thead>
                <tr>
                  <th scope="col" className="table-header">
                    id
                  </th>
                  <th scope="col" className="table-header">
                    User id
                  </th>
                  <th scope="col" className="table-header">
                    Description
                  </th>
                  <th scope="col" className="table-header">
                    Total Amount
                  </th>
                  <th scope="col" className="table-header">
                    Date issued
                  </th>
                  <th scope="col" className="table-header">
                    Due date
                  </th>
                  <th scope="col" className="table-header">
                    Paid date
                  </th>
                  <th scope="col" className="table-header">
                    Is paid
                  </th>
                  <th scope="col" className="table-header">
                    Payment methodt
                  </th>
                  <th scope="col" className="table-header">
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody>
                {invoice.map((item) => (
                  <tr key={item.id}>
                    <td className="table-cell">{item.id}</td>
                    <td className="table-cell">{item.user.id}</td>
                    <td className="table-cell">{item.description}</td>
                    <td className="table-cell">{item.totalAmount}</td>
                    <td className="table-cell">{item.dateIssued}</td>
                    <td className="table-cell">{item.dueDate}</td>
                    <td className="table-cell">{item.paidDate}</td>
                    <td className="table-cell">
                      {item.isPaid ? "Paid" : "Not paid"}
                    </td>
                    <td className="table-cell">{item.paymentMethod}</td>
                    <td style={{ textAlign: "center" }}>
                      <Button
                        variant="outline-primary"
                        className="mx-2"
                        onClick={() => updateInvoice(item)}
                      >
                        Update
                      </Button>
                      <Button
                        variant="danger"
                        className="mx-2"
                        onClick={() => deleteInvoice(item.id)}
                      >
                        Delete
                      </Button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
        {isAddModalOpen && (
          <Modal show={isAddModalOpen} onHide={handleCloseModal} centered>
            <Modal.Header
              closeButton
              style={{ background: "#333", color: "white" }}
            >
              <Modal.Title>Add Invoice</Modal.Title>
            </Modal.Header>
            <Modal.Body style={{ background: "#333" }}>
              <InvoiceAddFormPopup
                invoice={{
                  id: 0,
                  user: { id: 1 },
                  description: "",
                  totalAmount: 0,
                  dateIssued: format(new Date(), "yyyy-MM-dd"),
                  dueDate: format(new Date(), "yyyy-MM-dd"),
                  paidDate: format(new Date(), "yyyy-MM-dd"),
                  isPaid: true,
                  paymentMethod: "",
                }}
                onSubmit={handleAddSubmit}
                onCancel={handleCloseModal}
              />
            </Modal.Body>
          </Modal>
        )}
        {editingInvoice && (
          <Modal show={isUpdateModalOpen} onHide={handleCloseModal} centered>
            <Modal.Header
              closeButton
              style={{ background: "#333", color: "white" }}
            >
              <Modal.Title>Update Invoice</Modal.Title>
            </Modal.Header>
            <Modal.Body style={{ background: "#333" }}>
              <InvoiceUpdateFormPopup
                invoice={editingInvoice}
                onSubmit={handleUpdateSubmit}
                onCancel={handleCloseModal}
              />
            </Modal.Body>
          </Modal>
        )}
      </div>
    </div>
  );
}

export default InvoiceComponent;
