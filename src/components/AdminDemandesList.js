// AdminDemandesList.js
import React, { useState, useEffect } from "react";
import axios from "axios";
import { useDispatch} from "react-redux";
import { modifierStatutDemande } from "../redux/slice";
import "./Demandes.css";


const AdminDemandesList = () => {
    const dispatch = useDispatch();
    const [loading, setLoading] = useState(true);
    const API_URL = "https://670ed5b73e7151861655eaa3.mockapi.io/Stagiaire";
    const [localUsers, setLocalUsers] = useState([]);


  useEffect(() => {
    const fetchUsersAndDemandes = async () => {
      try {
         setLoading(true);
          const response = await axios.get(API_URL);
           setLocalUsers(response.data || []);
      } catch (error) {
        console.error("Erreur lors de la récupération des utilisateurs et des demandes:", error);
      } finally {
        setLoading(false);
       }
    };
    fetchUsersAndDemandes();
 }, []);


    const handleChangeStatut = async (id, statut) => {
      try {
        const response = await axios.get(API_URL);
        const users = response.data;
           for (const user of users) {
               if (user.demandes && user.demandes.find((demande) => demande.id === id)) {
                const updatedDemandes = user.demandes.map(demande =>
                        demande.id === id ? { ...demande, statut } : demande
              );
                    await axios.put(`${API_URL}/${user.id}`, { ...user, demandes: updatedDemandes });
                 dispatch(modifierStatutDemande({ id, statut }));
                 const updatedUsers = localUsers.map(u =>
                   u.id === user.id ? { ...u, demandes: updatedDemandes } : u
                 );
                  setLocalUsers(updatedUsers);

                  break;
               }
          }
      } catch (error) {
          console.error("Erreur lors du changement de statut de la demande:", error);
       }
 };
    const handleDeleteDemande = async (id, userId) => {
        try {
          const response = await axios.get(API_URL);
          const users = response.data;
           for (const user of users) {
            if (user.id === userId) {
                 const updatedDemandes = user.demandes.filter(demande => demande.id !== id);
                await axios.put(`${API_URL}/${user.id}`, { ...user, demandes: updatedDemandes });
                const updatedUsers = localUsers.map(u =>
                  u.id === user.id ? { ...u, demandes: updatedDemandes } : u
                );
                 setLocalUsers(updatedUsers);
                  break;
            }
           }
        } catch (error) {
            console.error("Erreur lors de la suppression de la demande:", error);
       }
    };
    if (loading) {
     return <p>Chargement des demandes en cours...</p>;
   }

    return (
      <div className="demandes-container">
       <h2>Liste des Demandes (Admin)</h2>
            <div className="demandes-table-container">
                <table className="demandes-table">
                     <thead>
                        <tr>
                              <th>Titre</th>
                             <th>Description</th>
                            <th>Statut</th>
                           <th>Nom d'utilisateur</th>
                             <th>Actions</th>
                        </tr>
                       </thead>
                  <tbody>
                     {localUsers.map((user) => (
                        user.demandes &&
                          user.demandes.map((demande) => (
                             <tr key={demande.id}>
                                   <td>{demande.titre}</td>
                                   <td>{demande.description}</td>
                                    <td>{demande.statut}</td>
                                     <td>{user.nom} {user.prenom}</td>
                                 <td>
                                       <button
                                        onClick={() => handleChangeStatut(demande.id, "Approuvée")}
                                            className="approve-button"
                                       >
                                         Approuver
                                    </button>
                                       <button
                                      onClick={() => handleChangeStatut(demande.id, "Rejetée")}
                                           className="reject-button"
                                       >
                                          Rejeter
                                      </button>
                                      <button
                                       onClick={() => handleDeleteDemande(demande.id, demande.userId)}
                                        className="delete-button"
                                      >
                                          Supprimer
                                      </button>
                                </td>
                              </tr>
                                  ))
                    )  )}
                   </tbody>
             </table>
          </div>
       </div>
    );
};

export default AdminDemandesList;