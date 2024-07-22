import { create, Whatsapp } from "venom-bot";
import SocketGateway from "@/services/sockets/socket.gateway";
import { EWhatsappStatus } from "@/utils/interfaces";
import * as fs from "fs";

fs.readdir("./tokens", (err, files) => {
  if (!err) {
    files.forEach(async (file: string) => {
      if (!VenomService.checkClient(file)) {
        await VenomService.createClient(file);
      }
    });
  }
});

export default class VenomService {
  private static clients: Map<string, Whatsapp> = new Map<string, any>();

  private constructor() {

  }

  static async createClient(userId: string, socket?: SocketGateway) {
    await create({
      session: userId,
      catchQR: (base64Qrimg, asciiQR, attempts, urlCode) => {
        socket && socket.emitMessage(`whatsappStatus-${userId}`, { status: EWhatsappStatus.qrCode, qr: urlCode });
      },

      disableSpins: false
    }).then((client) => {
      start(client);
      VenomService.clients.set(userId, client);
      socket && socket.emitMessage(`whatsappStatus-${userId}`, { status: EWhatsappStatus.connected });
    }).catch(() => {
      socket && socket.emitMessage(`whatsappStatus-${userId}`, { status: EWhatsappStatus.cancelled });
    });
  }

  static async getClient(userId: string, socket: SocketGateway): Promise<Whatsapp> {
    if (!VenomService.clients.get(userId)) {
      socket.emitMessage(`whatsappStatus-${userId}`, { status: EWhatsappStatus.pending });
      VenomService.createClient(userId, socket).then();
    }
    return this.clients.get(userId);
  }

  static async removeClient(userId: string, socket: SocketGateway) {
    if (VenomService.clients.get(userId)) {
      socket.emitMessage(`whatsappStatus-${userId}`, { status: EWhatsappStatus.pending });
      VenomService.clients.delete(userId);
      socket.emitMessage(`whatsappStatus-${userId}`, { status: EWhatsappStatus.cancelled });
    }
  }

  static checkClient(userId: string): Boolean {

    return Boolean(this.clients.get(userId));
  }

}

const start = (client: Whatsapp) => {

};