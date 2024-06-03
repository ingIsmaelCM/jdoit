import { IEval } from "@/models/eval.model";
import { IPatient } from "@/models/patient.model";
import { IsNotEmpty, Max, MaxLength, Min, MinLength } from "class-validator";
import { validationConfig } from "@/configs";
import { ApiProperty } from "@nestjs/swagger";
import { Optional } from "@nestjs/common";


export  class  CreateEvalDto implements  Partial<IEval>{

  @Min(1, validationConfig.isMin())
  @Max(250, validationConfig.isMax())
  @IsNotEmpty(validationConfig.isRequired())
  @ApiProperty({
    type: "number",
    minimum: 1,
    maximum: 250
  })
  weight: number;


  @Min(20, validationConfig.isMin())
  @Max(250, validationConfig.isMax())
  @IsNotEmpty(validationConfig.isRequired())
  @ApiProperty({
    type: "number",
    minimum: 20,
    maximum: 250
  })
  height: number;

  @Optional()
  @MaxLength(255, validationConfig.isMax())
  @MinLength(5, validationConfig.isMin())
  @IsNotEmpty(validationConfig.isRequired())
  @ApiProperty({
    type: "string",
    maximum: 255,
    minimum: 5
  })
  note: string;

  @IsNotEmpty(validationConfig.isRequired())
  @MinLength(5, validationConfig.isMin())
  @MaxLength(75, validationConfig.isMax())
  @ApiProperty({
    type: "string",
    maximum: 75,
    minimum: 5
  })
  patientId: string;


}