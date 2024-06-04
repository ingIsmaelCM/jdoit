import { Module } from "@nestjs/common";
import SocketGateway from "@/services/sockets/socket.gateway";


@Module({
  providers: [SocketGateway,],
  exports: [SocketGateway]
})
export  default  class  EventModule{}