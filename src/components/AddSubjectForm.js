import React, { useState } from "react";
import API from "../services/api";

const AddSubjectForm = ({ refreshSubjects }) => {
  const [subjectName, setSubjectName] = useState("");
  const [score, setScore] = useState("");
  const [date, setDate] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      // Appel API pour ajouter un nouveau sujet
      await API.post("/subjects", {
        name: subjectName,
        score: parseInt(score, 10),
        date,
      });

      // Réinitialiser les champs du formulaire
      setSubjectName("");
      setScore("");
      setDate("");

      // Rafraîchir la liste des sujets
      refreshSubjects();
    } catch (error) {
      console.error("Erreur lors de l'ajout du sujet :", error.response?.data || error.message);
    }
  };

  return (
    <form className="add-subject-form" onSubmit={handleSubmit}>
      <div className="form-group">
        <input
          type="text"
          placeholder="Subject Name"
          value={subjectName}
          onChange={(e) => setSubjectName(e.target.value)}
          required
        />
      </div>
      <div className="form-group">
        <input
          type="number"
          placeholder="Score"
          value={score}
          onChange={(e) => setScore(e.target.value)}
          required
          min="0"
          max="100"
        />
      </div>
      <div className="form-group">
        <input
          type="date"
          placeholder="Date"
          value={date}
          onChange={(e) => setDate(e.target.value)}
          required
        />
      </div>
      <button type="submit" className="submit-button">
        Add Subject
      </button>
    </form>
  );
};

export default AddSubjectForm;