import React, { useEffect, useState } from 'react';
import axios from 'axios';
import PatientCard from './PatientCard';

const PatientList = () => {
  const [patients, setPatients] = useState([]);
  const [name, setName] = useState('')
// const [results, setResults] = useState([])

  useEffect(() => {
    const fetchPatients = async () => {
      const res = await axios.get('http://localhost:8080/fhir/Patient');
      const entries = res.data.entry || [];
      const formatted = entries.map(entry => entry.resource);
      setPatients(formatted);
    };
    fetchPatients();
  }, []);

  const handleUpdate = (updatedPatient) => {
    setPatients(patients.map(p => p.id === updatedPatient.id ? updatedPatient : p));
    
  };

  const handleDelete = (deletedId) => {
    console.log("deletedId", deletedId)
    // setPatients(patients.filter(p => p.id !== deletedId));
    setPatients(prev => prev.filter(patient => patient.id !== deletedId));
  }

  const filterPatients = patients.filter(p =>{
    const given = p?.name?.[0]?.given?.[0]?.toLowerCase() || ''
    const family = p?.name?.family?.toLowerCase() || '' 
    return(
        given.includes(name.toLowerCase()) || family.includes(name.toLowerCase())
    )
  })

  return (
    <div className="p-4">
      <h2 className="text-2xl font-bold mb-4 text-center">Patient Directory</h2>

      <div>
            <h2>Search Patient by name</h2>
            
                <input
                type= "text"
                placeholder="Enter patient name"
                value={name}
                onChange={e=>setName(e.target.value)}
                className="w-full px-4 py-2 border border-gray-300 rounded shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-300"
                />
                
          {filterPatients.length === 0 ? (
             <p className="text-gray-500 text-center">No matching patients found.</p>
          ) : (
            filterPatients.map(p=>(
                <PatientCard
          key={p.id}
          patient={p}
          onUpdate={handleUpdate}
          onDelete={() => handleDelete(p.id)}

        />
            ))
          )}

</div>    
    </div>
  );
};

export default PatientList;
