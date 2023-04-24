import { FastifyInstance } from "fastify";
import { register, listMetrics } from "./controller/user";
import {
  createMeals,
  listMeals,
  filterMeals,
  editMeals,
  deleteMeals,
} from "./controller/meals";

export async function appRoutes(app: FastifyInstance) {
  app.post("/users", register);
  app.get("/users/metrics/:user_id", listMetrics);
  app.post("/meals", createMeals);
  app.get("/meals", listMeals);
  app.get("/meals/:id", filterMeals);
  app.put("/meals/:id", editMeals);
  app.delete("/meals/:id", deleteMeals);
}
