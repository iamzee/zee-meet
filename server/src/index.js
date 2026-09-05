const express = require("express");
const crypto = require("node:crypto");
const fs = require("node:fs/promises");
const path = require("node:path");

const app = express();
const PATH_TO_DATA = path.join(__dirname, "data.json");

app.use(express.json());

const readFile = async () => {
  const jsonData = await fs.readFile(PATH_TO_DATA, "utf-8");
  const parsedData = JSON.parse(jsonData);
  return parsedData;
};

const writeFile = async (parsedData) => {
  await fs.writeFile(
    PATH_TO_DATA,
    JSON.stringify(parsedData, null, 2),
    "utf-8",
  );
};

app.get("/events", async (req, res) => {
  const parsedData = await readFile();
  res.json(parsedData);
});

app.post("/events", async (req, res) => {
  const body = req.body;

  if (!body.title) {
    return res.status(400).json({ message: "Title is required" });
  }

  if (!body.description) {
    return res.status(400).json({ message: "Description is required" });
  }

  const newEvent = {
    id: crypto.randomUUID(),
    title: body.title,
    description: body.description,
  };

  const parsedData = await readFile();
  parsedData.push(newEvent);
  await writeFile(parsedData);
  res.status(201).json(newEvent);
});

app.patch("/events/:id", async (req, res) => {
  const body = req.body;
  const id = req.params.id;

  const events = await readFile();
  const index = events.findIndex((event) => event.id === id);

  if (index === -1) {
    return res.status(404).json({ message: "Event does not exist" });
  }

  events[index] = {
    id: events[index].id,
    title: body.title || events[index].title,
    description: body.description || events[index].description,
  };

  await writeFile(events);

  res.json(events[index]);
});

app.delete("/events/:id", async (req, res) => {
  const id = req.params.id;

  let events = await readFile();
  const eventToDelete = events.find((event) => event.id === id);

  if (eventToDelete === undefined) {
    return res.status(404).json({ message: "Event does not exist" });
  }

  events = events.filter((event) => event.id !== id);
  await writeFile(events);

  res.status(204).send();
});

app.listen(3000, () => {
  console.log(`Server started on port 3000`);
});
