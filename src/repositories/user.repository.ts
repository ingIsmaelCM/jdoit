import { BaseRepository } from "@/repositories/base.repository";
import UserModel from "@/models/user.model";

export default class UserRepository extends BaseRepository<UserModel> {
  constructor() {
    super(UserModel);
  }
}