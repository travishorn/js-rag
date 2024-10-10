import Fastify from "fastify";
import cors from "@fastify/cors";
import { respond } from "./respond.js";

const fastify = Fastify({
  logger: true,
});

await fastify.register(cors, {
  origin: "http://localhost:5173",
});

fastify.get("/prompt", {
  async handler(request) {
    return { response: await respond(request.query.q) };
  },
  schema: {
    querystring: {
      type: "object",
      properties: {
        q: { type: "string" },
      },
      required: ["q"],
    },
    response: {
      200: {
        type: "object",
        properties: {
          response: { type: "string" },
        },
      },
    },
  },
});

try {
  await fastify.listen({ port: 3000 });
} catch (err) {
  fastify.log.error(err);
  process.exit(1);
}
