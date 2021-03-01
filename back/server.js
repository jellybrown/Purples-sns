import app from "./app";
import config from "./config";
const { PORT } = config;

// run express server
app.listen(PORT, () => {
  console.log(`Server started on Port ${PORT}`);
});
