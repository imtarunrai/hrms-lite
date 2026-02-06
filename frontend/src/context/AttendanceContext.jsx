import { createContext, useContext, useEffect, useState } from "react";

const AttendanceContext = createContext();
const STORAGE_KEY = "hrms_attendance";

export const AttendanceProvider = ({ children }) => {
  const [attendance, setAttendance] = useState(() => {
    const stored = localStorage.getItem(STORAGE_KEY);
    return stored ? JSON.parse(stored) : {};
  });

  useEffect(() => {
    localStorage.setItem(
      STORAGE_KEY,
      JSON.stringify(attendance)
    );
  }, [attendance]);

 
const markAttendance = (date, employeeId, status) => {
  setAttendance((prev) => ({
    ...prev,
    [date]: {
      ...prev[date],
      [String(employeeId)]: status, 
    },
  }));
};


  const removeEmployeeAttendance = (employeeId) => {
    setAttendance((prev) => {
      const updated = {};

      for (const date in prev) {
        const { [employeeId]: _, ...rest } = prev[date];
        updated[date] = rest;
      }

      return updated;
    });
  };


  const getAttendanceByDate = (date) => {
    return attendance[date] || {};
  };


  const getAttendanceByEmployee = (employeeId) => {
    const records = [];

    for (const date in attendance) {
      if (attendance[date][employeeId]) {
        records.push({
          date,
          status: attendance[date][employeeId],
        });
      }
    }

    return records;
  };

  return (
    <AttendanceContext.Provider
      value={{
        attendance,
        markAttendance,
        removeEmployeeAttendance,
        getAttendanceByDate,
        getAttendanceByEmployee,
      }}
    >
      {children}
    </AttendanceContext.Provider>
  );
};

export const useAttendance = () => useContext(AttendanceContext);
