// src/components/Auth/Login.jsx
import React, { useState } from 'react';
import { login } from '../../api/auth.js'; // Adjust the path if needed
import { useNavigate } from 'react-router-dom';

const Login = () => {
  const [form, setForm] = useState({ email: '', password: '' });
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');

    try {
      const res = await login(form);
        console.log(res)
      if (res.status === 200) {
        localStorage.setItem('token', res.data.token);
        navigate('/dashboard'); 
      } else {
        setError('Invalid credentials');
      }
    } catch (err) {
      console.error('Login error:', err);
      setError('Login failed. Please check your credentials.');
    }
  };

  return (
    <div className='auth-form-bg center-container login'>
            <h1 className='text-center'>Welcome to MediCare Companion</h1>
            <p className='text-center'>Your trusted partner in medication management. Choose your role to get started with personalized features.</p>

      
      <form onSubmit={handleSubmit} >
        <h2>Login</h2>
        <input
          type="email"
          name="email"
          value={form.email}
          onChange={handleChange}
          placeholder="Email"
          required
        />
        <input
          type="password"
          name="password"
          value={form.password}
          onChange={handleChange}
          placeholder="Password"
          required
        />
        <div className='flex-container'>
            <button type="submit">Login</button>
            <button className='btn-2' type='button'>Sign In</button>
        </div>
        {error && <p style={{ color: 'red' }}>{error}</p>}
      </form>
    </div>
  );
};

export default Login;
