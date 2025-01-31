import React from "react";
import { useSelector } from "react-redux";

const VoirMonProfile = () => {
  const user = useSelector((state) => state.user); // Obtenir les informations utilisateur depuis Redux

  return (
    <div style={styles.container}>
      <h1>Mon Profil</h1>
      <div style={styles.profileContainer}>
        {/* Afficher l'image de profil */}
        <img
          src={user.avatar || "https://pics.craiyon.com/2023-06-16/3fa2e25b33eb4cc6a1cf653851737058.webp"}
          alt="Avatar utilisateur"
          style={styles.avatar}
        />

        {/* Afficher les informations utilisateur */}
        <div style={styles.info}>
          <p>
            <strong>Nom :</strong> {user.nom}
          </p>
          <p>
            <strong>Prénom :</strong> {user.prenom}
          </p>
          <p>
            <strong>Âge :</strong> {user.age} ans
          </p>
          <p>
            <strong>Email :</strong> {user.email}
          </p>
          <p>
            <strong>Couleur préférée :</strong>{" "}
            <span style={{ color: user.couleur }}>{user.couleur}</span>
          </p>
          <p>
            <strong>Pays :</strong> {user.Pays}
          </p>
          <p>
            <strong>Devise :</strong> {user.Devise}
          </p>
        </div>
      </div>
    </div>
  );
};

// Styles en ligne
const styles = {
  container: {
    maxWidth: "600px",
    margin: "20px auto",
    padding: "20px",
    border: "1px solid #ccc",
    borderRadius: "10px",
    backgroundColor: "#f9f9f9",
  },
  profileContainer: {
    display: "flex",
    alignItems: "center",
  },
  avatar: {
    width: "150px",
    height: "150px",
    borderRadius: "50%",
    marginRight: "20px",
    border: "2px solid #ccc",
  },
  info: {
    flex: 1,
  },
};

export default VoirMonProfile;
