import dotenv from 'dotenv';
import app from "./app.js";
import { connectDB } from './db/index.js';

dotenv.config({ path: "./.env" });

let PORT = process.env.PORT || 8000;

connectDB()
  .then(() => {
    app.listen(PORT, () => {
      console.log(`Server listening at http://localhost:${PORT}`);
    });
  })
  .catch(err => {
    console.log("Error: while connecting with database!", err);
    process.exit(1);
  });