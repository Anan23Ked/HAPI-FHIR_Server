import React from 'react';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Navbar from './components/Navbar';
import PatientForm from './components/PatientForm';
import PatientCard from './components/PatientCard';
import PatientList from './components/PatientList';


const App = () => {
  return (
    <div>
      <BrowserRouter>
      <div className="App font-sans">
        <Navbar />
        <Routes>
          <Route path="/patientForm" element = {<PatientForm />} />
          {/* <Route path="/searchPatient" element = {<SearchPatient />} /> */}
          <Route path="/patientList" element = {<PatientList />} />
        </Routes>
        </div>
      </BrowserRouter>
    </div>
    
  );
}

export default App
