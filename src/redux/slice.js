// slice.js
import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  nom: "Funk",
  age: 66,
  admin: true,
  MotDePasse: "e2EpziAy5RIpJgP",
  pseudo: "Kaci_Reilly73",
  prenom: "Rose",
  couleur: "maroon",
  Devise: "kr",
  Pays: "Spain",
  avatar: "https://pics.craiyon.com/2023-06-16/3fa2e25b33eb4cc6a1cf653851737058.webp",
  email: "Wade34@yahoo.com",
  photo: "https://loremflickr.com/640/480/people",
  id: "8",
  demandes: [], // Initialize as an empty array
};

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    login: (state, action) => {
      return { ...state, ...action.payload };
    },
    logout: () => initialState,
    changerCouleur: (state, action) => {
      state.couleur = action.payload;
    },
      ajouterDemande: (state, action) => {
      state.demandes = action.payload
      },
        supprimerDemande: (state, action) => {
             state.demandes = state.demandes.filter((demande) => demande.id !== action.payload);
          },
     modifierStatutDemande: (state, action) => {
           state.demandes = state.demandes.map(demande =>
                demande.id === action.payload.id ? { ...demande, statut: action.payload.statut} : demande
                );
         },

      modifierDemande: (state, action) => {
        if (state.demandes) {
         state.demandes = state.demandes.map(demande => demande.id === action.payload.id ? {...demande, ...action.payload} : demande);
          }
        },
  },
});

export const {
  login,
  logout,
  changerCouleur,
    ajouterDemande,
    supprimerDemande,
  modifierStatutDemande,
  
} = userSlice.actions;

export default userSlice.reducer;