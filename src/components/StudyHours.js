import React from "react";

const StudyHours = ({ subjects }) => {
  return (
    <table className="table">
      <thead>
        <tr>
          <th>Subject</th>
          <th>Hours Studied</th>
          <th>Notes</th>
          <th>Performance Rating</th>
          <th>Weekly Progress</th>
          <th>Actions</th>
        </tr>
      </thead>
      <tbody>
        {subjects.map((subject, index) => (
          <tr key={index}>
            <td>{subject.name}</td>
            <td>{subject.hoursStudied || "N/A"}</td>
            <td>{subject.notes || "N/A"}</td>
            <td>⭐⭐⭐⭐</td>
            <td>
              <progress value="50" max="100"></progress>
            </td>
            <td>
              <button className="btn edit">Edit</button>
              <button className="btn delete">Delete</button>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};

export default StudyHours;
