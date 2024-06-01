import { IsNotEmpty, Length, Matches } from "class-validator";
import { ApiProperty } from "@nestjs/swagger";
import { validationConfig } from "@/configs";

const PASSWORD_PATTERN = /^(((?=.*[a-z0-9]])(?=.*[A-Z]))|((?=.*[a-z])(?=.*[0-9]))|((?=.*[A-Z])(?=.*[0-9])))(?=.{6,20})/;


export class AuthLoginDto {
  @IsNotEmpty(validationConfig.isRequired())
  @ApiProperty()
  username: string;

  @Length(6, 20, validationConfig.isLength())
  @IsNotEmpty(validationConfig.isRequired())
  @ApiProperty()
  password: string;
}

export class AuthRegisterDto {

  @IsNotEmpty(validationConfig.isRequired())
  @ApiProperty()
  name: string;

  @IsNotEmpty(validationConfig.isRequired())
  @ApiProperty()
  lastname: string;

  @IsNotEmpty(validationConfig.isRequired())
  @ApiProperty()
  username: string;

  @IsNotEmpty()
  @Matches(PASSWORD_PATTERN, { message: "La contraseña es muy débil" })
  @ApiProperty()
  password: string;
}