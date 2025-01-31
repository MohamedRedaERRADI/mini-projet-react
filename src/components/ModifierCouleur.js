import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { changerCouleur } from "../redux/slice";
import axios from "axios";

const ModifierCouleur = () => {
  const dispatch = useDispatch();
  const user = useSelector((state) => state.user);
  const [newColor, setNewColor] = useState(user.couleur);
  const [message, setMessage] = useState("");

  const handleColorChange = async () => {
    try {
      await axios.put(`https://670ed5b73e7151861655eaa3.mockapi.io/Stagiaire/${user.id}`, {
        ...user,
        couleur: newColor,
      });

      dispatch(changerCouleur(newColor));

      setMessage("Couleur mise à jour avec succès !");
    } catch (error) {
      setMessage("Une erreur est survenue lors de la mise à jour.");
    }
  };

  return (
    <div style={styles.container}>
      <h1>Changer votre couleur préférée</h1>
      
      {/* Message pour le visiteur de moins de 15 ans */}
      {!user.admin ? (
        <p style={styles.warning}>Vous n'avez pas l'autorisation de changer la couleur.</p>
      ) : (
        <>
          {/* Sélecteur de couleur */}
          <label htmlFor="color">Choisissez une couleur :</label>
          <select
            id="color"
            value={newColor}
            onChange={(e) => setNewColor(e.target.value)}
            style={styles.select}
          >
            <option value="red">Rouge</option>
            <option value="blue">Bleu</option>
            <option value="green">Vert</option>
            <option value="yellow">Jaune</option>
            <option value="purple">Violet</option>
            <option value="maroon">Marron</option>
          </select>
          
          <button onClick={handleColorChange} style={styles.button}>
            Valider
          </button>

          {message && <p style={styles.message}>{message}</p>}
        </>
      )}
    </div>
  );
};

const styles = {
  container: {
    maxWidth: "400px",
    margin: "20px auto",
    padding: "20px",
    border: "1px solid #ccc",
    borderRadius: "10px",
    textAlign: "center",
    backgroundColor: "#FFF",
  },
  select: {
    margin: "10px 0",
    padding: "5px",
    fontSize: "16px",
  },
  button: {
    padding: "10px 20px",
    margin: "0px 10px",
    backgroundColor: "#4CAF50",
    color: "#fff",
    border: "none",
    borderRadius: "5px",
    cursor: "pointer",
  },
  message: {
    marginTop: "10px",
    fontSize: "14px",
    color: "green",
  },
  warning: {
    color: "red",
    fontWeight: "bold",
  },
};

export default ModifierCouleur;
