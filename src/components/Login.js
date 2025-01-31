import React, { useState } from "react";
import axios from "axios";
import { useDispatch } from "react-redux";
import { login } from "../redux/slice";
import { Link, useNavigate } from "react-router-dom";
import './Login.css'; // Importation du fichier CSS

const Login = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState([]);
  const [attempts, setAttempts] = useState(0);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleLogin = async () => {
    if (attempts >= 3) return;

    try {
      const response = await axios.get(
        `https://670ed5b73e7151861655eaa3.mockapi.io/Stagiaire?prenom=${username}&MotDePasse=${password}`
      );
      if (response.data.length > 0) {
        dispatch(login(response.data[0]));
        setError([]);
        navigate("/");
      } else {
        setError([...error, "Nom d'utilisateur ou mot de passe invalide"]);
        setAttempts(attempts + 1);
      }
    } catch (err) {
      setError([...error, "Une erreur est survenue. Veuillez réessayer.",attempts]);
    }
  };

  return (
    <div className="login-container">
      <h1>Connexion</h1>
      <input
        type="text"
        placeholder="Nom d'utilisateur"
        value={username}
        onChange={(e) => setUsername(e.target.value)}
      />
      <input
        type="password"
        placeholder="Mot de passe"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      />
      <button onClick={handleLogin} disabled={attempts >= 3}>
        Connexion
      </button>
      {error.length > 0 && (
        <ul>
          {error.map((err, index) => (
            <li key={index}>{err}</li>
          ))}
        </ul>
      )}
      <p>
        Pas encore inscrit ? <Link to="/create-account">Créer un compte</Link>
      </p>
    </div>
  );
};

export default Login;
