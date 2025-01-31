import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { login, supprimerDemande } from "../redux/slice";
import axios from "axios";
import "./Demandes.css";

const UserDemandesList = () => {
    const dispatch = useDispatch();
    const user = useSelector((state) => state.user || {});
    const [newDemande, setNewDemande] = useState({ titre: "", description: "" });
    const API_URL = "https://670ed5b73e7151861655eaa3.mockapi.io/Stagiaire";

    useEffect(() => {
        // Pas de récupération de données ici, on utilise 'user.demandes' de Redux
    }, [user.demandes]);

    const handleAddDemande = async (e) => {
        e.preventDefault();
        try {
            const demandeId = Date.now().toString();
            const newDemandeData = {
                id: demandeId,
                titre: newDemande.titre,
                description: newDemande.description,
                statut: "En attente",
                userId: user.id,
            };
            const updatedDemandes = [...user.demandes, newDemandeData];
            await axios.put(`${API_URL}/${user.id}`, { ...user, demandes: updatedDemandes });
            dispatch(login({ ...user, demandes: updatedDemandes }));
            setNewDemande({ titre: "", description: "" });
        } catch (error) {
            console.error("Erreur lors de l'ajout de la demande:", error);
        }
    };

    const handleCancelDemande = async (demandeId) => {
        try {
            const demandeToCancel = user.demandes.find((demande) => demande.id === demandeId);
            if (demandeToCancel && demandeToCancel.statut === "En attente") {
                const updatedDemandes = user.demandes.filter((demande) => demande.id !== demandeId);
                await axios.put(`${API_URL}/${user.id}`, { ...user, demandes: updatedDemandes });
                dispatch(supprimerDemande(demandeId));
            } else {
                alert("Cette demande ne peut pas être annulée car elle n'est pas en attente.");
            }
        } catch (error) {
            console.error("Erreur lors de l'annulation de la demande:", error);
        }
    };
    if (!user || !user.id) {
        return <p>Chargement des données de l'utilisateur...</p>;
    }

    return (
        <div className="user-demandes-container">
            <h2>Mes Demandes</h2>
            <div>
                <form onSubmit={handleAddDemande}>
                    <input
                        type="text"
                        placeholder="Titre"
                        value={newDemande.titre}
                        onChange={(e) => setNewDemande({ ...newDemande, titre: e.target.value })}
                        required
                    />
                    <textarea
                        placeholder="Description"
                        value={newDemande.description}
                        onChange={(e) =>
                            setNewDemande({ ...newDemande, description: e.target.value })
                        }
                        required
                    />
                    <button type="submit">Envoyer</button>
                </form>
            </div>
            <div className="user-demandes-table-container">
                {user.demandes && user.demandes.length > 0 ? (
                    <table className="user-demandes-table">
                        <thead>
                            <tr>
                                <th>Titre</th>
                                <th>Description</th>
                                <th>Statut</th>
                                <th>Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            {user.demandes.map((demande) => (
                                <tr key={demande.id}>
                                    <td>{demande.titre}</td>
                                    <td>{demande.description}</td>
                                    <td>{demande.statut}</td>
                                    <td>
                                        {demande.statut === "En attente" ? (
                                            <button
                                                onClick={() => handleCancelDemande(demande.id)}
                                                className="cancel-button"
                                            >
                                               Annuler la Demande
                                            </button>
                                        ) : (
                                            <button disabled className="edit-button">
                                                 La demande est {demande.statut}
                                            </button>
                                        )}
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                ) : (
                    <p className="no-demandes">Vous n'avez aucune demande pour le moment.</p>
                )}
            </div>
        </div>
    );
};
export default UserDemandesList;