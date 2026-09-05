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

  const handleSubmit = (event) => {
    event.preventDefault();
    const title = event.target.elements.title.value;
    const description = event.target.elements.description.value;

    const newEvent = {
      title,
      description,
    };

    fetch("http://localhost:3000/events", {
      method: "POST",
      body: JSON.stringify(newEvent),
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((response) => response.json())
      .then((data) => {
        setEvents([...events, data]);
        event.target.elements.title.value = "";
        event.target.elements.description.value = "";
      });
  };

  return (
    <div>
      <h1>ZeeMeet</h1>

      <form onSubmit={handleSubmit}>
        <label htmlFor="title">Title</label>
        <input id="title" required name="title" placeholder="Enter title" />
        <label htmlFor="description">Description</label>
        <textarea
          id="description"
          required
          name="description"
          placeholder="Enter description"
        ></textarea>
        <button>Save</button>
      </form>

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
