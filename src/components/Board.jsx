const columns = [
  { id: 'new', title: 'New' },
  { id: 'working', title: 'Working' },
  { id: 'serious', title: 'Serious' },
  { id: 'solved', title: 'Solved' }
];

const agents = ['Ava', 'Noah', 'Mira', 'Ivy'];

function Board({ tickets, moveTicket, deleteTicket, assignTicket }) {
  return (
    <section className="board">
      {columns.map((column) => (
        <div className="column" key={column.id}>
          <div className="column-head">
            <h3>{column.title}</h3>
            <span>{tickets.filter((ticket) => ticket.status === column.id).length}</span>
          </div>

          {tickets
            .filter((ticket) => ticket.status === column.id)
            .map((ticket) => (
              <article className="ticket" key={ticket.id}>
                <h4>{ticket.title}</h4>
                <p>{ticket.customer}</p>

                <div className="chips">
                  <span>{ticket.type}</span>
                  <span>Agent: {ticket.agent}</span>
                </div>

                <strong className="priority">{ticket.priority}</strong>

                <label className="assign">
                  Assign
                  <select
                    value={ticket.agent}
                    onChange={(event) => assignTicket(ticket.id, event.target.value)}
                  >
                    {agents.map((agent) => (
                      <option key={agent}>{agent}</option>
                    ))}
                  </select>
                </label>

                <div className="ticket-actions">
                  <button onClick={() => moveTicket(ticket.id, 'new')}>New</button>
                  <button onClick={() => moveTicket(ticket.id, 'working')}>Working</button>
                  <button onClick={() => moveTicket(ticket.id, 'serious')}>Serious</button>
                  <button onClick={() => moveTicket(ticket.id, 'solved')}>Solved</button>
                  <button className="danger" onClick={() => deleteTicket(ticket.id)}>
                    Delete
                  </button>
                </div>
              </article>
            ))}
        </div>
      ))}
    </section>
  );
}

export default Board;