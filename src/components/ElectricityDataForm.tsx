import React, { useState } from "react";
import axios from "axios";
import "./UserForm.css";

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

interface ElectricityDataFormProps {
  data: ElectricityData;
  onSubmit: (newElectricityData: ElectricityData) => Promise<void>;
  onCancel: () => void;
}

const ElectricityDataForm: React.FC<ElectricityDataFormProps> = ({
  data,
  onSubmit,
  onCancel,
}) => {
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

    const newElectricityData: ElectricityData = {
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

    onSubmit(newElectricityData);
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
        Meter id:
        <input
          type="text"
          value={meterId}
          onChange={(e) => setMeterId(e.target.value)}
        />
      </label>
      <label>
        Start date:
        <input
          type="date"
          value={startDate}
          onChange={(e) => setStartDate(e.target.value)}
        />
      </label>
      <label>
        End date:
        <input
          type="date"
          value={endDate}
          onChange={(e) => setEndDate(e.target.value)}
        />
      </label>
      <label>
        Start reading:
        <input
          type="number"
          value={startReading}
          onChange={(e) => setStartReading(Number(e.target.value))}
        />
      </label>
      <label>
        End reading:
        <input
          type="number"
          value={endReading}
          onChange={(e) => setEndReading(Number(e.target.value))}
        />
      </label>
      <label>
        Units used:
        <input
          type="number"
          value={unitsUsed}
          onChange={(e) => setUnitsUsed(Number(e.target.value))}
        />
      </label>
      <label>
        Rate per unit:
        <input
          type="number"
          value={ratePerUnit}
          onChange={(e) => setRatePerUnit(Number(e.target.value))}
        />
      </label>
      <label>
        Bill Amount:
        <input
          type="number"
          value={billAmount}
          onChange={(e) => setBillAmount(Number(e.target.value))}
        />
      </label>
      <button type="submit">Save</button>
      <button type="button" onClick={onCancel}>
        Cancel
      </button>
    </form>
  );
};

export default ElectricityDataForm;
