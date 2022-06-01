import { hash } from "bcrypt";

import { ICreateUserDTO } from "@modules/users/dtos/ICreateUserDTO";
import { IUsersRepository } from "@modules/users/repositories/IUsersRepository";
import { AppError } from "@shared/errors/AppError";

class CreateUserUseCase {
  constructor(private usersRepository: IUsersRepository) {}

  async execute({ isMaster = false, password, username }: ICreateUserDTO) {
    const passwordHash = await hash(password, 8);

    const userAlreadyExists = await this.usersRepository.findByUsername(
      username
    );

    if (userAlreadyExists) {
      throw new AppError("User already exists!");
    }

    await this.usersRepository.create({
      isMaster,
      password: passwordHash,
      username,
    });
  }
}

export { CreateUserUseCase };
