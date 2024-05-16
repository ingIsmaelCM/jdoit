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
      this.client = client;
    });

  }

  static getClient(userId: string): Whatsapp {
    if (!VenomService.clients.get(userId)) {
      new VenomService(userId);
    }
    return this.clients.get(userId);
  }

}
const list = [
  {
    title: "Pasta",
    rows: [
      {
        title: "Ravioli Lasagna",
        description: "Made with layers of frozen cheese",
      }
    ]
  }
];
const start =  (client: Whatsapp) => {
  client.onMessage( (message: Message) => {
    if (message.body.toLowerCase() === "hi" && message.isGroupMsg === false) {
       client
        .sendListMenu(message.from, "Opciones","Despliegue la lista","Lista","Menú", list)
        .then((result) => {
          console.log("Result: ", result); //return object success
        })
        .catch((erro) => {
          console.error("Error when sending: ", erro); //return object error
        });
    }
  }).then();
};