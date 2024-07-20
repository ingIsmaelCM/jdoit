import { EReminderStatus, EReminderType, IReminder } from "@/models/reminder.model";
import { IsDate, IsEnum, IsNotEmpty, Matches, MaxLength } from "class-validator";
import { validationConfig } from "@/configs";
import { ApiProperty } from "@nestjs/swagger";
import { Optional } from "@nestjs/common";


const PATTERN_DAY=/^(0?[1-9]|[12][0-9]|3[01])-(0?[1-9]|1[0-2])$/;
const PATTERN_TIME=/^(?:[01]\d|2[0-3]):[0-5]\d$/;

export class CreateReminderDto implements IReminder {

  @IsNotEmpty(validationConfig.isRequired())
  @MaxLength(75, validationConfig.isLength())
  @ApiProperty({
    maximum: 75
  })
  title: string;

  @IsNotEmpty(validationConfig.isRequired())
  @MaxLength(255, validationConfig.isLength())
  @ApiProperty({
    maximum: 255
  })
  description: string;

  @Matches(PATTERN_DAY, validationConfig.isRegex())
  @Optional()
  @ApiProperty()
  day: string;


  @Matches(PATTERN_TIME, validationConfig.isRegex())
  @IsNotEmpty(validationConfig.isRequired())
  @ApiProperty()
  time: string;

  @Optional()
  @ApiProperty()
  dayName: string;

  dueAt: string;
  doneAt: Date;


  @IsEnum(EReminderStatus, validationConfig.isEnum(Object.values(EReminderStatus)))
  @IsNotEmpty(validationConfig.isRequired())
  @ApiProperty({
    enum: Object.values(EReminderStatus)
  })
  status: EReminderStatus;

  @IsEnum(EReminderType, validationConfig.isEnum(Object.values(EReminderType)))
  @IsNotEmpty(validationConfig.isRequired())
  @ApiProperty({
    enum: Object.values(EReminderType)
  })
  type: EReminderType;

  @Optional()
  @ApiProperty({
    required: false
  })
  tags: string;

}

export class ChangeStatusDto{
  @IsEnum(EReminderStatus, validationConfig.isEnum(Object.values(EReminderStatus)))
  @IsNotEmpty(validationConfig.isRequired())
  @ApiProperty({
    enum: Object.values(EReminderStatus)
  })
  status: EReminderStatus;

}