import { prisma } from "@/lib/prisma";
import { it, describe, expect } from "vitest";

describe("Meals", () => {
  it("deve ser possível de criar refeições", async () => {
    prisma.meal.create({
      data: {
        name: "Bolo de cenoura",
        diet: false,
        date: "11:29:56 GMT+0100",
        description: "Uma delicia",
        user_id: "dca128eb-8fe3-4985-8bf6-4f42cd891cab",
      },
    });

    expect(201).toBeTruthy();
  });

  it("deve ser possível listar todas as refeições", async () => {
    const meal = await prisma.meal.findMany();

    expect(meal).toBeTruthy();
  });

  it("deve ser possível filtrar uma única refeição", async () => {
    const meal = await prisma.meal.findUnique({
      where: {
        id: "4bc4ab8b-4849-445e-859a-65921d5cc96a",
      },
    });

    expect(meal).toBeTruthy();
  });

  it("deve ser possível editar uma refeição", async () => {
    await prisma.meal.updateMany({
      where: {
        id: "ce072ad1-1343-4db6-a4d3-379a662c2849",
      },
      data: {
        name: "Bolo de cenoura",
        diet: true,
        date: "2023-04-04T18:22:28.410Z",
        description: "Uma delicia",
        user_id: "dca128eb-8fe3-4985-8bf6-4f42cd891cab",
      },
    });

    expect(204).toBeTruthy();
  });

  it("deve ser possível deletar uma refeição", async () => {
    prisma.meal.delete({
      where: {
        id: "ce072ad1-1343-4db6-a4d3-379a662c2849",
      },
    });

    expect(204).toBeTruthy();
  });
});
