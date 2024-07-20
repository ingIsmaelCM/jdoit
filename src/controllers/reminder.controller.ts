import { Controller, Get, Param, Post, Put, Query } from "@nestjs/common";
import ReminderService from "@/services/reminder.service";
import { Author } from "@/decorators/author.decorator";
import { ChangeStatusDto, CreateReminderDto } from "@/validators/reminder.validator";
import { ApiBody, ApiTags } from "@nestjs/swagger";
import { IParams } from "@/utils/interfaces";

@ApiTags("Reminders")
@Controller("reminders")
export default class ReminderController {

  constructor(private readonly reminderService: ReminderService) {
  }


  @Get()
  getReminders(@Query() params: IParams) {
    return this.reminderService.getReminder(params);
  }


  @ApiBody({
    type: CreateReminderDto
  })
  @Post()
  createReminded(@Author() data: CreateReminderDto) {
    return this.reminderService.createReminder(data);
  }

  @ApiBody({
    type: ChangeStatusDto
  })
  @Put(":id/status")
  changeStatus(@Author() data: ChangeStatusDto, @Param("id") id: string) {
    return this.reminderService.changeStatus(id, data);
  }
}