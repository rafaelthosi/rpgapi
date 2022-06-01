import { User } from "@modules/users/infra/typeorm/entities/User";
import { UsersRepositoryInMemory } from "@modules/users/repositories/in-memory/UsersRepositoryInMemory";

import { CreateUserUseCase } from "../createUser/createUserUseCase";
import { ListUsersUseCase } from "./ListUsersUseCase";

let usersRepositoryInMemory: UsersRepositoryInMemory;
let listUsersUseCase: ListUsersUseCase;
let createUserUseCase: CreateUserUseCase;

describe("List Users", () => {
  beforeEach(() => {
    usersRepositoryInMemory = new UsersRepositoryInMemory();
    listUsersUseCase = new ListUsersUseCase(usersRepositoryInMemory);
    createUserUseCase = new CreateUserUseCase(usersRepositoryInMemory);
  });

  it("Should be able to list all users", async () => {
    await createUserUseCase.execute({
      password: "123",
      username: "teste",
    });
    await createUserUseCase.execute({
      password: "123",
      username: "teste1",
    });

    const users: User[] = await listUsersUseCase.execute();

    expect(users).toHaveLength(2);
  });
});
