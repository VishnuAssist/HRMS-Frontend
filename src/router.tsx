
import React from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import Dashboard from "./pages/Dashboard/index";
import Employee_Management from "./pages/Employee_Management";

const Router: React.FC = () => {
  return (
    <Routes>
      <Route path="/" element={<Navigate to="/dashboard" replace />} />
      <Route path="/dashboard" element={<Dashboard />} />
     <Route path="employee_Management" element={<Employee_Management/>} />
    </Routes>
  );
};

export default Router;
