import { Controller, Post } from "@nestjs/common";
import ReminderService from "@/services/reminder.service";
import { Author } from "@/decorators/author.decorator";
import { CreateReminderDto } from "@/validators/reminder.validator";
import { ApiBody, ApiTags } from "@nestjs/swagger";

@ApiTags("Reminders")
@Controller("reminders")
export  default  class ReminderController {

  constructor(private readonly reminderService: ReminderService) {
  }

  @ApiBody({
    type: CreateReminderDto
  })
  @Post()
  createReminded(@Author() data: CreateReminderDto){
    return this.reminderService.createReminder(data);
  }
}