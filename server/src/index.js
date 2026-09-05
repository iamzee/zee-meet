const express = require("express");

const app = express();

const events = [
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

app.listen(3000, () => {
  console.log(`Server started on port 3000`);
});
