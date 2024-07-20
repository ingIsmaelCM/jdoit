import { IsEmail, IsEnum, IsNotEmpty, IsOptional, Length, ValidateIf } from "class-validator";
import { ApiProperty } from "@nestjs/swagger";
import { validationConfig } from "@/configs";
import { EInfoGender, EInfoType, IInfo } from "@/models/info.model";


export class CreateInfoDto implements Partial<IInfo> {

  @Length(10, 20, validationConfig.isLength())
  @IsNotEmpty(validationConfig.isRequired())
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
  @ApiProperty({maximum: 120})
  line1: string;

  @IsNotEmpty(validationConfig.isRequired())
  @ApiProperty({maximum: 75})
  provinceId: string;

  @IsNotEmpty(validationConfig.isRequired())
  @ApiProperty({maximum: 75})
  municipeId: string;
}

export class UpdateInfoDto implements Partial<IInfo> {

  @Length(10, 20, validationConfig.isLength())
  @IsNotEmpty(validationConfig.isRequired())
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