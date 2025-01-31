import React from "react";
import { useSelector } from "react-redux";
import UserDemandesList from "./UserDemandesList";
import AdminDemandesList from "./AdminDemandesList";
import "./Demandes.css";

const Demandes = () => {
    const user = useSelector((state) => state.user);

    return (
        <div style={{backgroundColor: "white", padding: "20px" , borderRadius: "10px" , marginTop: "20px"}}>
            <h1>Gestion des Demandes</h1>
            {!user.admin ? (
                <>
                    <UserDemandesList />
                </>
            ) : (
                <AdminDemandesList />
            )}
        </div>
    );
};

export default Demandes;