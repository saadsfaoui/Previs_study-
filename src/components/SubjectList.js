import React, { useState } from "react";

const SubjectList = ({ subjects, editSubject, deleteSubject }) => {
  const [editIndex, setEditIndex] = useState(null); // Mode édition
  const [newScore, setNewScore] = useState("");

  const handleEditClick = (index, currentScore) => {
    setEditIndex(index);
    setNewScore(currentScore);
  };

  const handleSaveClick = (id) => {
    editSubject(id, parseInt(newScore)); // Envoyer directement le score comme un nombre
    setEditIndex(null);
    setNewScore("");
  };

  return (
    <div className="subject-list-container">
      <table className="table">
        <thead>
          <tr>
            <th>Subject Name</th>
            <th>Score</th>
            <th>Date</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {subjects.map((subject, index) => (
            <tr key={index}>
              <td>{subject.name}</td>
              <td>
                {editIndex === index ? (
                  <input
                    type="number"
                    value={newScore}
                    onChange={(e) => setNewScore(e.target.value)}
                  />
                ) : (`
                  ${subject.score} ⭐`
                )}
              </td>
              <td>{subject.date}</td>
              <td>
                {editIndex === index ? (
                  <button
                    className="btn save"
                    onClick={() => handleSaveClick(subject.id)}
                  >
                    Save
                  </button>
                ) : (
                  <button
                    className="btn edit"
                    onClick={() => handleEditClick(index, subject.score)}
                  >
                    Edit
                  </button>
                )}
                <button
                  className="btn delete"
                  onClick={() => deleteSubject(subject.id)}
                >
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default SubjectList;