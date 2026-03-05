import Fastify from "fastify";
import { userRoutes } from "./presentation/routes/UserRoutes";
import { registerErrorHandler } from "./infrastructure/errors/errorHandler";
import prismaPlugin from "./infrastructure/prisma/prisma.plugin";
import appSetupPlugin from "./infrastructure/plugins/appSetup.plugin";
import cookie from "@fastify/cookie";

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

  registerErrorHandler(app);
  app.register(prismaPlugin);
  app.register(appSetupPlugin);
  app.register(cookie, {
    secret: process.env.COOKIE_TOKEN_SECRET,
  });

  app.register(userRoutes, { prefix: "/user" });

  return app;
}
