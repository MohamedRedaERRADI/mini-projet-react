import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Login from "./components/Login";
import CreateAccount from "./components/CreateAccount";
import Layout from "./components/Layout";
import ModifierCouleur from "./components/ModifierCouleur";
import VoirMonProfile from "./components/VoirMonProfile";
import ListeUtilisateurs from "./components/ListeUtilisateurs";
import Demandes from "./components/Demandes";
import AjouterUtilisateur from "./components/AjouterUtilisateur";
import EditProfile from "./components/EditProfile";
// import Header from "./components/Header";

const App = () => {
  // const shouldShowHeader = window.location.pathname !== "/login" && window.location.pathname !== "/create-account";

  return (
    <Router>
      <>
        {/* {shouldShowHeader && <Header />} */}
        <Routes>
          <Route path="/create-account" element={<CreateAccount />} />
          <Route path="/login" element={<Login />} />
          <Route path="/" element={<Layout />} >
            <Route path="/edit-profile" element={<EditProfile />} />
            <Route path="/color" element={<ModifierCouleur />} />
            <Route path="/profile" element={<VoirMonProfile />} />
            <Route path="/users" element={<ListeUtilisateurs />} />
            <Route path="/requests" element={<Demandes />} />
            <Route path="/add-user" element={<AjouterUtilisateur />} /> 
          </Route>
        </Routes>
      </>
    </Router>
  );
};


export default App;
