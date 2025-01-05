import React, { useState } from "react";

const AddSubjectForm = ({ subjects, setSubjects }) => {
  const [subjectName, setSubjectName] = useState("");
  const [score, setScore] = useState("");
  const [date, setDate] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();

    // Ajouter une nouvelle entrée dans le tableau des matières
    const newSubject = {
      name: subjectName,
      score: parseInt(score), // Convertir le score en nombre
      date,
    };

    setSubjects([...subjects, newSubject]); // Mettre à jour la liste des matières
    setSubjectName(""); // Réinitialiser les champs du formulaire
    setScore("");
    setDate("");
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

