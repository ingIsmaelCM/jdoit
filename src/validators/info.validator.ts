import { IsEmail, IsEnum, IsNotEmpty, IsOptional, Length, ValidateIf } from "class-validator";
import { ApiProperty } from "@nestjs/swagger";
import { validationConfig } from "@/configs";
import { EInfoGender, EInfoType, IInfo } from "@/models/info.model";


export class CreateInfoDto implements Partial<IInfo> {

  @IsNotEmpty(validationConfig.isRequired())
  @Length(10, 20, validationConfig.isLength())
  @ApiProperty({ minimum: 10, maximum: 20 })
  phone: string;

  @IsOptional()
  @IsEmail({}, validationConfig.isEmail())
  @ApiProperty({ required: false })
  email: string;

  @IsOptional()
  @Length(10, 20, validationConfig.isLength())
  @ApiProperty({ required: false, minimum: 10, maximum: 20 })
  dni: string;

  @IsOptional()
  @IsEnum(EInfoGender, validationConfig.isEnum(Object.values(EInfoGender)))
  @ApiProperty({ required: false, default: EInfoGender.Indefinido, enum: EInfoGender })
  gender: EInfoGender;

  @IsOptional()
  @Length(10, 75, validationConfig.isLength())
  @ApiProperty({ required: false, minimum: 10, maximum: 75 })
  addressId: string;


  @IsOptional()
  @Length(0, 250, validationConfig.isLength())
  @ApiProperty({ required: false, minimum: 0, maximum: 250 })
  note: string;

  @ValidateIf(o => o.provinceId || o.municipeId)
  @IsNotEmpty(validationConfig.isRequired())
  line1: string;

  @ValidateIf(o => o.line1 || o.municipeId)
  @IsNotEmpty(validationConfig.isRequired())
  provinceId: string;

  @ValidateIf(o => o.provinceId || o.line1)
  @IsNotEmpty(validationConfig.isRequired())
  municipeId: string;
}

export class UpdateInfoDto implements Partial<IInfo> {

  @IsOptional()
  @Length(10, 20, validationConfig.isLength())
  @ApiProperty({ minimum: 10, maximum: 20 })
  phone: string;

  @IsOptional()
  @IsEmail({}, validationConfig.isEmail())
  @ApiProperty({ required: false })
  email: string;

  @IsOptional()
  @Length(10, 20, validationConfig.isLength())
  @ApiProperty({ required: false, minimum: 10, maximum: 20 })
  dni: string;

  @IsOptional()
  @IsEnum(EInfoGender, validationConfig.isEnum(Object.values(EInfoGender)))
  @ApiProperty({ required: false, default: EInfoGender.Indefinido, enum: EInfoGender })
  gender: EInfoGender;

  @IsOptional()
  @Length(10, 75, validationConfig.isLength())
  @ApiProperty({ required: false, minimum: 10, maximum: 75 })
  addressId: string;

  @IsOptional()
  @Length(0, 250, validationConfig.isLength())
  @ApiProperty({ required: false, minimum: 0, maximum: 250 })
  note: string;

  @IsNotEmpty(validationConfig.isRequired())
  @ApiProperty()
  infoModelId: string;

}