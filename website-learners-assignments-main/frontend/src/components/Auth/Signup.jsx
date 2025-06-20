import React, { useState } from 'react';
import { signup } from '../../api/auth';
import { useNavigate } from 'react-router-dom';

const Signup = () => {
  const [form, setForm] = useState({
    name: '',
    email: '',
    password: '',
    role: 'patient', // default role
  });
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');

    try {
      const res = await signup(form);

      if (res.data.result === 'success') {
        localStorage.setItem('user', JSON.stringify(res.data.user));
        navigate('/login'); // or auto-login: navigate('/dashboard');
      } else {
        setError(res.data.message || 'Signup failed');
      }
    } catch (err) {
      console.error('Signup error:', err);
      setError('Signup failed. Try again.');
    }
  };

  return (
    <div>
      <h2>Sign Up</h2>
      <form onSubmit={handleSubmit}>
        <input
          name="name"
          value={form.name}
          onChange={handleChange}
          placeholder="Name"
          required
        />
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
        <select name="role" value={form.role} onChange={handleChange}>
          <option value="patient">Patient</option>
          <option value="caretaker">Caretaker</option>
        </select>
        <button type="submit">Register</button>
        {error && <p style={{ color: 'red' }}>{error}</p>}
      </form>
    </div>
  );
};

export default Signup;
