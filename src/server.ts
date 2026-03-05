import { buildApp } from "./app";

async function start() {
  const app = buildApp();
  const PORT = Number(process.env.PORT) || 3000;

  try {
    await app.listen({ port: PORT });
  } catch (error) {
    app.log.error(error);
    process.exit(1);
  }
}

start();
