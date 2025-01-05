import React from "react";

const StudentScores = ({ scores }) => {
  return (
    <table className="table">
      <thead>
        <tr>
          <th>Student Name</th>
          <th>Score 1</th>
          <th>Score 2</th>
          <th>Score 3</th>
          <th>Total Score</th>
          <th>Actions</th>
        </tr>
      </thead>
      <tbody>
        {scores.map((student, index) => (
          <tr key={index}>
            <td>{student.name}</td>
            {student.scores.map((score, i) => (
              <td key={i}>{score}</td>
            ))}
            <td>{student.total}</td>
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

export default StudentScores;
