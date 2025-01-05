/*import React from "react";

const SubjectList = ({ subjects }) => {
    return (
      <div>
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
                <td>{subject.score} ⭐</td>
                <td>{subject.date}</td>
                <td>
                  <button className="btn edit">Edit</button>
                  <button className="btn delete">Delete</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    );
};

export default SubjectList;*/

import React, { useState } from "react";

const SubjectList = ({ subjects, editSubject, deleteSubject }) => {
  const [editIndex, setEditIndex] = useState(null); // Indice de la ligne en cours d'édition
  const [newScore, setNewScore] = useState(""); // Nouvelle note

  const handleEditClick = (index, currentScore) => {
    setEditIndex(index); // Active le mode édition pour cette ligne
    setNewScore(currentScore); // Remplit le champ avec la note actuelle
  };

  const handleSaveClick = () => {
    editSubject(editIndex, newScore); // Appelle la fonction pour sauvegarder
    setEditIndex(null); // Désactive le mode édition
    setNewScore(""); // Réinitialise le champ
  };

  return (
    <div>
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

              {/* Mode édition ou affichage */}
              <td>
                {editIndex === index ? (
                  <input
                    type="number"
                    value={newScore}
                    onChange={(e) => setNewScore(e.target.value)}
                  />
                ) : (
                  `${subject.score} ⭐`
                )}
              </td>

              <td>{subject.date}</td>
              <td>
                {editIndex === index ? (
                  <button className="btn save" onClick={handleSaveClick}>
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
                  onClick={() => deleteSubject(index)}
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
