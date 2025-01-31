import React, { useState } from "react";
import axios from "axios";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { login } from "../redux/slice";
import "./EditProfile.css";

const EditProfile = () => {
    const user = useSelector((state) => state.user);
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const [formData, setFormData] = useState({
        nom: user.nom,
        prenom: user.prenom,
        email: user.email,
        MotDePasse: "",
        pseudo: user.pseudo,
        age: user.age,
        couleur: user.couleur,
        avatar: user.avatar,
    });
    const [message, setMessage] = useState("");

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            await axios.put(`https://670ed5b73e7151861655eaa3.mockapi.io/Stagiaire/${user.id}`, {
                ...formData,
            });
            dispatch(login(formData));
            setMessage("Informations mises à jour avec succès !");
            navigate("/profile");
        } catch (error) {
            setMessage("Erreur lors de la mise à jour des informations.");
        }
    };

    return (
        <div className="edit-profile-container">
            <h1>Modifier Mon Profil</h1>
            {message && <p className="message">{message}</p>}
            <form onSubmit={handleSubmit} className="form">
                <input
                    type="text"
                    name="nom"
                    placeholder="Nom"
                    value={formData.nom}
                    onChange={handleChange}
                    className="input"
                    required
                />
                <input
                    type="text"
                    name="prenom"
                    placeholder="Prénom"
                    value={formData.prenom}
                    onChange={handleChange}
                    className="input"
                    required
                />
                <input
                    type="text"
                    name="pseudo"
                    placeholder="Pseudo"
                    value={formData.pseudo}
                    onChange={handleChange}
                    className="input"
                    required
                />
                <input
                    type="email"
                    name="email"
                    placeholder="Email"
                    value={formData.email}
                    onChange={handleChange}
                    className="input"
                    required
                />
                <input
                    type="password"
                    name="MotDePasse"
                    placeholder="Mot de passe"
                    value={formData.MotDePasse}
                    onChange={handleChange}
                    className="input"
                    required
                />
                <input
                    type="number"
                    name="age"
                    placeholder="Âge"
                    value={formData.age}
                    onChange={handleChange}
                    className="input"
                    required
                />
               <input
                    type="text"
                    name="avatar"
                    placeholder="Avatar"
                    value={formData.avatar}
                    onChange={handleChange}
                   className="input"
                   required
                />
                <input
                    type="text"
                    name="couleur"
                    placeholder="Couleur"
                    value={formData.couleur}
                    onChange={handleChange}
                   className="input"
                   required
                />
                <button type="submit" className="button">
                    Mettre à jour
                </button>
            </form>
        </div>
    );
};

export default EditProfile;