import { ICreateUserDTO } from "../dtos/ICreateUserDTO";
import { User } from "../infra/typeorm/entities/User";

interface IUsersRepository {
  create(data: ICreateUserDTO): Promise<void>;
  findByUsername(username: string): Promise<User>;
  list(): Promise<User[]>;
}

export { IUsersRepository };
