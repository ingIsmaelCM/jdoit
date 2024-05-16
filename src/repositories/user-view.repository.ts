import { BaseRepository } from "@/repositories/base.repository";
import UserView from "@/models/user.view";

export  default  class  UserViewRepository extends BaseRepository<UserView>{
  constructor() {
    super(UserView);
  }
}