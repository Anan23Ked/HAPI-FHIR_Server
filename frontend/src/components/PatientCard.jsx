import React, { useState } from 'react';
import axios from 'axios';

const PatientCard = ({ id, patient, onUpdate, onDelete }) => {
  const [isEditing, setIsEditing] = useState(false);
  const [editGivenName, setEditGivenName] = useState(patient?.name?.[0]?.given?.[0] || '');
  const [editFamilyName, setEditFamilyName] = useState(patient?.name?.[0]?.family || '');

  const handleUpdate = async () => {
    const updatedPatient = {
      ...patient,
      name: [
        {
          use: 'official',
          family: editFamilyName,
          given: [editGivenName]
        }
      ]
    };

    try {
      const res = await axios.put(`http://localhost:8080/fhir/Patient/${patient.id}`, updatedPatient, {
        headers: {
          'Content-Type': 'application/fhir+json'
        }
      });
 
      onUpdate(res.data);
      setIsEditing(false);
    } catch (err) {
      console.error('Failed to update patient:', err);
      console.log("id", patient.id)
    }
  };

  const handleDelete = async () => {
    try {
      await axios.delete(`http://localhost:8080/fhir/Patient/${patient.id}`);
      onDelete(id);
    } catch (err) {
      console.error('Failed to delete patient:', err);
    }
  };

  return (
    <div className="bg-white border p-4 mb-4 rounded-xl shadow-md">
      {isEditing ? (
        <div className="space-y-2">
          <div>
            <label className="block text-sm font-medium text-gray-700">Given Name</label>
            <input
              value={editGivenName}
              onChange={(e) => setEditGivenName(e.target.value)}
              className="border w-full px-3 py-1 rounded-lg"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">Family Name</label>
            <input
              value={editFamilyName}
              onChange={(e) => setEditFamilyName(e.target.value)}
              className="border w-full px-3 py-1 rounded-lg"
            />
          </div>
          <div className="mt-2 flex gap-3">
            <button onClick={handleUpdate} className="bg-blue-600 text-white px-4 py-1 rounded hover:bg-blue-700">
              Save
            </button>
            <button onClick={() => setIsEditing(false)} className="text-gray-600 hover:text-black">
              Cancel
            </button>
          </div>
        </div>
      ) : (
        <div>
          <h3 className="text-xl font-semibold text-gray-800">
            {patient?.name?.[0]?.given?.[0] || 'Unknown'} {patient?.name?.[0]?.family || ''}
          </h3>
          <p className="text-sm text-gray-500">ID: {patient.id}</p>
          <p className="text-sm text-gray-600 capitalize">Gender: {patient.gender || 'Not specified'}</p>
          <p className="text-sm text-gray-600">Birth Date: {patient.birthDate || 'Not specified'}</p>
          <div className="mt-2 flex gap-4">
            <button onClick={() => setIsEditing(true)} className="text-blue-500 hover:underline">
              Edit
            </button>
            <button onClick={handleDelete} className="text-red-500 hover:underline">
              Delete
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default PatientCard;
