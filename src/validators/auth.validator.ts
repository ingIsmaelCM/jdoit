import { IsNotEmpty, Length, Matches } from "class-validator";
import { ApiProperty } from "@nestjs/swagger";
const PASSWORD_PATTERN=/^(((?=.*[a-z0-9]])(?=.*[A-Z]))|((?=.*[a-z])(?=.*[0-9]))|((?=.*[A-Z])(?=.*[0-9])))(?=.{6,20})/


export class  AuthLoginDto {
  @IsNotEmpty()
  @ApiProperty()
  username: string;

  @IsNotEmpty()
  @Length(6, 20)
  @ApiProperty()
  password: string
}

export class  AuthRegisterDto {

  @IsNotEmpty()
  @ApiProperty()
  name: string;

  @IsNotEmpty()
  @ApiProperty()
  lastname: string;

  @IsNotEmpty()
  @ApiProperty()
  username: string;

  @IsNotEmpty()
  @Matches(PASSWORD_PATTERN,{message: "La contraseña es muy débil"})
  @ApiProperty()
  password: string
}