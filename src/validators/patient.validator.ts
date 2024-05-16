import { IsNotEmpty, IsOptional, Length } from "class-validator";
import { IPatient } from "@/models/patient.model";
import { validationConfig } from "@/configs";
import { ApiProperty } from "@nestjs/swagger";
import { CreateInfoDto, UpdateInfoDto } from "@/validators/info.validator";


export class CreatePatientDto extends CreateInfoDto {
  @IsNotEmpty(validationConfig.isRequired("name"))
  @Length(2, 75, validationConfig.isLength("name", 2, 75))
  @ApiProperty({minimum: 2, maximum: 75})
  name: string;

  @IsNotEmpty(validationConfig.isRequired("lastname"))
  @Length(2, 75, validationConfig.isLength("lastname", 2, 75))
  @ApiProperty({minimum: 2, maximum: 75})
  lastname: string;

  @IsNotEmpty(validationConfig.isRequired("createdBy"))
  createdBy: string;

  @IsNotEmpty(validationConfig.isRequired("updatedBy"))
  updatedBy: string;

}

export class UpdatePatientDto extends UpdateInfoDto implements Partial<IPatient> {
  @IsOptional()
  @Length(2, 75, validationConfig.isLength("name", 2, 75))
  @ApiProperty()
  name: string;

  @IsOptional()
  @Length(2, 75, validationConfig.isLength("lastname", 2, 75))
  @ApiProperty()
  lastname: string;

  @IsNotEmpty(validationConfig.isRequired("updatedBy"))
  updatedBy: string;

}