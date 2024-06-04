import { Injectable } from "@nestjs/common";
import {
  ConnectedSocket,
  MessageBody,
  OnGatewayConnection, OnGatewayDisconnect, OnGatewayInit,
  SubscribeMessage,
  WebSocketGateway,
  WebSocketServer
} from "@nestjs/websockets";
import { Server, Socket } from "socket.io";


@WebSocketGateway({
  path: "/api/socket", cors: {
    origin: "*"
  }
})
@Injectable()
export default class SocketGateway implements OnGatewayConnection, OnGatewayInit, OnGatewayDisconnect {

  @WebSocketServer() server: Server;
  private readonly connectedClients: Set<Socket> = new Set();


  @SubscribeMessage("suggestPlan")
  requestPlanSuggestion(@MessageBody() data: any, @ConnectedSocket() client: Socket) {
    client.emit("response", data);
    return data;
  }

  afterInit(server: any): any {
    console.log("WebSocket Gateway initialized");
  }

  handleDisconnect(client: any): any {
    this.connectedClients.delete(client);
  }

  handleConnection(client: any, ...args: any[]): any {
    this.connectedClients.add(client);
  }

  emitMessage(eventName: string, data: unknown){
    console.log(eventName)
    this.server.emit(eventName, data)
  }

}