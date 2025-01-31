import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import './CreateAccount.css';

const CreateAccount = () => {
  const navigate = useNavigate();
  const [formData,setFormData] = useState({
    nom: '',
    prenom: '',
    age: '',
    couleur: '',
    admin: false,
    MotDePasse: '',
    confirmPassword: '',
    pseudo: '',
    avatar: '',
  });
  const [error, setError] = useState([]);

  const handleSubmit = async () => {
    const { MotDePasse, confirmPassword } = formData;
    if (MotDePasse !== confirmPassword){
      setError(['Passwords do not match']);
      return;
    }
    try {
      await axios.post('https://670ed5b73e7151861655eaa3.mockapi.io/Stagiaire', formData);
      setError([]);
      alert('Account created successfully!');
      navigate('/login');
    } catch (err) {
      setError(['An error occurred. Please try again.']);
    }
  };

  return (
  <div className="create-account-container">
    <h1>Create Account</h1>
    {Object.keys(formData).map((key) =>
      key !== 'confirmPassword' ? (
        <input
          key={key}
          type="text"
          placeholder={key}
          value={formData[key]}
          onChange={(e) => setFormData({ ...formData, [key]: e.target.value })}
        />
      ) : null
    )}
    <input
      type="password"
      placeholder="Confirm Password"
      value={formData.confirmPassword}
      onChange={(e) => setFormData({ ...formData, confirmPassword: e.target.value })}
    />
    <button onClick={handleSubmit}>Create Account</button>
    {error.length > 0 && (
      <ul style={{ color: 'red' }}>
        {error.map((err, index) => (
          <li key={index}>{err}</li>
        ))}
      </ul>
    )}
  </div>
);
};

export default CreateAccount;