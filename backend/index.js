
import dotenv from "dotenv";


dotenv.config();


import app from "./server.js";

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(` Server running on port ${PORT} in ${process.env.NODE_ENV} mode`);
});
