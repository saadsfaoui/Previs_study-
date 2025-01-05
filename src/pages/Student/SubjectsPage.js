/*import React, { useState } from "react";
import Header from "../../components/Header";
import SubjectList from "../../components/SubjectList";
import AddSubjectForm from "../../components/AddSubjectForm";
import './SubjectPage.css';

const SubjectsPage = () => {
  // État local pour stocker la liste des matières
  const [subjects, setSubjects] = useState([
    { name: "Mathematics", score: 95, date: "2025-01-01" },
    { name: "Science", score: 88, date: "2025-01-02" },
  ]);

  return (
    <div>
      <Header />
      <div className="container">
        <h2>Notes</h2>

        
        <SubjectList subjects={subjects} />

       
        <AddSubjectForm subjects={subjects} setSubjects={setSubjects} />
      </div>
    </div>
  );
};

export default SubjectsPage;*/

import React, { useState } from "react";
import Header from "../../components/Header";
import SubjectList from "../../components/SubjectList";
import AddSubjectForm from "../../components/AddSubjectForm";
import './SubjectPage.css';

const SubjectsPage = () => {
  const [subjects, setSubjects] = useState([
    { name: "Mathematics", score: 95, date: "2025-01-01" },
    { name: "Science", score: 88, date: "2025-01-02" },
  ]);

  // Fonction pour modifier une matière
  const editSubject = (index, newScore) => {
    const updatedSubjects = [...subjects];
    updatedSubjects[index].score = newScore; // Mise à jour de la note
    setSubjects(updatedSubjects);
  };

  // Fonction pour supprimer une matière
  const deleteSubject = (index) => {
    const updatedSubjects = subjects.filter((_, i) => i !== index); // Supprime l'élément
    setSubjects(updatedSubjects);
  };

  return (
    <div>
      <Header />
      <div className="container">
        <h2>Notes</h2>

        {/* Liste des matières */}
        <SubjectList
          subjects={subjects}
          editSubject={editSubject}
          deleteSubject={deleteSubject}
        />

        {/* Formulaire pour ajouter une nouvelle matière */}
        <AddSubjectForm subjects={subjects} setSubjects={setSubjects} />
      </div>
    </div>
  );
};

export default SubjectsPage;
