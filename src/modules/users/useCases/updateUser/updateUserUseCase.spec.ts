import { UsersRepositoryInMemory } from "@modules/users/repositories/in-memory/UsersRepositoryInMemory";
import { AppError } from "@shared/errors/AppError";

import { CreateUserUseCase } from "../createUser/createUserUseCase";
import { ListUsersUseCase } from "../listUsers/ListUsersUseCase";
import { UpdateUserUseCase } from "./updateUserUseCase";

let userRepositoryInMemory: UsersRepositoryInMemory;
let updateUserUseCase: UpdateUserUseCase;
let createUserUseCase: CreateUserUseCase;
let listUsersUseCase: ListUsersUseCase;

describe("Update User", () => {
  beforeEach(() => {
    userRepositoryInMemory = new UsersRepositoryInMemory();
    updateUserUseCase = new UpdateUserUseCase(userRepositoryInMemory);
    createUserUseCase = new CreateUserUseCase(userRepositoryInMemory);
    listUsersUseCase = new ListUsersUseCase(userRepositoryInMemory);
  });

  it("Should be able to update an user", async () => {
    await createUserUseCase.execute({
      password: "123",
      username: "teste",
    });

    let [user] = await listUsersUseCase.execute();

    await updateUserUseCase.execute({
      id: user.id,
      username: "teste depois do update",
    });

    [user] = await listUsersUseCase.execute();

    expect(user.username).toBe("teste depois do update");
  });

  it("Should not be able to update a non-existing user", () => {
    expect(async () => {
      await updateUserUseCase.execute({
        id: "teste-123-id-321",
        username: "teste depois do update",
      });
    }).rejects.toBeInstanceOf(AppError);
  });
});
