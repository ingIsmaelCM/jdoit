import { BadRequestException, Inject, Injectable } from "@nestjs/common";
import UserRepository from "@/repositories/user.repository";
import { JwtService } from "@nestjs/jwt";
import UserModel from "@/models/user.model";
import * as bcrypt from "bcrypt";
import { AuthLoginDto, AuthRegisterDto, AuthUpdateDto, PasswordChangeDto } from "@/validators/auth.validator";
import SequelizeConnection from "@/database/sequelize.connection";
import { authConfig } from "@/configs";
import { CACHE_MANAGER, Cache } from "@nestjs/cache-manager";
import UserViewRepository from "@/repositories/user-view.repository";
import { EInfoType } from "@/models/info.model";
import BaseService from "@/services/base.service";
import { Transaction } from "sequelize";
import InfoRepository from "@/repositories/info.repository";
import AddressRepository from "@/repositories/address.repository";


@Injectable()
export class AuthService extends BaseService {
  constructor(@Inject(CACHE_MANAGER) private readonly cacheManager: Cache,
              private readonly userRepo: UserRepository,
              private readonly infoRepo: InfoRepository,
              private readonly addressRepo: AddressRepository,
              private readonly userViewRepo: UserViewRepository,
              private readonly jwtService: JwtService) {
    super();
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
    const userAuth = await this.userViewRepo.findById(user.id);
    const { password, ...result } = userAuth.dataValues;
    return result;
  }

  async login(userData: AuthLoginDto): Promise<any> {
    const user = await this.validateUser(userData);
    const payload = { user: user, id: user.id };
    //VenomService.getClient(user.id);
    return { [authConfig.jwtCookieName]: this.jwtService.sign(payload), user, title: "Sesión iniciada" };
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

  async updateUser(userData: AuthUpdateDto, userId: string): Promise<any> {
    userData = {
      ...userData,
      infoType: EInfoType.User,
      infoId: userId
    };
    return this.runWithTrans(async (trans: Transaction) => {
      const userUpdated = await this.userRepo.update(userData, userId, trans);
      const existingInfo = await this.infoRepo.find("infoId", userId);
      if (existingInfo) {
        if (existingInfo.addressId) {
          await this.addressRepo.update(userData, existingInfo.addressId, trans);
        } else {
          const address = await this.addressRepo.create(userData, trans);
          userData.addressId = address.id;
        }
        await this.infoRepo.update(userData, existingInfo.id, trans);
      } else {
        const address = await this.addressRepo.create(userData, trans);
        await this.infoRepo.create({ ...userData, addressId: address?.id }, trans);
      }
      const { password, ...data } = userUpdated.dataValues;
      return data;
    });
  }

  async updatePassword(data: PasswordChangeDto, userId: string) {
    const newPassword = await bcrypt.hash(data.password, 10);
    return await this.userRepo.update({ password: newPassword }, userId);
  }

}