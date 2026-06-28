function Header({ resetWorkspace }) {
  return (
    <header className="topbar">
      <div>
        <p className="eyebrow">Live Support Room</p>
        <h1>Customer Issue Board</h1>
        <p>Track customer problems, assign agents, and solve urgent issues.</p>
      </div>

      <button onClick={resetWorkspace}>Reset Workspace</button>
    </header>
  );
}

export default Header;