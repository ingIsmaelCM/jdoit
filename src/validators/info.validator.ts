import { IsEmail, IsEnum, IsNotEmpty, IsOptional, Length } from "class-validator";
import { ApiProperty } from "@nestjs/swagger";
import { validationConfig } from "@/configs";
import { EInfoGender, EInfoType, IInfo } from "@/models/info.model";


export class CreateInfoDto implements Partial<IInfo> {

  @IsNotEmpty(validationConfig.isRequired("phone"))
  @Length(10, 20, validationConfig.isLength("phone", 10, 20))
  @ApiProperty({ minimum: 10, maximum:20})
  phone: string;

  @IsOptional()
  @IsEmail({},validationConfig.isEmail("email"))
  @ApiProperty({ required: false })
  email: string;

  @IsOptional()
  @Length(10, 20, validationConfig.isLength("dni", 10, 20))
  @ApiProperty({ required: false, minimum: 10, maximum:20 })
  dni: string;

  @IsOptional()
  @IsEnum(EInfoGender, validationConfig.isEnum("gender",EInfoGender))
  @ApiProperty({ required: false, default: EInfoGender.Indefinido, enum: EInfoGender })
  gender: EInfoGender;

  @IsOptional()
  @Length(10, 75, validationConfig.isLength("addressId", 10, 75))
  @ApiProperty({ required: false, minimum: 10, maximum:75 })
  addressId: string;


  @IsOptional()
  @Length(0, 250, validationConfig.isLength("note", 10, 75))
  @ApiProperty({ required: false, minimum: 0, maximum:250 })
  note: string;

}

export class UpdateInfoDto implements Partial<IInfo> {

  @IsOptional()
  @Length(10, 20, validationConfig.isLength("phone", 10, 20))
  @ApiProperty({ minimum: 10, maximum:20})
  phone: string;

  @IsOptional()
  @IsEmail({},validationConfig.isEmail("email"))
  @ApiProperty({ required: false })
  email: string;

  @IsOptional()
  @Length(10, 20, validationConfig.isLength("dni", 10, 20))
  @ApiProperty({ required: false, minimum: 10, maximum:20 })
  dni: string;

  @IsOptional()
  @IsEnum(EInfoGender, validationConfig.isEnum("gender",EInfoGender))
  @ApiProperty({ required: false, default: EInfoGender.Indefinido, enum: EInfoGender })
  gender: EInfoGender;

  @IsOptional()
  @Length(10, 75, validationConfig.isLength("addressId", 10, 75))
  @ApiProperty({ required: false, minimum: 10, maximum:75 })
  addressId: string;

  @IsOptional()
  @Length(0, 250, validationConfig.isLength("note", 10, 75))
  @ApiProperty({ required: false, minimum: 0, maximum:250 })
  note: string;

  @IsNotEmpty(validationConfig.isRequired("infoId"))
  @ApiProperty()
  info_Id: string;

}