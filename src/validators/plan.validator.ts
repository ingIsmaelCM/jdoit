import { IDiet } from "@/utils/plan-suggestion";
import {
  ArrayMaxSize,
  ArrayMinSize,
  Contains,
  IsArray,
  IsDecimal,
  IsEnum,
  IsNotEmpty,
  Matches, Max,
  MaxLength,
  Min, MinLength,
  ValidateNested
} from "class-validator";
import { validationConfig } from "@/configs";
import { EPlanDay, EPlanType, IPlan } from "@/models/plan.model";
import { IFood } from "@/models/food.model";
import { INutrient } from "@/models/nutrient.model";
import { IPatient } from "@/models/patient.model";
import { ApiProperty } from "@nestjs/swagger";
import { IPlanFood } from "@/models/plan-food.model";
import { Type } from "class-transformer";
import { Optional } from "@nestjs/common";
import { FoodPlanDto } from "@/validators/foodplan.validator";


export class PlanSuggestionDto implements Partial<IDiet> {

  @Min(0, validationConfig.isMin())
  @IsNotEmpty(validationConfig.isRequired())
  @ApiProperty()
  proteins: number;

  @Min(0, validationConfig.isMin())
  @IsNotEmpty(validationConfig.isRequired())
  @ApiProperty()
  carbohidrates: number;

  @Min(0, validationConfig.isMin())
  @IsNotEmpty(validationConfig.isRequired())
  @ApiProperty()
  fat: number;

  @Min(1, validationConfig.isMin())
  @IsNotEmpty(validationConfig.isRequired())
  @ApiProperty()
  maxFoods: number;

  @Matches(/^(?!.*(.).*\1)[LMXJVSD]{1,7}$/gi, validationConfig.isRegex())
  @IsNotEmpty(validationConfig.isRequired())
  @ApiProperty()
  days: string;

}


export class CreatePlanDto implements Partial<IPlan> {

  @IsEnum(EPlanType, validationConfig.isEnum(Object.values(EPlanType)))
  @IsNotEmpty(validationConfig.isRequired())
  @ApiProperty({
    enum: Object.values(EPlanType)
  })
  type: EPlanType;


  @IsArray()
  @ArrayMinSize(1, validationConfig.isMin())
  @ArrayMaxSize(35, validationConfig.isMax())
  @IsNotEmpty(validationConfig.isRequired())
  @Type(() => FoodPlanDto)
  @ValidateNested({ each: true })
  @ApiProperty(
    {
      type: FoodPlanDto,
      isArray: true,
      maxItems: 35,
      minItems: 1
    }
  )
  foods: IFood[];


  @Optional()
  @ApiProperty({
    required: false
  })
  note: string;

  @Optional()
  @ApiProperty({
    required: false
  })
  notes: object;

  @IsNotEmpty(validationConfig.isRequired())
  @ApiProperty({
    maxLength: 75
  })
  patientId: string;

  @Min(0, validationConfig.isMin())
  @IsNotEmpty(validationConfig.isRequired())
  @ApiProperty()
  proteins: number;

  @Min(0, validationConfig.isMin())
  @IsNotEmpty(validationConfig.isRequired())
  @ApiProperty()
  carbohidrates: number;

  @Min(0, validationConfig.isMin())
  @IsNotEmpty(validationConfig.isRequired())
  @ApiProperty()
  fat: number;


}