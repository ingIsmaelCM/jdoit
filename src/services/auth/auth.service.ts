import { BadRequestException, Injectable } from "@nestjs/common";
import UserRepository from "@/repositories/user.repository";
import { JwtService } from "@nestjs/jwt";
import UserModel, { IUser } from "@/models/user.model";
import * as bcrypt from "bcrypt";
import { AuthLoginDto, AuthRegisterDto } from "@/validators/auth.validator";
import SequelizeConnection from "@/database/sequelize.connection";
import { authConfig } from "@/configs";
import VenomService from "@/services/venom.service";


@Injectable()
export class AuthService {
  constructor(private readonly userRepo: UserRepository, private readonly jwtService: JwtService) {

  }

  async validateUser(userData: AuthLoginDto): Promise<UserModel> {
    const user = await this.userRepo.find("username", userData.username);
    if (!user) {
      throw new BadRequestException("User not found");
    }
    const passwordIsValid: boolean = bcrypt.compareSync(userData.password, user.password);
    if (!passwordIsValid) {
      throw new BadRequestException("Password is invalid");
    }
    const { password, ...result } = user.dataValues;
    return result;
  }

  async login(userData: AuthLoginDto): Promise<any> {
    const user = await this.validateUser(userData);
    const payload = { user: user, id: user.id };
    VenomService.getClient(user.id);
    return { [authConfig.jwtCookieName]: this.jwtService.sign(payload), user };
  }

  async register(userData: AuthRegisterDto): Promise<any> {
    const trans = await SequelizeConnection.getInstance().getTrans();
    try {
      const existingUser = await this.userRepo.find("username", userData.username);
      if (existingUser) {
        throw new BadRequestException("Username already registered");
      }
      const hashedPassword = await bcrypt.hash(userData.password, 10);
      const newUser = { ...userData, password: hashedPassword };
      await this.userRepo.create(newUser, trans);
      await trans.commit();
      return await this.login(userData);
    } catch (e: any) {
      await trans.rollback();
      throw e;
    }
  }

}