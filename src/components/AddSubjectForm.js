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
        score: parseInt(score, 10), // Convertir en nombre
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
    <form className="form" onSubmit={handleSubmit}>
      <input
        type="text"
        placeholder="Subject Name"
        value={subjectName}
        onChange={(e) => setSubjectName(e.target.value)}
        required
      />
      <input
        type="number"
        placeholder="Score"
        value={score}
        onChange={(e) => setScore(e.target.value)}
        required
        min="0"
        max="100"
      />
      <input
        type="date"
        placeholder="Date"
        value={date}
        onChange={(e) => setDate(e.target.value)}
        required
      />
      <button type="submit">Add Subject</button>
    </form>
  );
};

export default AddSubjectForm;