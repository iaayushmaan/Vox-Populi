import { init } from "./app";

async function initServer() {
  const app = await init();
  app.listen(8000, () => console.log("Server started at: 8000"));
}

initServer();
