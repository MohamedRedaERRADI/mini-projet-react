import React from "react";
import { Outlet, useLocation } from "react-router-dom";
import Header from "./Header";
import Footer from "./Footer";
import NavigationBar from "./NavigationBar";
import Index from "./Index";
import { useSelector } from "react-redux";
import "./Layout.css";

const Layout = () => {
  const couleurAccueil = useSelector((state) => state.user.couleur);
  const location = useLocation();

  const isAccueil = location.pathname === "/";

  return (
    <div className="container">
      <Header />
      <NavigationBar />
      <div className={isAccueil ? "contenue-centered" : "contenue-left"} style={{ backgroundColor: couleurAccueil }}>
        <Index className={isAccueil ? "index-centered" : "index-left"} />
        <main className="content">
          <Outlet />
        </main>
      </div>
      <Footer />
    </div>
  );
};

export default Layout;
