import express from "express";
import path from "path";
import { fileURLToPath } from "url";
import { dirname } from "path";

const app = express();

// Get the port from the environment variable or use 3000 for local development
const port = process.env.PORT || 3000;

// Get __dirname equivalent in ES modules
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

// Serve the static files from the dist directory
app.use(express.static(path.join(__dirname, "dist")));

app.use(
  express.urlencoded({
    extended: true,
  })
);

app.get("*", (req, res) => {
  res.sendFile(path.join(__dirname, "dist", "index.html"));
});

app.post("/ssi/apple", (req, res) => {
  const { code, state } = req.body;
  res.redirect(
    `${process.env.MU_PORTAL_URL}/ssi/apple?code=${code}&state=${state}`
  );
});

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
