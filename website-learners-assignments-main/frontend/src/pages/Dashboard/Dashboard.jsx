import React from 'react';
import PatientDashboard from './PatientDashboard';
import CaretakerDashboard from './CaretakerDashboard';

const Dashboard = () => {
  const user = JSON.parse(localStorage.getItem('user'));

  if (!user) return <p>User not found. Please login again.</p>;

  return (
    <>
      {user.role === 'patient' && <PatientDashboard />}
      {user.role === 'caretaker' && <CaretakerDashboard />}
    </>
  );
};

export default Dashboard;