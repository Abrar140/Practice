import React, { useState } from 'react';
import { BrowserRouter as Router, Route, NavLink, Routes } from 'react-router-dom';
import './dailydairy.css'

const  DailyDairy= () => {
  const [entries, setEntries] = useState([]);
  const [sentEntries, setSentEntries] = useState([]);
  const [entry, setEntry] = useState({ number: '', from: '', to: '', subject: '' });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setEntry({ ...entry, [name]: value });
  };

  const saveEntry = () => {
    setEntries([...entries, entry]);
    setEntry({ number: '', from: '', to: '', subject: '' });
  };

  const sendEntry = () => {
    setSentEntries([...sentEntries, entry]);
    setEntry({ number: '', from: '', to: '', subject: '' });
  };

  return (
    <Router>
      <div>
        <nav>
          <ul>
            <li><NavLink to="/new">New</NavLink></li>
            <li><NavLink to="/saved">Saved</NavLink></li>
            <li><NavLink to="/sent">Sent</NavLink></li>
            <li><NavLink to="/search">Search</NavLink></li>
            <li><NavLink to="/count">Count</NavLink></li>
          </ul>
        </nav>
        <Routes>
          <Route path="/new" element={<NewEntryForm entry={entry} handleChange={handleChange} saveEntry={saveEntry} sendEntry={sendEntry} />} />
          <Route path="/saved" element={<SavedEntries entries={entries} />} />
          <Route path="/sent" element={<SentEntries entries={sentEntries} />} />
          <Route path="/search" element={<Search entries={entries} sentEntries={sentEntries} />} />
          <Route path="/count" element={<Count savedCount={entries.length} sentCount={sentEntries.length} />} />
        </Routes>
      </div>
    </Router>
  );
};

const NewEntryForm = ({ entry, handleChange, saveEntry, sendEntry }) => (
  <div>
    <h2>New Entry</h2>
    <form>
      <div>
        <label>Number:</label>
        <input type="text" name="number" value={entry.number} onChange={handleChange} />
      </div>
      <div>
        <label>From:</label>
        <input type="text" name="from" value={entry.from} onChange={handleChange} />
      </div>
      <div>
        <label>To:</label>
        <input type="text" name="to" value={entry.to} onChange={handleChange} />
      </div>
      <div>
        <label>Subject:</label>
        <input type="text" name="subject" value={entry.subject} onChange={handleChange} />
      </div>
      <button type="button" onClick={saveEntry}>Save Entry</button>
      <button type="button" onClick={sendEntry}>Send Entry</button>
    </form>
  </div>
);

const SavedEntries = ({ entries }) => (
  <div>
    <h2>Saved Entries</h2>
    <ul>
      {entries.map((entry, index) => (
        <li key={index}>{JSON.stringify(entry)}</li>
      ))}
    </ul>
  </div>
);

const SentEntries = ({ entries }) => (
  <div>
    <h2>Sent Entries</h2>
    <ul>
      {entries.map((entry, index) => (
        <li key={index}>{JSON.stringify(entry)}</li>
      ))}
    </ul>
  </div>
);

const Search = ({ entries, sentEntries }) => {
  const [query, setQuery] = useState('');
  const filteredEntries = entries.filter(entry => entry.subject.includes(query));
  const filteredSentEntries = sentEntries.filter(entry => entry.subject.includes(query));

  return (
    <div>
      <h2>Search</h2>
      <input type="text" value={query} onChange={(e) => setQuery(e.target.value)} placeholder="Search by subject" />
      <div>
        <h3>Saved Entries</h3>
        <ul>
          {filteredEntries.map((entry, index) => (
            <li key={index}>{JSON.stringify(entry)}</li>
          ))}
        </ul>
      </div>
      <div>
        <h3>Sent Entries</h3>
        <ul>
          {filteredSentEntries.map((entry, index) => (
            <li key={index}>{JSON.stringify(entry)}</li>
          ))}
        </ul>
      </div>
    </div>
  );
};

const Count = ({ savedCount, sentCount }) => (
  <div>
    <h2>Count</h2>
    <p>Saved Entries: {savedCount}</p>
    <p>Sent Entries: {sentCount}</p>
  </div>
);

export default  DailyDairy;
