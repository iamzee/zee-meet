const express = require("express");

const app = express();

let events = [
  {
    id: "101",
    title: "Tekron",
    description: "This is a tekron event",
  },
  {
    id: "201",
    title: "Blood Donation Camp",
    description: "This is a blood donation camp",
  },
];

app.get("/events", (req, res) => {
  res.json(events);
});

app.delete("/events/:id", (req, res) => {
  const id = req.params.id;

  const eventToDelete = events.find((event) => event.id === id);

  if (eventToDelete === undefined) {
    return res.status(404).json({ message: "Event does not exist" });
  }

  events = events.filter((event) => event.id !== id);

  res.status(204).send();
});

app.listen(3000, () => {
  console.log(`Server started on port 3000`);
});
