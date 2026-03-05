import Fastify from "fastify";

export function buildApp() {
  const app = Fastify({ logger: true });

  // checker if server is running
  app.get("/health", async () => {
    return {
      status: "ok",
      uptime: process.uptime(),
      timestamp: new Date().toISOString(),
    };
  });

  return app;
}
