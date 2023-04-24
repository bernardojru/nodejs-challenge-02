import { prisma } from "@/lib/prisma";
import { compare } from "bcryptjs";
import { it, describe, expect } from "vitest";

describe("Register", () => {
  it("should be able to register", () => {
    prisma.user.create({
      data: {
        name: "bernardo José",
        email: "bernardogomes860@gmail.com",
        password_hash: "1234567",
      },
    });

    expect(201);
  });
});
