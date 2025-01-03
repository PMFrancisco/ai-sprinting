import { useLocation } from 'react-router-dom';

function SprintResults() {
  const location = useLocation();
  const sprintsData = location.state?.sprints;

  if (!sprintsData || typeof sprintsData !== 'object' || !Array.isArray(sprintsData.sprints.sprints)) {
    return <div>Error: Invalid sprint data structure</div>;
  }

  return (
    <div>
      <h2>Sprint Results</h2>
      <ul>
        {sprintsData.sprints.sprints.map((sprint, index) => (
          <li key={index}>
            <h3>{sprint.sprintTitle}</h3>
            <p>{sprint.sprintDescription}</p>
            <h4>Tasks:</h4>
            <ul>
              {sprint.tasks.map((task, taskIndex) => (
                <li key={taskIndex}>
                  <p>Title: {task.title}</p>
                  <p>Description: {task.description}</p>
                  <p>Estimate: {task.estimate}</p>
                </li>
              ))}
            </ul>
            <h4>Schedule:</h4>
            <ul>
              {sprint.schedule.map((day, dayIndex) => (
                <li key={dayIndex}>
                  <p>Day: {day.day}</p>
                  <ul>
                    {day.tasks.map((task, taskIndex) => (
                      <li key={taskIndex}>
                        <p>Title: {task.title}</p>
                        <p>Description: {task.description}</p>
                        <p>Estimate: {task.estimate}</p>
                      </li>
                    ))}
                  </ul>
                </li>
              ))}
            </ul>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default SprintResults;
