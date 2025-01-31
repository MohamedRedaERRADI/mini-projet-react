import React from "react";
import { useSelector } from "react-redux";
import './indexstyle.css';

const Home = ({ className }) => {
  const user = useSelector((state) => state.user);

  return (
    <div className={`index-container ${className}`}>
      <h1>Bienvenue sur l'application React</h1>
      <p>Bonjour {user.prenom} {user.nom} ! Vous êtes {user.admin ? 'Administrateur' : 'Visiteur'}.</p>
    </div>
  );
};

export default Home;
