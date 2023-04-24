import { FastifyRequest, FastifyReply } from "fastify";
import { prisma } from "@/lib/prisma";
import { z } from "zod";

export async function createMeals(
  request: FastifyRequest,
  reply: FastifyReply
) {
  const mealSchema = z.object({
    name: z.string(),
    description: z.string(),
    diet: z.boolean(),
    user_id: z.string(),
  });

  const { name, description, diet, user_id } = mealSchema.parse(request.body);

  await prisma.meal.create({
    data: {
      name,
      diet,
      date: new Date(),
      description,
      user_id,
    },
  });

  return reply.status(201).send();
}

export async function listMeals(request: FastifyRequest, reply: FastifyReply) {
  const meal = await prisma.meal.findMany();

  return reply.status(200).send({ message: meal });
}

export async function filterMeals(
  request: FastifyRequest,
  reply: FastifyReply
) {
  const mealSchema = z.object({
    id: z.string().uuid(),
  });

  const { id } = mealSchema.parse(request.params);

  const meal = await prisma.meal.findUnique({
    where: {
      id,
    },
  });

  return reply.status(200).send({ message: meal });
}

export async function editMeals(request: FastifyRequest, reply: FastifyReply) {
  const mealSchema = z.object({
    id: z.string().uuid(),
    name: z.string(),
    description: z.string(),
    diet: z.boolean(),
    user_id: z.string(),
  });

  const { id, name, description, diet, user_id } = mealSchema.parse(
    request.body
  );

  await prisma.meal.updateMany({
    where: {
      id,
    },
    data: {
      name,
      description,
      date: new Date(),
      diet,
      user_id,
    },
  });

  return reply.status(204).send();
}

export async function deleteMeals(
  request: FastifyRequest,
  reply: FastifyReply
) {
  const mealSchema = z.object({
    id: z.string().uuid(),
  });

  const { id } = mealSchema.parse(request.params);

  await prisma.meal.delete({
    where: {
      id,
    },
  });

  return reply.status(204).send();
}
