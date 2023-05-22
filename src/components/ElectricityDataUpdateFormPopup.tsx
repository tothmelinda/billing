import React, { useState } from "react";
import { Modal, Button, Form } from "react-bootstrap";

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

interface ElectricityDataUpdateFormPopupProps {
  data: ElectricityData;
  onSubmit: (updatedElectricityData: ElectricityData) => void;
  onCancel: () => void;
}

const ElectricityDataUpdateFormPopup: React.FC<
  ElectricityDataUpdateFormPopupProps
> = ({ data, onSubmit, onCancel }) => {
  const [meterId, setMeterId] = useState(data.meterId);
  const [userId, setUserId] = useState(data.user.id);
  const [startDate, setStartDate] = useState(data.startDate);
  const [endDate, setEndDate] = useState(data.endDate);
  const [startReading, setStartReading] = useState(data.startReading);
  const [endReading, setEndReading] = useState(data.endReading);
  const [unitsUsed, setUnitsUsed] = useState(data.unitsUsed);
  const [ratePerUnit, setRatePerUnit] = useState(data.ratePerUnit);
  const [billAmount, setBillAmount] = useState(data.billAmount);

  const handleFormSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    const updatedElectricityData: ElectricityData = {
      ...data,
      user: {
        id: userId,
      },
      meterId,
      startDate,
      endDate,
      startReading,
      endReading,
      unitsUsed,
      ratePerUnit,
      billAmount,
    };

    onSubmit(updatedElectricityData);
  };

  function InvoiceUpdate() {
    const [userId, setUserId] = useState(0);
  }
  const handleUserIdChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = parseInt(e.target.value, 10);
    setUserId(value);
  };

  const handleStartReadingChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = parseInt(e.target.value, 10);
    setStartReading(value);
  };

  const handleEndReadingChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = parseInt(e.target.value, 10);
    setEndReading(value);
  };

  const handleUnitsUsedChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = parseInt(e.target.value, 10);
    setUnitsUsed(value);
  };

  const handleRatePerUnitChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = parseInt(e.target.value, 10);
    setRatePerUnit(value);
  };

  const handleBillAmountChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = parseInt(e.target.value, 10);
    setBillAmount(value);
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
      <Form.Group controlId="meterId">
        <Form.Label>Meter id:</Form.Label>
        <Form.Control
          type="text"
          value={meterId}
          onChange={(e) => setMeterId(e.target.value)}
        />
      </Form.Group>
      <Form.Group controlId="startDate">
        <Form.Label>Start date:</Form.Label>
        <Form.Control
          type="date"
          value={startDate}
          onChange={(e) => setStartDate(e.target.value)}
        />
      </Form.Group>
      <Form.Group controlId="endDate">
        <Form.Label>End date:</Form.Label>
        <Form.Control
          type="date"
          value={endDate}
          onChange={(e) => setEndDate(e.target.value)}
        />
      </Form.Group>
      <Form.Group controlId="startReading">
        <Form.Label>Start reading:</Form.Label>
        <Form.Control
          type="number"
          value={startReading}
          onChange={handleStartReadingChange}
        />
      </Form.Group>
      <Form.Group controlId="endReading">
        <Form.Label>End reading:</Form.Label>
        <Form.Control
          type="number"
          value={endReading}
          onChange={handleEndReadingChange}
        />
      </Form.Group>
      <Form.Group controlId="unitsUsed">
        <Form.Label>Unites used:</Form.Label>
        <Form.Control
          type="number"
          value={unitsUsed}
          onChange={handleUnitsUsedChange}
        />
      </Form.Group>
      <Form.Group controlId="ratePerUnit">
        <Form.Label>Rate per unit:</Form.Label>
        <Form.Control
          type="number"
          value={ratePerUnit}
          onChange={handleRatePerUnitChange}
        />
      </Form.Group>
      <Form.Group controlId="billAmount">
        <Form.Label>Bill Amount:</Form.Label>
        <Form.Control
          type="number"
          value={billAmount}
          onChange={handleBillAmountChange}
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

export default ElectricityDataUpdateFormPopup;
