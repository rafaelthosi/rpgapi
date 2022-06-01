import { UsersRepositoryInMemory } from "@modules/users/repositories/in-memory/UsersRepositoryInMemory";
import { AppError } from "@shared/errors/AppError";

import { CreateUserUseCase } from "../createUser/createUserUseCase";
import { ListUsersUseCase } from "../listUsers/ListUsersUseCase";
import { DisplayUserUseCase } from "./DisplayUserUseCase";

let userRepositoryInMemory: UsersRepositoryInMemory;
let displayUserUseCase: DisplayUserUseCase;
let createUserUseCase: CreateUserUseCase;
let listUsersUseCase: ListUsersUseCase;

describe("Find User", () => {
  beforeEach(() => {
    userRepositoryInMemory = new UsersRepositoryInMemory();
    displayUserUseCase = new DisplayUserUseCase(userRepositoryInMemory);
    createUserUseCase = new CreateUserUseCase(userRepositoryInMemory);
    listUsersUseCase = new ListUsersUseCase(userRepositoryInMemory);
  });

  it("Should be able to display a user", async () => {
    await createUserUseCase.execute({
      password: "123",
      username: "teste display user",
    });

    const [user] = await listUsersUseCase.execute();

    const userWithDisplayUseCase = await displayUserUseCase.execute(user.id);

    expect(userWithDisplayUseCase.username).toBe("teste display user");
  });

  it("Should not be able to display a non-existing user", () => {
    expect(async () => {
      await displayUserUseCase.execute("teste-123-id-321");
    }).rejects.toBeInstanceOf(AppError);
  });
});
