import { IsIn, IsNotEmpty, IsStrongPassword, Length, Matches, ValidateIf } from "class-validator";
import { ApiProperty } from "@nestjs/swagger";
import { validationConfig } from "@/configs";
import { IUserView } from "@/models/user.view";
import { EInfoGender, EInfoType } from "@/models/info.model";
import { CreateInfoDto } from "@/validators/info.validator";

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
  @ApiProperty({
    maximum: 75
  })
  name: string;

  @IsNotEmpty(validationConfig.isRequired())
  @ApiProperty({
    maximum: 75
  })
  lastname: string;

  @IsNotEmpty(validationConfig.isRequired())
  @ApiProperty()
  username: string;

  @Matches(PASSWORD_PATTERN, { message: "La contraseña es muy débil" })
  @IsNotEmpty()
  @ApiProperty()
  password: string;
}

export class AuthUpdateDto extends CreateInfoDto implements  Partial<IUserView>{
  @IsNotEmpty(validationConfig.isRequired())
  @ApiProperty({
    maximum: 75
  })
  name: string;

  @IsNotEmpty(validationConfig.isRequired())
  @ApiProperty({
    maximum: 75
  })
  lastname: string;


  infoType: EInfoType;
  infoId: string;
}

export class PasswordChangeDto {
  @IsStrongPassword({
    minLength: 8,
    minLowercase: 1,
    minNumbers: 1,
  }, {message: "La contraseña es muy débil"})
  @IsNotEmpty(validationConfig.isRequired())
  @ApiProperty()
  password: string;

  @IsIn([Math.random()], {
    message: 'Las contraseñas no coinciden',
  })
  @ValidateIf((o) => o.password !== o.password_confirmation)
  @IsNotEmpty(validationConfig.isRequired())
  @ApiProperty()
  password_confirmation: string;
}