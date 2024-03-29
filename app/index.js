import initFastify from "fastify";
import swagger from "fastify-swagger";

import { container } from "./container.js";
import { setupSwagger } from "./addons/setupSwagger.js";

const fastify = initFastify({ logger: false });

const config = container.resolve("config");
fastify.register(swagger, setupSwagger("/docs", config));

const httpController = container.resolve("httpController");
fastify.get("/rate", httpController.docs, httpController.handle);

try {
  fastify.ready((err) => {
    if (err) throw err;
    fastify.swagger();
  });

  await fastify.listen(3001, "0.0.0.0");

  fastify.log.info(`server listening on ${fastify.server.address().port}`);
} catch (error) {
  fastify.log.error(error);
  process.exit(1);
}
