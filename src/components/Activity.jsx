const agents = [
  { name: 'Ava', role: 'Support Lead', state: 'Available' },
  { name: 'Noah', role: 'Support Agent', state: 'Busy' },
  { name: 'Mira', role: 'Escalation Manager', state: 'Available' },
  { name: 'Ivy', role: 'QA Support', state: 'Away' }
];

function Activity({ activities }) {
  return (
    <aside className="right-panel">
      <h2>Support Team</h2>

      <div className="agents">
        {agents.map((agent) => (
          <div className="agent" key={agent.name}>
            <div className="avatar">{agent.name[0]}</div>

            <div>
              <strong>{agent.name}</strong>
              <p>{agent.role}</p>
              <span>{agent.state}</span>
            </div>
          </div>
        ))}
      </div>

      <h2>Live Updates</h2>

      <ul className="activity">
        {activities.map((item, index) => (
          <li key={index}>{item}</li>
        ))}
      </ul>
    </aside>
  );
}

export default Activity;