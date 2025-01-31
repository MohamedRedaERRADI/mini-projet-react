import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { logout } from '../redux/slice';
import { useNavigate } from 'react-router-dom';

const Header = () => {
  const user = useSelector((state) => state.user);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleLogout = () => {
    dispatch(logout());
    navigate('/login');
  };

  return (
    <header style={{
      padding: '20px 40px', 
      backgroundColor: user.couleur, 
      color: 'white', 
      display: 'flex', 
      justifyContent: 'space-between', 
      alignItems: 'center',
      boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
    }}>
      <div style={{ display: 'flex', alignItems: 'center' }}>
        <img 
          src={user.avatar} 
          alt="avatar" 
          style={{
            height: '50px', 
            width: '50px', 
            borderRadius: '50%', 
            marginRight: '15px',
            border: '2px solid white'
          }} 
        />
        <h1 style={{ fontSize: '1.5rem', fontWeight: 'bold' }}>
          Bienvenue, {user.prenom} {user.nom}
        </h1>
      </div>
      <button 
        onClick={handleLogout} 
        style={{
          padding: '10px 20px', 
          backgroundColor: '#282c34', 
          color: 'white', 
          border: 'none', 
          borderRadius: '5px', 
          cursor: 'pointer',
          transition: 'background-color 0.3s ease'
        }}
      >
        Se Déconnecter
      </button>
    </header>
  );
};

export default Header;
