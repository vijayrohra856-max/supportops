import { useState } from 'react';

function TicketForm({ addTicket }) {
  const [title, setTitle] = useState('');
  const [customer, setCustomer] = useState('');
  const [type, setType] = useState('Payment');
  const [priority, setPriority] = useState('Medium');
  const [agent, setAgent] = useState('Ava');

  function handleSubmit(event) {
    event.preventDefault();

    if (title === '' || customer === '') {
      return;
    }

    const newTicket = {
      id: Date.now(),
      title: title,
      customer: customer,
      type: type,
      priority: priority,
      status: 'new',
      agent: agent
    };

    addTicket(newTicket);

    setTitle('');
    setCustomer('');
    setType('Payment');
    setPriority('Medium');
    setAgent('Ava');
  }

  return (
    <form className="ticket-form" onSubmit={handleSubmit}>
      <input
        value={title}
        onChange={(event) => setTitle(event.target.value)}
        placeholder="Customer issue title..."
      />

      <input
        value={customer}
        onChange={(event) => setCustomer(event.target.value)}
        placeholder="Customer name..."
      />

      <select value={type} onChange={(event) => setType(event.target.value)}>
        <option>Payment</option>
        <option>Bug</option>
        <option>Account</option>
        <option>Refund</option>
      </select>

      <select value={priority} onChange={(event) => setPriority(event.target.value)}>
        <option>Low</option>
        <option>Medium</option>
        <option>Urgent</option>
      </select>

      <select value={agent} onChange={(event) => setAgent(event.target.value)}>
        <option>Ava</option>
        <option>Noah</option>
        <option>Mira</option>
        <option>Ivy</option>
      </select>

      <button>Add Issue</button>
    </form>
  );
}

export default TicketForm;