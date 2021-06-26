import { User } from "../schemas/user";

export class UserController {
  async get({ params }: { params: any }): Promise<User> {
    console.log(params)
    return {
      name: 'なまえ',
      age: 20,
    }
  }
}
