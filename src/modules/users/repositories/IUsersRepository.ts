import { ICreateUserDTO } from "../dtos/ICreateUserDTO";
import { IUpdateUserDTO } from "../dtos/IUpdateUserDTO";
import { User } from "../infra/typeorm/entities/User";

interface IUsersRepository {
  create(data: ICreateUserDTO): Promise<void>;
  findByUsername(username: string): Promise<User>;
  findById(id: string): Promise<User>;
  list(): Promise<User[]>;
  update(data: IUpdateUserDTO): Promise<User | void>;
  delete(id: string): Promise<void>;
}

export { IUsersRepository };
