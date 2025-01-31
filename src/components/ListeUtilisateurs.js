import React, { useEffect, useState } from "react";
import axios from "axios";
import "./ListeUtilisateurs.css";

const ListeUtilisateurs = () => {
  const [users, setUsers] = useState([]);
  const [message, setMessage] = useState("");
  const [editingUser, setEditingUser] = useState(null);
  const [editedData, setEditedData] = useState({ nom: "", prenom: "", email: "", admin: false });

  // Charger la liste des utilisateurs au démarrage
  useEffect(() => {
    fetchUsers();
  }, []);

  const fetchUsers = async () => {
    try {
      const response = await axios.get(
        "https://670ed5b73e7151861655eaa3.mockapi.io/Stagiaire"
      );
      setUsers(response.data);
    } catch (error) {
      setMessage("Erreur lors du chargement des utilisateurs.");
    }
  };

  // Supprimer un utilisateur
  const handleDelete = async (id) => {
    if (window.confirm("Êtes-vous sûr de vouloir supprimer cet utilisateur ?")) {
      try {
        await axios.delete(`https://670ed5b73e7151861655eaa3.mockapi.io/Stagiaire/${id}`);
        setMessage("Utilisateur supprimé avec succès !");
        fetchUsers();
      } catch (error) {
        setMessage("Erreur lors de la suppression de l'utilisateur.");
      }
    }
  };

  // Ouvrir le formulaire d'édition
  const handleEdit = (user) => {
    setEditingUser(user.id);
    setEditedData({ nom: user.nom, prenom: user.prenom, email: user.email, admin: user.admin });
  };

  // Mettre à jour les valeurs dans le formulaire
  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setEditedData({
      ...editedData,
      [name]: type === "checkbox" ? checked : value, // Gérer les cases à cocher
    });
  };

  // Enregistrer les modifications
  const handleSave = async () => {
    try {
      await axios.put(`https://670ed5b73e7151861655eaa3.mockapi.io/Stagiaire/${editingUser}`, editedData);
      setMessage("Utilisateur mis à jour avec succès !");
      setEditingUser(null);
      fetchUsers(); // Recharger la liste des utilisateurs
    } catch (error) {
      setMessage("Erreur lors de la mise à jour de l'utilisateur.");
    }
  };

  // Annuler l'édition
  const handleCancel = () => {
    setEditingUser(null);
    setEditedData({ nom: "", prenom: "", email: "", admin: false });
  };

  return (
    <div className="container" style={{ marginTop: "20px" }}>
      <h1>Liste des Utilisateurs</h1>

      {message && <p className="message">{message}</p>}

      <table>
        <thead>
          <tr>
            <th>Nom</th>
            <th>Prénom</th>
            <th>Email</th>
            <th>Rôle</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {users.length > 0 ? (
            users.map((user) => (
              <tr key={user.id}>
                {editingUser === user.id ? (
                  // Formulaire d'édition
                  <>
                    <td>
                      <input
                        type="text"
                        name="nom"
                        value={editedData.nom}
                        onChange={handleChange}
                      />
                    </td>
                    <td>
                      <input
                        type="text"
                        name="prenom"
                        value={editedData.prenom}
                        onChange={handleChange}
                      />
                    </td>
                    <td>
                      <input
                        type="email"
                        name="email"
                        value={editedData.email}
                        onChange={handleChange}
                      />
                    </td>
                    <td>
                      <input
                        type="checkbox"
                        name="admin"
                        checked={editedData.admin}
                        onChange={handleChange}
                      />
                      Admin
                    </td>
                    <td>
                      <button className="save-button" onClick={handleSave}>Enregistrer</button>
                      <button className="cancel-button" onClick={handleCancel}>Annuler</button>
                    </td>
                  </>
                ) : (
                  // Affichage normal de l'utilisateur
                  <>
                    <td>{user.nom}</td>
                    <td>{user.prenom}</td>
                    <td>{user.email}</td>
                    <td>{user.admin ? "Admin" : "Visiteur"}</td>
                    <td>
                      <button className="edit-button" onClick={() => handleEdit(user)}>
                        Modifier
                      </button>
                      <button className="delete-button" onClick={() => handleDelete(user.id)}>
                        Supprimer
                      </button>
                    </td>
                  </>
                )}
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan="5" className="no-data">
                Aucun utilisateur trouvé.
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
};

export default ListeUtilisateurs;
