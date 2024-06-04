import { Controller, Get, Post, Req } from "@nestjs/common";
import { Request } from "express";
import WhatsappService from "@/services/whatsapp.service";

@Controller("whatsapp")
export default class WhatsappController {

  constructor(private readonly whatsappService: WhatsappService) {
  }

  @Get("")
  checkClient(@Req() { user }: Request) {
    return this.whatsappService.checkClient((<any>user).id);
  }
  @Post("/connect")
  connectClient(@Req() { user }: Request) {
    return this.whatsappService.connectClient((<any>user).id);
  }
  @Post("/disconnect")
  disconnectClient(@Req() { user }: Request) {
    return this.whatsappService.disconnectClient((<any>user).id);
  }

}