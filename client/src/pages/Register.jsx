import './Register.css';
import { useState } from 'react';
import { fetchData } from '../utils/api';
import Button from '../components/Button';

function Register() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const data = await fetchData('/auth/register', 'POST', { email, password });
      console.log('Registration successful:', data);
    } catch (error) {
      console.error('Registration failed:', error);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <h2>Register</h2>
      <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} placeholder="Email" required />
      <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} placeholder="Password" required />
      <Button type="submit">Register</Button>
    </form>
  );
}

export default Register;