import React, { useState } from "react";
import axios from "axios";

const AjouterUtilisateur = () => {
  const [formData, setFormData] = useState({
    nom: "",
    prenom: "",
    email: "",
    age: "",
    admin: false,
  });
  const [message, setMessage] = useState("");

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData({
      ...formData,
      [name]: type === "checkbox" ? checked : value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post("https://670ed5b73e7151861655eaa3.mockapi.io/Stagiaire", {
        ...formData,
      });
      setMessage("Utilisateur ajouté avec succès !");
      setFormData({ nom: "", prenom: "", email: "", age: "", admin: false });
    } catch (error) {
      setMessage("Erreur lors de l'ajout de l'utilisateur.");
    }
  };

  return (
    <div style={styles.container}>
      <h1>Ajouter un Utilisateur</h1>
      {message && <p style={styles.message}>{message}</p>}
      <form onSubmit={handleSubmit} style={styles.form}>
        <input
          type="text"
          name="nom"
          placeholder="Nom"
          value={formData.nom}
          onChange={handleChange}
          style={styles.input}
          required
        />
        <input
          type="text"
          name="prenom"
          placeholder="Prénom"
          value={formData.prenom}
          onChange={handleChange}
          style={styles.input}
          required
        />
        <input
          type="email"
          name="email"
          placeholder="Email"
          value={formData.email}
          onChange={handleChange}
          style={styles.input}
          required
        />
        <input
          type="number"
          name="age"
          placeholder="Âge"
          value={formData.age}
          onChange={handleChange}
          style={styles.input}
          required
        />
        <label style={styles.checkbox}>
          <input
            type="checkbox"
            name="admin"
            checked={formData.admin}
            onChange={handleChange}
          />
          Administrateur
        </label>
        <button type="submit" style={styles.button}>
          Ajouter
        </button>
      </form>
    </div>
  );
};

// Styles en ligne
const styles = {
  container: {
    maxWidth: "500px",
    margin: "20px auto",
    padding: "20px",
    border: "1px solid #ccc",
    borderRadius: "10px",
    backgroundColor: "#f9f9f9",
  },
  form: {
    display: "flex",
    flexDirection: "column",
  },
  input: {
    marginBottom: "10px",
    padding: "10px",
    fontSize: "16px",
  },
  checkbox: {
    marginBottom: "10px",
  },
  button: {
    padding: "10px 20px",
    backgroundColor: "#4CAF50",
    color: "#fff",
    border: "none",
    borderRadius: "5px",
    cursor: "pointer",
  },
  message: {
    color: "green",
    fontWeight: "bold",
  },
};

export default AjouterUtilisateur;
