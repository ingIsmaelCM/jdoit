import { Injectable } from "@nestjs/common";
import VenomService from "@/services/venom.service";
import SocketGateway from "@/services/sockets/socket.gateway";


@Injectable()
export  default  class WhatsappService{

  constructor( private readonly socketGateWay: SocketGateway,) {
  }

  async connectClient(userId:string){
    return  VenomService.getClient(userId, this.socketGateWay).then();
  }

  async disconnectClient(userId:string){
    return  VenomService.removeClient(userId, this.socketGateWay).then();
  }


  async checkClient(userId:string){
    return  VenomService.checkClient(userId);
  }

}