import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import { BrowserRouter } from "react-router-dom";

import { EmployeeProvider } from "./context/EmployeeContext";
import { AttendanceProvider } from "./context/AttendanceContext";

import "./index.css";

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <BrowserRouter>
      <EmployeeProvider>
        <AttendanceProvider>
          <App />
        </AttendanceProvider>
      </EmployeeProvider>
    </BrowserRouter>
  </React.StrictMode>
);
