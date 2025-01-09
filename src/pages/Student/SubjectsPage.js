import React, { useEffect, useState } from "react";
import Header from "../../components/Header";
import SubjectList from "../../components/SubjectList";
import AddSubjectForm from "../../components/AddSubjectForm";
import API from "../../services/api"; // Import de l'API
import "./SubjectPage.css";

const SubjectsPage = () => {
  const [subjects, setSubjects] = useState([]);

  // Fonction pour récupérer les sujets depuis l'API
  const refreshSubjects = async () => {
    try {
      const response = await API.get("/subjects");
      setSubjects(response.data);
    } catch (error) {
      console.error("Erreur lors de la récupération des sujets :", error.response?.data || error.message);
    }
  };

  useEffect(() => {
    // Charger les sujets lors du montage du composant
    refreshSubjects();
  }, []);

  // Fonction pour modifier une matière
  // Fonction pour modifier une matière
const editSubject = async (id, newScore) => {
  try {
    await API.put(`/subjects/${id}`, { score: newScore }); // Corrigé
    refreshSubjects(); // Mettre à jour la liste après modification
  } catch (error) {
    console.error("Erreur lors de la mise à jour du sujet :", error.response?.data || error.message);
  }
};


  // Fonction pour supprimer une matière
  const deleteSubject = async (id) => {
    try {
      await API.delete(`/subjects/${id}`);
      refreshSubjects(); // Mettre à jour la liste après suppression
    } catch (error) {
      console.error("Erreur lors de la suppression du sujet :", error.response?.data || error.message);
    }
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
        <AddSubjectForm refreshSubjects={refreshSubjects} />
      </div>
    </div>
  );
};

export default SubjectsPage;