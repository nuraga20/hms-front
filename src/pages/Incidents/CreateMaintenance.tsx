import React, { useState } from 'react';
import Breadcrumb from '../../components/Breadcrumbs/Breadcrumb';
import { useNavigate } from 'react-router-dom';

const CreateMaintenance: React.FC = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    resident_id: '',
    room_id: '',
    description: '',
    status: 'pending',
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log('Creating Maintenance Request:', formData);
    navigate('/incidents/maintenanceRequests'); // Redirect to the Maintenance Requests page
  };

  return (
    <>
      <Breadcrumb pageName="Create Maintenance Request" />

      <div className="p-6 bg-white dark:bg-boxdark rounded shadow-md">
        <h1 className="text-2xl font-bold mb-4">Create Maintenance Request</h1>
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label className="block text-sm font-medium mb-2">Resident ID</label>
            <input
              type="text"
              name="resident_id"
              value={formData.resident_id}
              onChange={handleChange}
              className="w-full rounded border border-stroke py-2 px-3"
              placeholder="Enter Resident ID"
            />
          </div>
          <div className="mb-4">
            <label className="block text-sm font-medium mb-2">Room ID</label>
            <input
              type="text"
              name="room_id"
              value={formData.room_id}
              onChange={handleChange}
              className="w-full rounded border border-stroke py-2 px-3"
              placeholder="Enter Room ID"
            />
          </div>
          <div className="mb-4">
            <label className="block text-sm font-medium mb-2">Description</label>
            <textarea
              name="description"
              value={formData.description}
              onChange={handleChange}
              className="w-full rounded border border-stroke py-2 px-3"
              placeholder="Enter Description"
            />
          </div>
          <button
            type="submit"
            className="bg-primary text-white py-2 px-4 rounded hover:bg-opacity-90"
          >
            Create
          </button>
        </form>
      </div>
    </>
  );
};

export default CreateMaintenance;