import { Module } from "@nestjs/common";
import UserRepository from "@/repositories/user.repository";
import UserViewRepository from "@/repositories/user-view.repository";


@Module({
  providers: [UserRepository, UserViewRepository],
  controllers: [],
  exports: [UserRepository, UserViewRepository],
  imports: []
})
export class UserModule {
}