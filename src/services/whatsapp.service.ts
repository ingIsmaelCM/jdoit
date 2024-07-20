import { Injectable, NotImplementedException } from "@nestjs/common";
import VenomService from "@/services/venom.service";
import SocketGateway from "@/services/sockets/socket.gateway";


@Injectable()
export default class WhatsappService {

  constructor(private readonly socketGateWay: SocketGateway) {
  }

  async connectClient(userId: string) {
    return VenomService.getClient(userId, this.socketGateWay).then();
  }

  async disconnectClient(userId: string) {
    return VenomService.removeClient(userId, this.socketGateWay).then();
  }


  async checkClient(userId: string): Promise<Boolean> {
    return VenomService.checkClient(userId);
  }

  async sendTextMessage(userId: string, phone: string, message: string) {
    const hasClient = await this.checkClient(userId);
    if (hasClient) {
      const client = await VenomService.getClient(userId, this.socketGateWay);
      client.sendText(phone, message).then();
    } else {
      throw new NotImplementedException("Conexión no encontrada");
    }
  }

  async sendImageMessage(userId: string, phone: string, image: any) {
    console.log(phone)
    const hasClient = await this.checkClient(userId);
    if (hasClient) {
      const client = await VenomService.getClient(userId, this.socketGateWay);
      client.sendImage(phone, image).then();
    } else {
      throw new NotImplementedException("Conexión no encontrada");
    }
  }

}