import { useEffect, useState } from 'react';
import Header from './components/Header.jsx';
import Board from './components/Board.jsx';
import TicketForm from './components/TicketForm.jsx';
import Activity from './components/Activity.jsx';

const defaultTickets = [
  {
    id: 1,
    title: 'Payment failed during checkout',
    customer: 'Riya Sharma',
    type: 'Payment',
    priority: 'Urgent',
    status: 'new',
    agent: 'Ava'
  },
  {
    id: 2,
    title: 'Cannot login after password reset',
    customer: 'Karan Mehta',
    type: 'Account',
    priority: 'Medium',
    status: 'working',
    agent: 'Noah'
  },
  {
    id: 3,
    title: 'Refund pending for duplicate order',
    customer: 'Sneha Rao',
    type: 'Refund',
    priority: 'Urgent',
    status: 'serious',
    agent: 'Mira'
  },
  {
    id: 4,
    title: 'Profile image upload bug',
    customer: 'Aman Verma',
    type: 'Bug',
    priority: 'Low',
    status: 'solved',
    agent: 'Ivy'
  }
];

function App() {
  const [activePage, setActivePage] = useState('board');

  const [tickets, setTickets] = useState(() => {
    const saved = localStorage.getItem('tickets');
    return saved ? JSON.parse(saved) : defaultTickets;
  });

  const [theme, setTheme] = useState('dark');

  const [activities, setActivities] = useState([
    'Ava created a payment ticket',
    'Noah started working on login issue'
  ]);

  useEffect(() => {
    localStorage.setItem('tickets', JSON.stringify(tickets));
  }, [tickets]);

  function addActivity(text) {
    setActivities([text, ...activities]);
  }

  function addTicket(newTicket) {
    setTickets([newTicket, ...tickets]);
    addActivity(`${newTicket.agent} added ${newTicket.title}`);
  }

  function moveTicket(id, newStatus) {
    const selectedTicket = tickets.find((ticket) => ticket.id === id);

    setTickets(
      tickets.map((ticket) =>
        ticket.id === id ? { ...ticket, status: newStatus } : ticket
      )
    );

    addActivity(`${selectedTicket.agent} moved ${selectedTicket.title} to ${newStatus}`);
  }

  function deleteTicket(id) {
    const selectedTicket = tickets.find((ticket) => ticket.id === id);

    setTickets(tickets.filter((ticket) => ticket.id !== id));
    addActivity(`Deleted ${selectedTicket.title}`);
  }

  function assignTicket(id, newAgent) {
    const selectedTicket = tickets.find((ticket) => ticket.id === id);

    setTickets(
      tickets.map((ticket) =>
        ticket.id === id ? { ...ticket, agent: newAgent } : ticket
      )
    );

    addActivity(`${selectedTicket.title} assigned to ${newAgent}`);
  }

  function resetWorkspace() {
    setTickets(defaultTickets);
    setActivities(['Workspace reset']);
  }

  const newCount = tickets.filter((ticket) => ticket.status === 'new').length;
  const seriousCount = tickets.filter((ticket) => ticket.status === 'serious').length;
  const solvedCount = tickets.filter((ticket) => ticket.status === 'solved').length;

  const urgentCount = tickets.filter(
    (ticket) => ticket.priority === 'Urgent' && ticket.status !== 'solved'
  ).length;

  return (
    <div className={`app ${theme}`}>
      <aside className="sidebar">
        <div className="brand">
          <div className="logo">S</div>

          <div>
            <h2>SupportOps</h2>
            <p>Customer issue dashboard</p>
          </div>
        </div>

        <nav>
          <button
            className={activePage === 'board' ? 'active' : ''}
            onClick={() => setActivePage('board')}
          >
            Issue Board
          </button>

          <button
            className={activePage === 'reports' ? 'active' : ''}
            onClick={() => setActivePage('reports')}
          >
            Reports
          </button>
        </nav>

        <div className="side-card">
          <span>Urgent Issues</span>
          <strong>{urgentCount}</strong>
          <p>Urgent issues not solved yet</p>
        </div>

        <button
          className="ghost"
          onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}
        >
          Switch Theme
        </button>
      </aside>

      <main className="main">
        {activePage === 'board' && (
          <>
            <Header resetWorkspace={resetWorkspace} />

            <section className="metrics">
              <div className="metric">
                <span>Total Issues</span>
                <strong>{tickets.length}</strong>
              </div>

              <div className="metric">
                <span>New</span>
                <strong>{newCount}</strong>
              </div>

              <div className="metric">
                <span>Serious</span>
                <strong className="red">{seriousCount}</strong>
              </div>

              <div className="metric">
                <span>Solved</span>
                <strong className="green">{solvedCount}</strong>
              </div>
            </section>

            <TicketForm addTicket={addTicket} />

            <Board
              tickets={tickets}
              moveTicket={moveTicket}
              deleteTicket={deleteTicket}
              assignTicket={assignTicket}
            />
          </>
        )}

        {activePage === 'reports' && (
          <section className="page-panel">
            <p className="eyebrow">Reports</p>
            <h1>Support Reports</h1>
            <p className="subtitle">Quick summary of current support progress.</p>

            <section className="metrics report-metrics">
              <div className="metric">
                <span>Total Issues</span>
                <strong>{tickets.length}</strong>
              </div>

              <div className="metric">
                <span>Urgent Open</span>
                <strong>{urgentCount}</strong>
              </div>

              <div className="metric">
                <span>Serious</span>
                <strong className="red">{seriousCount}</strong>
              </div>

              <div className="metric">
                <span>Solved</span>
                <strong className="green">{solvedCount}</strong>
              </div>
            </section>
          </section>
        )}
      </main>

      <Activity activities={activities} />
    </div>
  );
}

export default App;