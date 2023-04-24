import { FastifyRequest, FastifyReply } from "fastify";
import { prisma } from "@/lib/prisma";
import { hash } from "bcryptjs";
import { z } from "zod";
import { Meal } from "@prisma/client";

export async function register(request: FastifyRequest, reply: FastifyReply) {
  const registerSchema = z.object({
    name: z.string(),
    email: z.string().email(),
    password: z.string().min(6),
  });

  const { name, email, password } = registerSchema.parse(request.body);

  const password_hash = await hash(password, 6);

  const user = await prisma.user.create({
    data: {
      name,
      email,
      password_hash,
    },
  });

  return reply.status(201).send({ user });
}

export async function listMetrics(
  request: FastifyRequest,
  reply: FastifyReply
) {
  const mealSchema = z.object({
    user_id: z.string(),
  });

  const { user_id } = mealSchema.parse(request.params);

  const meals = await prisma.meal.findMany({
    where: {
      user_id,
    },
  });

  const totalMeals = meals.length;
  const totalMealsInDiet = meals.filter((meal) => meal.diet).length;
  const totalMealsNotInDiet = totalMeals - totalMealsInDiet;

  function findBestSequence(meals: Meal[]) {
    let maxSequence = 0;
    let currentSequence = 0;
    let lastDate: any | null = null;

    meals.forEach((meal) => {
      const date = meal.date!.toDateString();
      if (date !== lastDate) {
        lastDate = date;
        currentSequence = 0;
      }
      if (meal.diet) {
        currentSequence++;
        if (currentSequence > maxSequence) {
          maxSequence = currentSequence;
        }
      }
    });
    return maxSequence;
  }

  return reply.status(200).send({
    totalMeals,
    totalMealsInDiet,
    totalMealsNotInDiet,
    findBestSequence,
  });
}
