import { Module } from "@nestjs/common";
import WhatsappService from "@/services/whatsapp.service";
import WhatsappController from "@/controllers/whatsapp.controller";
import EventModule from "@/modules/event.module";


@Module({
  imports: [EventModule],
  exports:[WhatsappService],
  providers:[WhatsappService],
  controllers:[WhatsappController]
})
export  default class WhatsappModule{}