import { v4 as uuidV4 } from "uuid";

class User {
  id: string;

  username: string;

  password: string;

  isMaster: boolean;

  created_at: Date;

  constructor() {
    if (!this.id) {
      this.id = uuidV4();
    }
  }
}

export { User };
