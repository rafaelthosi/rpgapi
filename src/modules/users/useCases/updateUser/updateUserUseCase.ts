import { IUpdateUserDTO } from "@modules/users/dtos/IUpdateUserDTO";
import { IUsersRepository } from "@modules/users/repositories/IUsersRepository";
import { AppError } from "@shared/errors/AppError";

class UpdateUserUseCase {
  constructor(private usersRepository: IUsersRepository) {}

  async execute({ id, password, username, isMaster }: IUpdateUserDTO) {
    const userBeforeUpdate = await this.usersRepository.findById(id);

    if (!userBeforeUpdate) {
      throw new AppError("User does not exist!");
    }

    const userAfterUpdate = this.usersRepository.update({
      id,
      password,
      username,
      isMaster,
    });

    return userAfterUpdate;
  }
}

export { UpdateUserUseCase };
