import { ICreateUserDTO } from "@modules/users/dtos/ICreateUserDTO";
import { User } from "@modules/users/infra/typeorm/entities/User";

import { IUsersRepository } from "../IUsersRepository";

class UsersRepositoryInMemory implements IUsersRepository {
  users: User[] = [];

  async create({
    isMaster,
    password,
    username,
  }: ICreateUserDTO): Promise<void> {
    const user = new User();

    Object.assign(user, {
      isMaster,
      password,
      username,
    });

    this.users.push(user);
  }

  async list(): Promise<User[]> {
    const { users } = this;
    return users;
  }

  async findByUsername(username: string): Promise<User> {
    const user = this.users.find((user) => user.username === username);

    return user;
  }
}

export { UsersRepositoryInMemory };
