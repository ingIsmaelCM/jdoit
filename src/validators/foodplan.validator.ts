import { IPlanFood } from "@/models/plan-food.model";
import { IsEnum, IsNotEmpty, Max, MaxLength, Min, MinLength } from "class-validator";
import { validationConfig } from "@/configs";
import { ApiProperty } from "@nestjs/swagger";
import { EPlanDay } from "@/models/plan.model";

export class FoodPlanDto implements Partial<IPlanFood> {

  @Max(2.5, validationConfig.isMax())
  @Min(0.5, validationConfig.isMin())
  @IsNotEmpty(validationConfig.isRequired())
  @ApiProperty({
    minimum: 0.5,
    maximum: 2.5
  })
  portion: number;

  @MaxLength(75, validationConfig.isMax())
  @MinLength(5, validationConfig.isMin())
  @IsNotEmpty(validationConfig.isRequired())
  @ApiProperty({
    maxLength: 75
  })
  foodId: string;

  @IsEnum(EPlanDay, validationConfig.isEnum(Object.values(EPlanDay)))
  @IsNotEmpty(validationConfig.isRequired())
  @ApiProperty({
    enum: Object.values(EPlanDay)
  })
  day: EPlanDay;
}

export class UpdateFoodPlanDto implements Partial<IPlanFood> {

  @Max(2.5, validationConfig.isMax())
  @Min(0.5, validationConfig.isMin())
  @IsNotEmpty(validationConfig.isRequired())
  @ApiProperty({
    minimum: 0.5,
    maximum: 2.5
  })
  portion: number;

  @MaxLength(75, validationConfig.isMax())
  @MinLength(5, validationConfig.isMin())
  @IsNotEmpty(validationConfig.isRequired())
  @ApiProperty({
    maxLength: 75
  })
  foodId: string;
}
export class CreateFoodPlanDto implements Partial<IPlanFood> {

  @Max(2.5, validationConfig.isMax())
  @Min(0.5, validationConfig.isMin())
  @IsNotEmpty(validationConfig.isRequired())
  @ApiProperty({
    minimum: 0.5,
    maximum: 2.5
  })
  portion: number;

  @MaxLength(75, validationConfig.isMax())
  @MinLength(5, validationConfig.isMin())
  @IsNotEmpty(validationConfig.isRequired())
  @ApiProperty({
    maxLength: 75
  })
  foodId: string;

  @MaxLength(75, validationConfig.isMax())
  @MinLength(5, validationConfig.isMin())
  @IsNotEmpty(validationConfig.isRequired())
  @ApiProperty({
    maxLength: 75
  })
  planId: string;

}
