import fastify from "fastify";
import audioRoutes from "routes/audioRoutes";
import healthRoutes from "routes/healthRoutes";

const app = fastify({ logger: false });

app.register(audioRoutes, { prefix: "/api/audio" });
app.register(healthRoutes, { prefix: "/api/health" });

export default app;
