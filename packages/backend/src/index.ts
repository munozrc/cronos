import { PORT } from "config";

import app from "./app";

const start = async () => {
  try {
    await app.listen({ port: Number(PORT) });
    console.log(`Server running at http://localhost:${PORT}/`);
  } catch (err) {
    app.log.error(err);
    process.exit(1);
  }
};

start();
