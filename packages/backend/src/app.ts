import fastify from "fastify";

import audioRoutes from "@/routes/audio-routes";
import healthRoutes from "@/routes/health-routes";

const app = fastify({ logger: false });

app.register(healthRoutes, { prefix: "/api/health" });
app.register(audioRoutes, { prefix: "/api/" });

export default app;
