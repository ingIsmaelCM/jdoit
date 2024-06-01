import { create, Whatsapp, Message } from "venom-bot";

export default class VenomService {
  private static clients: Map<string, Whatsapp> = new Map<string, any>();
  public client: Whatsapp;

  private constructor(userId: string) {
    create({
      session: userId,
      catchQR:(base64Qrimg, asciiQR, attempts, urlCode) => {

      },
      statusFind:(statusSession, session)=>{
        console.log('Status Session: ', statusSession);
        console.log('Session name: ', session);
      },
      disableSpins: false
    }).then((client) => {
      start(client);
      VenomService.clients.set(userId, client);
    });

  }

  static getClient(userId: string): Whatsapp {
    if (!VenomService.clients.get(userId)) {
      new VenomService(userId);
    }
    return this.clients.get(userId);
  }

}

const start =  (client: Whatsapp) => {

};