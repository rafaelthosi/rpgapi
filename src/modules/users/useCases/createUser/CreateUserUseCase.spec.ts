import { UsersRepositoryInMemory } from "../../repositories/in-memory/UsersRepositoryInMemory";
import { ListUsersUseCase } from "../listUsers/ListUsersUseCase";
import { CreateUserUseCase } from "./createUserUseCase";

let usersRepositoryInMemory: UsersRepositoryInMemory;
let createUserUseCase: CreateUserUseCase;
let listUsersUseCase: ListUsersUseCase;

describe("Create User", () => {
  beforeEach(() => {
    usersRepositoryInMemory = new UsersRepositoryInMemory();
    createUserUseCase = new CreateUserUseCase(usersRepositoryInMemory);
    listUsersUseCase = new ListUsersUseCase(usersRepositoryInMemory);
  });

  it("Should be able to create an user", async () => {
    await createUserUseCase.execute({
      isMaster: false,
      password: "123",
      username: "teste",
    });

    const users = await listUsersUseCase.execute();

    expect(users).toHaveLength(1);
    expect(users[0]).toHaveProperty("id");
  });
});
