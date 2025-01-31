import React from "react";
import { NavLink } from "react-router-dom"; // Pour gérer la navigation
import { useSelector } from "react-redux";

const NavigationBar = () => {
  const user = useSelector((state) => state.user); // Récupérer les données utilisateur depuis Redux

  return (
    <nav style={styles.nav}>
      <ul style={styles.menu}>
        <li style={styles.menuItem}>
          <NavLink to="/" style={styles.link} activeStyle={styles.active}>
            Accueil
          </NavLink>
        </li>

        <li style={styles.menuItem}>
          <NavLink to="/profile" style={styles.link} activeStyle={styles.active}>
            Mon Profil
          </NavLink>
        </li>

        <li style={styles.menuItem}>
          <NavLink to="/edit-profile" style={styles.link} activeStyle={styles.active}>
            Modifier Mon Profil
          </NavLink>
        </li>
        
        <li style={styles.menuItem}>
          <NavLink to="/color" style={styles.link} activeStyle={styles.active}>
            Modifier la Couleur
          </NavLink>
        </li>
        <li style={styles.menuItem}>
          <NavLink to="/requests" style={styles.link} activeStyle={styles.active}>
            Gérer les Demandes
          </NavLink>
        </li>

        {user.admin && (
          <>
            <li style={styles.menuItem}>
              <NavLink to="/users" style={styles.link} activeStyle={styles.active}>
                Liste des Utilisateurs
              </NavLink>
            </li>

            <li style={styles.menuItem}>
              <NavLink to="/add-user" style={styles.link} activeStyle={styles.active}>
                Ajouter Utilisateur
              </NavLink>
            </li>
          </>
        )}
      </ul>
    </nav>
  );
};

// Styles en ligne
const styles = {
  nav: {
    backgroundColor: "#282c34",
    padding: "10px",
  },
  menu: {
    display: "flex",
    justifyContent: "center",
    listStyleType: "none",
    margin: 0,
    padding: 0,
  },
  menuItem: {
    margin: "0 15px",
  },
  link: {
    color: "#fff",
    textDecoration: "none",
    fontSize: "16px",
    padding: "5px 10px",
    borderRadius: "5px",
    transition: "background-color 0.3s",
  },
  active: {
    backgroundColor: "#4CAF50",
  },
};

export default NavigationBar;
