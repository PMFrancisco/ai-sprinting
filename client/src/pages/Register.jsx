import './Register.css';
import { useState } from 'react';
import { fetchData } from '../utils/api';
import Button from '../components/Button';
import LoadingSpinner from '../components/LoadingSpinner';
import Modal from '../components/Modal';

function Register() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    try {
      const data = await fetchData('/auth/register', 'POST', { name, email, password });
      console.log("Registration successful:", data);
    } catch (error) {
      console.error("Registration failed:", error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <>
      {isLoading && (
        <Modal>
          <LoadingSpinner />
        </Modal>
      )}
      <div className={isLoading ? 'blur' : ''}>
        <form onSubmit={handleSubmit}>
          <h2>Register</h2>
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="Name"
            required
            autoComplete="name"
          />
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Email"
            required
            autoComplete="email"
          />
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Password"
            required
            autoComplete="new-password"
          />
          <Button type="submit" disabled={isLoading}>
            Register
          </Button>
        </form>
      </div>
    </>
  );
}

export default Register;
