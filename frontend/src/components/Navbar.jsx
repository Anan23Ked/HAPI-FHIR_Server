import React from 'react';
import { Link } from "react-router-dom";

const Navbar = () => {
  return (
    <nav className='bg-blue-300 text-white px-6 py-4 shadow-md'>
      <div className='container mx-auto flex justify-center'>
        <ul className="flex gap-10">
          <li>
            <Link
              to="/patientForm"
              className="font-semibold relative pb-1 hover:after:w-full after:content-[''] after:absolute after:bottom-0 after:left-0 after:h-0.5 after:w-0 after:bg-white after:transition-all duration-300"
            >
              Add New Patient
            </Link>
          </li>
          <li>
            <Link
              to="/patientList"
              className="font-semibold relative pb-1 hover:after:w-full after:content-[''] after:absolute after:bottom-0 after:left-0 after:h-0.5 after:w-0 after:bg-white after:transition-all duration-300"
            >
              Registered Patients
            </Link>
          </li>
        </ul>
      </div>
    </nav>
  );
};

export default Navbar;
