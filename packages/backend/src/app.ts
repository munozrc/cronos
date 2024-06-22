import fastify from "fastify";
import healthRoutes from "routes/healthRoutes";

const app = fastify({ logger: false });

app.register(healthRoutes);

export default app;
