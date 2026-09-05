import { useState, useEffect } from "react";

const App = () => {
  const [events, setEvents] = useState(null);

  useEffect(() => {
    fetch("http://localhost:3000/events")
      .then((response) => response.json())
      .then((data) => {
        setEvents(data);
      });
  }, []);

  return (
    <div>
      <h1>ZeeMeet</h1>
      {!events ? (
        <p>Loading...</p>
      ) : (
        events.map((event) => (
          <div key={event.id}>
            <h2>{event.title}</h2>
            <p>{event.description}</p>
          </div>
        ))
      )}
    </div>
  );
};

export default App;
