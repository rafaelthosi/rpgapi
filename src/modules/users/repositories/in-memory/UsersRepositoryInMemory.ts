import { ICreateUserDTO } from "@modules/users/dtos/ICreateUserDTO";
import { IUpdateUserDTO } from "@modules/users/dtos/IUpdateUserDTO";
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

  async findById(id: string): Promise<User> {
    const user = this.users.find((user) => user.id === id);

    return user;
  }

  async update({
    id,
    isMaster,
    password,
    username,
  }: IUpdateUserDTO): Promise<User | void> {
    this.users.forEach((user) => {
      if (user.id === id) {
        Object.assign(user, {
          isMaster: isMaster || user.isMaster,
          password: password || user.password,
          username: username || user.username,
        });
      }
      return user;
    });
  }

  async delete(id: string): Promise<void> {
    const userIndex = this.users.findIndex((user) => user.id === id);

    this.users.splice(userIndex, 1);
  }
}

export { UsersRepositoryInMemory };
