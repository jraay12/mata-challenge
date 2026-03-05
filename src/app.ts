import Fastify from "fastify";
import { userRoutes } from "./presentation/routes/UserRoutes";
import { registerErrorHandler } from "./infrastructure/errors/errorHandler";
export function buildApp() {
  const app = Fastify({ logger: true });
  registerErrorHandler(app);

  // checker if server is running
  app.get("/health", async () => {
    return {
      status: "ok",
      uptime: process.uptime(),
      timestamp: new Date().toISOString(),
    };
  });

  app.register(userRoutes, { prefix: "/user" });

  return app;
}
