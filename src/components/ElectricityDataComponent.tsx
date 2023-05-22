import React, { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import ElectricityDataUpdateFormPopup from "./ElectricityDataUpdateFormPopup";
import ElectricityDataAddFormPopup from "./ElectricityDataAddFormPopup";
import "./FormPopup.css";
import { Modal, Button } from "react-bootstrap";
import { format, parse, toDate } from "date-fns";

interface ElectricityData {
  id: number;
  user: {
    id: number;
  };
  meterId: string;
  startDate: string;
  endDate: string;
  startReading: number;
  endReading: number;
  unitsUsed: number;
  ratePerUnit: number;
  billAmount: number;
}

function ElectricityDataComponent() {
  const [data, setData] = useState<ElectricityData[]>([]);
  const [editingData, setEditingData] = useState<ElectricityData | null>(null);
  const [isUpdateModalOpen, setIsUpdateModalOpen] = useState(false);
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const result = await axios.get<ElectricityData[]>(
        "http://localhost:8080/electricity-data"
      );
      setData(result.data);
    } catch (error) {
      console.log("Error fetching data: ", error);
    }
  };

  const deleteData = async (id: number) => {
    await axios.delete(`http://localhost:8080/electricity-data/${id}`);
    fetchData();
  };

  const updateData = (data: ElectricityData) => {
    setEditingData(data);
    setIsUpdateModalOpen(true);
  };

  const handleAddSubmit = async (newElectricityData: ElectricityData) => {
    try {
      const startDate = parse(
        newElectricityData.startDate,
        "yyyy-MM-dd",
        new Date()
      );
      const endDate = parse(
        newElectricityData.endDate,
        "yyyy-MM-dd",
        new Date()
      );

      const formattedStartDate = format(startDate, "yyyy-MM-dd'T'HH:mm:ss");
      const formattedEndDate = format(endDate, "yyyy-MM-dd'T'HH:mm:ss");

      const updatedData: ElectricityData = {
        ...newElectricityData,
        startDate: formattedStartDate,
        endDate: formattedEndDate,
      };

      await axios.post("http://localhost:8080/electricity-data", updatedData);
      setEditingData(null);
      setIsUpdateModalOpen(false);
      fetchData();
    } catch (error) {
      console.log("Error adding indexes: ", error);
    }
  };

  const handleUpdateSubmit = async (updatedData: ElectricityData) => {
    try {
      const startDate = format(
        new Date(updatedData.startDate),
        "yyyy-MM-dd'T'HH:mm:ss"
      );
      const endDate = format(
        new Date(updatedData.endDate),
        "yyyy-MM-dd'T'HH:mm:ss"
      );

      const updatedElectricityData: ElectricityData = {
        ...updatedData,
        startDate,
        endDate,
      };

      await axios.put(
        `http://localhost:8080/electricity-data/${updatedData.id}`,
        updatedElectricityData
      );
      setEditingData(null);
      fetchData();
    } catch (error) {
      console.log("Error updating data: ", error);
    }
  };

  const handleCancel = () => {
    setEditingData(null);
    setIsAddModalOpen(false);
  };

  const handleCloseModal = () => {
    setEditingData(null);
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
            Add index
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
                    Meter id
                  </th>
                  <th scope="col" className="table-header">
                    Start date
                  </th>
                  <th scope="col" className="table-header">
                    End date
                  </th>
                  <th scope="col" className="table-header">
                    Start reading
                  </th>
                  <th scope="col" className="table-header">
                    End reading
                  </th>
                  <th scope="col" className="table-header">
                    Units used
                  </th>
                  <th scope="col" className="table-header">
                    Rate per unit
                  </th>
                  <th scope="col" className="table-header">
                    Bill amount
                  </th>
                  <th scope="col" className="table-header">
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody>
                {data.map((item) => (
                  <tr key={item.id}>
                    <td className="table-cell">{item.id}</td>
                    <td className="table-cell">{item.user.id}</td>
                    <td className="table-cell">{item.meterId}</td>
                    <td className="table-cell">{item.startDate}</td>
                    <td className="table-cell">{item.endDate}</td>
                    <td className="table-cell">{item.startReading}</td>
                    <td className="table-cell">{item.endReading}</td>
                    <td className="table-cell">{item.unitsUsed}</td>
                    <td className="table-cell">{item.ratePerUnit}</td>
                    <td className="table-cell">{item.billAmount}</td>
                    <td style={{ textAlign: "center" }}>
                      <Button
                        variant="outline-primary"
                        className="mx-2"
                        onClick={() => updateData(item)}
                      >
                        Update
                      </Button>
                      <Button
                        variant="danger"
                        className="mx-2"
                        onClick={() => deleteData(item.id)}
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
              <Modal.Title>Add Index</Modal.Title>
            </Modal.Header>
            <Modal.Body style={{ background: "#333" }}>
              <ElectricityDataAddFormPopup
                data={{
                  id: 0,
                  user: { id: 1 },
                  meterId: "",
                  startDate: format(new Date(), "yyyy-MM-dd"),
                  endDate: format(new Date(), "yyyy-MM-dd"),
                  startReading: 0,
                  endReading: 0,
                  unitsUsed: 0,
                  ratePerUnit: 0,
                  billAmount: 0,
                }}
                onSubmit={handleAddSubmit}
                onCancel={handleCloseModal}
              />
            </Modal.Body>
          </Modal>
        )}
        {editingData && (
          <Modal show={isUpdateModalOpen} onHide={handleCloseModal} centered>
            <Modal.Header
              closeButton
              style={{ background: "#333", color: "white" }}
            >
              <Modal.Title>Update Index</Modal.Title>
            </Modal.Header>
            <Modal.Body style={{ background: "#333" }}>
              <ElectricityDataUpdateFormPopup
                data={editingData}
                onSubmit={handleUpdateSubmit}
                onCancel={handleCancel}
              />
            </Modal.Body>
          </Modal>
        )}
      </div>
    </div>
  );
}

export default ElectricityDataComponent;
