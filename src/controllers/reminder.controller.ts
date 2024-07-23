import { Controller, Delete, Get, Param, Post, Put, Query } from "@nestjs/common";
import ReminderService from "@/services/reminder.service";
import { Author } from "@/decorators/author.decorator";
import { ChangeStatusDto, ReminderDto, ReprogramReminderDto } from "@/validators/reminder.validator";
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
    type: ReminderDto
  })
  @Post()
  createReminded(@Author() data: ReminderDto) {
    return this.reminderService.createReminder(data);
  }



  @ApiBody({
    type: ReminderDto
  })
  @Put(":id")
  updateReminder(@Author() data: ReminderDto, @Param("id") reminderId: string) {
    return this.reminderService.updateReminder(reminderId, data);
  }

  @ApiBody({
    type: ReprogramReminderDto
  })
  @Put(":id/reprogram")
  reprogramReminded(@Author() data: ReprogramReminderDto, @Param("id") reminderId: string) {
    return this.reminderService.reprogramReminder(reminderId, data);
  }

  @ApiBody({
    type: ChangeStatusDto
  })
  @Put(":id/status")
  changeStatus(@Author() data: ChangeStatusDto, @Param("id") id: string) {
    return this.reminderService.changeStatus(id, data);
  }

  @Delete(":id")
  deleteReminder(@Param("id") reminderId: string){
    return this.reminderService.deleteReminder(reminderId)
  }
}