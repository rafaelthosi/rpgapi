import { IUsersRepository } from "@modules/users/repositories/IUsersRepository";

class ListUsersUseCase {
  constructor(private usersRepository: IUsersRepository) {}

  async execute() {
    const users = await this.usersRepository.list();

    return users;
  }
}

export { ListUsersUseCase };
