import React, { useState, useEffect } from "react";
import {
  BrowserRouter as Router,
  Route,
  NavLink,
  Routes,
} from "react-router-dom";
import axios from "axios";
import "./new.css"; // Import the CSS file

const New = () => {
  const [entries, setEntries] = useState([]);
  const [sentEntries, setSentEntries] = useState([]);
  const [entry, setEntry] = useState({
    number: "",
    from: "",
    to: "",
    subject: "",
    status: "",
    sendingStatus: "unsent",
    readingStatus: "unread",
  });

  // Fetch entries from MongoDB on component mount
  useEffect(() => {
    const fetchEntries = async () => {
      try {
        const response = await axios.get("http://localhost:5000/entries");
        const savedEntries = response.data.filter(
          (entry) => entry.status === "saved"
        );
        const sentEntries = response.data.filter(
          (entry) => entry.status === "sent"
        );
        setEntries(savedEntries);
        setSentEntries(sentEntries);
      } catch (error) {
        console.error("Error fetching entries:", error);
      }
    };

    fetchEntries();
  }, []);

  // Handle form input change
  const handleChange = (e) => {
    const { name, value } = e.target;
    setEntry((prevEntry) => ({
      ...prevEntry,
      [name]: value,
    }));
  };

  // Save new entry
  const saveEntry = async () => {
    try {
      const newEntry = { ...entry, status: "saved" };
      const response = await axios.post(
        "http://localhost:5000/entries",
        newEntry
      );
      setEntries([...entries, response.data]);
      setEntry({
        number: "",
        from: "",
        to: "",
        subject: "",
        status: "",
        sendingStatus: "unsent",
        readingStatus: "unread",
      });
    } catch (error) {
      console.error("Error saving entry:", error);
    }
  };

  // Send new entry
  const sendEntry = async () => {
    try {
      const newEntry = { ...entry, status: "sent" };
      const response = await axios.post(
        "http://localhost:5000/entries",
        newEntry
      );
      setSentEntries([...sentEntries, response.data]);
      setEntry({
        number: "",
        from: "",
        to: "",
        subject: "",
        status: "",
        sendingStatus: "unsent",
        readingStatus: "unread",
      });
    } catch (error) {
      console.error("Error sending entry:", error);
    }
  };

  // Update reading status
  const updateReadingStatus = async (id, status) => {
    try {
      await axios.put(
        `http://localhost:5000/entries/${id}/readingStatus`,
        {
          readingStatus: status,
        }
      );
      setEntries(
        entries.map((entry) =>
          entry._id === id ? { ...entry, readingStatus: status } : entry
        )
      );
      setSentEntries(
        sentEntries.map((entry) =>
          entry._id === id ? { ...entry, readingStatus: status } : entry
        )
      );
    } catch (error) {
      console.error("Error updating reading status:", error);
    }
  };

  // Update sending status
  const updateSendingStatus = async (id, status) => {
    try {
      await axios.put(
        `http://localhost:5000/entries/${id}/sendingStatus`,
        {
          sendingStatus: status,
        }
      );
      setEntries(
        entries.map((entry) =>
          entry._id === id ? { ...entry, sendingStatus: status } : entry
        )
      );
      setSentEntries(
        sentEntries.map((entry) =>
          entry._id === id ? { ...entry, sendingStatus: status } : entry
        )
      );
    } catch (error) {
      console.error("Error updating sending status:", error);
    }
  };

  return (
    <Router>
      <div>
        {/* Navigation Bar */}
        <nav>
          <ul>
            <li>
              <NavLink to="/new" activeClassName="active">
                New
              </NavLink>
            </li>
            <li>
              <NavLink to="/saved" activeClassName="active">
                Saved
              </NavLink>
            </li>
            <li>
              <NavLink to="/sent" activeClassName="active">
                Sent
              </NavLink>
            </li>
            <li>
              <NavLink to="/search" activeClassName="active">
                Search
              </NavLink>
            </li>
            <li>
              <NavLink to="/count" activeClassName="active">
                Count
              </NavLink>
            </li>
            <li>
              <NavLink to="/secretary" activeClassName="active">
                Secretary
              </NavLink>
            </li>
          </ul>
        </nav>

        {/* Main Content */}
        <div className="container">
          <Routes>
            <Route
              path="/new"
              element={
                <NewEntryForm
                  entry={entry}
                  handleChange={handleChange}
                  saveEntry={saveEntry}
                  sendEntry={sendEntry}
                />
              }
            />
            <Route path="/saved" element={<SavedEntries entries={entries} />} />
            <Route
              path="/sent"
              element={<SentEntries sentEntries={sentEntries} />}
            />
            <Route
              path="/search"
              element={<Search entries={entries} sentEntries={sentEntries} />}
            />
            <Route
              path="/count"
              element={
                <Count
                  savedCount={entries.length}
                  sentCount={sentEntries.length}
                />
              }
            />
            <Route
              path="/secretary"
              element={
                <SecretaryView
                  entries={entries}
                  updateReadingStatus={updateReadingStatus}
                  updateSendingStatus={updateSendingStatus}
                />
              }
            />
          </Routes>
        </div>
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
        <input
          type="text"
          name="number"
          value={entry.number}
          onChange={handleChange}
        />
      </div>
      <div>
        <label>From:</label>
        <input
          type="text"
          name="from"
          value={entry.from}
          onChange={handleChange}
        />
      </div>
      <div>
        <label>To:</label>
        <input type="text" name="to" value={entry.to} onChange={handleChange} />
      </div>
      <div>
        <label>Subject:</label>
        <input
          type="text"
          name="subject"
          value={entry.subject}
          onChange={handleChange}
        />
      </div>
      <button type="button" onClick={saveEntry}>
        Save Entry
      </button>
      <button type="button" onClick={sendEntry}>
        Send Entry
      </button>
    </form>
  </div>
);

const SavedEntries = ({ entries }) => (
  <div>
    <h2>Saved Entries</h2>
    <table>
      <thead>
        <tr>
          <th>Number</th>
          <th>From</th>
          <th>To</th>
          <th>Subject</th>
          <th>Status</th>
        </tr>
      </thead>
      <tbody>
        {entries.map((entry, index) => (
          <tr key={index}>
            <td>{entry.number}</td>
            <td>{entry.from}</td>
            <td>{entry.to}</td>
            <td>{entry.subject}</td>
            <td>{entry.status}</td>
          </tr>
        ))}
      </tbody>
    </table>
  </div>
);

const SentEntries = ({ sentEntries }) => (
  <div>
    <h2>Sent Entries</h2>
    <table>
      <thead>
        <tr>
          <th>Number</th>
          <th>From</th>
          <th>To</th>
          <th>Subject</th>
          <th>Status</th>
        </tr>
      </thead>
      <tbody>
        {sentEntries.map((entry, index) => (
          <tr key={index}>
            <td>{entry.number}</td>
            <td>{entry.from}</td>
            <td>{entry.to}</td>
            <td>{entry.subject}</td>
            <td>{entry.status}</td>
          </tr>
        ))}
      </tbody>
    </table>
  </div>
);

const Count = ({ savedCount, sentCount }) => (
  <div>
    <h2>Count</h2>
    <p>Saved Entries: {savedCount}</p>
    <p>Sent Entries: {sentCount}</p>
  </div>
);


        const SecretaryView = ({
          entries,
          updateReadingStatus,
          updateSendingStatus,
        }) => {
          const [view, setView] = useState("unread");
        
          const filteredEntries = entries.filter((entry) => {
            switch (view) {
              case "unread":
                return entry.status === "sent" && entry.readingStatus !== "read";
              case "read":
                return entry.status === "sent" && entry.readingStatus === "read";
              default:
                return true;
            }
          });
        
          const handleReadingStatusChange = (id, status) => {
            updateReadingStatus(id, status);
          };
        
          const handleSendingStatusChange = (id, status) => {
            updateSendingStatus(id, status);
          };
        
          return (
            <div>
              <h2>Secretary View</h2>
              <div>
                <label>View:</label>
                <select value={view} onChange={(e) => setView(e.target.value)}>
                  <option value="unread">Unread</option>
                  <option value="read">Read</option>
                </select>
              </div>
              <div>
                <h3>Entries</h3>
                <table>
                  <thead>
                    <tr>
                      <th>Number</th>
                      <th>From</th>
                      <th>To</th>
                      <th>Subject</th>
                      <th>Reading Status</th>
                      <th>Sending Status</th>
                    </tr>
                  </thead>
                  <tbody>
                    {filteredEntries.map((entry) => (
                      <tr key={entry._id}>
                        <td>{entry.number}</td>
                        <td>{entry.from}</td>
                        <td>{entry.to}</td>
                        <td>{entry.subject}</td>
                        <td>{entry.readingStatus}</td>
                        <td>{entry.sendingStatus}</td>
                        <td>
                          <button
                            onClick={() =>
                              handleReadingStatusChange(
                                entry._id,
                                entry.readingStatus === "read" ? "unread" : "read"
                              )
                            }
                          >
                            {entry.readingStatus === "read" ? "Mark Unread" : "Mark Read"}
                          </button>
                        </td>
                        <td>
                          <button
                            onClick={() =>
                              handleSendingStatusChange(
                                entry._id,
                                entry.sendingStatus === "sent" ? "unsent" : "sent"
                              )
                            }
                          >
                            {entry.sendingStatus === "sent" ? "Mark Unsent" : "Mark Sent"}
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          );
        };
        
        const Search = ({ entries, sentEntries }) => (
          <div>
            <h2>Search</h2>
            {/* Implement your search functionality here */}
          </div>
        );
        
        export default New;
         