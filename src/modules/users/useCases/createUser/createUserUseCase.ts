import { hash } from "bcrypt";

import { ICreateUserDTO } from "@modules/users/dtos/ICreateUserDTO";
import { IUsersRepository } from "@modules/users/repositories/IUsersRepository";

class CreateUserUseCase {
  constructor(private usersRepository: IUsersRepository) {}

  async execute({ isMaster, password, username }: ICreateUserDTO) {
    const passwordHash = await hash(password, 8);

    await this.usersRepository.create({
      isMaster,
      password: passwordHash,
      username,
    });
  }
}

export { CreateUserUseCase };
