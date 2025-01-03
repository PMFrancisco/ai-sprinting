import './RequestSprint.css';
import { useState } from 'react';
import { fetchData } from '../utils/api';
import Button from '../components/Button';

function RequestSprint() {
  const [project, setProject] = useState('');
  const [description, setDescription] = useState('');
  const [type, setType] = useState('');
  const [sprintDuration, setSprintDuration] = useState('');
  const [complexity, setComplexity] = useState('Medium');

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const data = await fetchData('/openai/create-sprints', 'POST', { project, description, type, sprintDuration, complexity });
      console.log('Sprint request successful:', data);
    } catch (error) {
      console.error('Sprint request failed:', error);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <h2>Request Sprint</h2>
      <input type="text" value={project} onChange={(e) => setProject(e.target.value)} placeholder="Project" required />
      <textarea value={description} onChange={(e) => setDescription(e.target.value)} placeholder="Description" required />
      <input type="text" value={type} onChange={(e) => setType(e.target.value)} placeholder="Type" required />
      <input type="text" value={sprintDuration} onChange={(e) => setSprintDuration(e.target.value)} placeholder="Sprint Duration" required />
      <select value={complexity} onChange={(e) => setComplexity(e.target.value)} required>
        <option value="Low">Low</option>
        <option value="Medium">Medium</option>
        <option value="High">High</option>
      </select>
      <Button type="submit">Request Sprint</Button>
    </form>
  );
}

export default RequestSprint;