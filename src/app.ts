import Fastify from "fastify";
import { userRoutes } from "./presentation/routes/UserRoutes";
import { productRoutes } from "./presentation/routes/ProductRoutes";
import prismaPlugin from "./infrastructure/prisma/prisma.plugin";
import appSetupPlugin from "./infrastructure/plugins/appSetup.plugin";
import { errorHandler } from "./infrastructure/errors/errorHandler";
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

  app.setErrorHandler(errorHandler)
  app.register(prismaPlugin);
  app.register(appSetupPlugin);
  app.register(cookie, {
    secret: process.env.COOKIE_TOKEN_SECRET,
  });

  app.register(userRoutes, { prefix: "/user" });
  app.register(productRoutes, { prefix: "/product" });

  return app;
}
