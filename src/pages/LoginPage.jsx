import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useUser } from '../context/UserContext';
import styles from './LoginPage.css';

const LoginPage = () => {
  const [email, setEmail] = useState('');
  const { setUser } = useUser();
  const navigate = useNavigate();

  const handleLogin = () => {
    if (email) {
      setUser({ name: email.split('@')[0] });
      navigate('/');
    }
  };

  return (
    <div className={styles.wrapper}>
      <div className={styles.card}>
        <h2 className={styles.title}>Login to GLS Aravali</h2>
        <input
          type="email"
          placeholder="Enter your email"
          value={email}
          onChange={e => setEmail(e.target.value)}
          className={styles.input}
        />
        <button className={styles.button} onClick={handleLogin}>
          Login
        </button>
      </div>
    </div>
  );
};

export default LoginPage;
