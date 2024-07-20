import  { Twilio } from "twilio";
import twilioConfig from "@/configs/twilio.config";

export default class SmsService {
  static client: Twilio = new Twilio(...Object.values(twilioConfig));

  static sendMessage(from: string, to: string, message: string) {
    this.client.messages.create({
      body: message,
      to,
      from
    }).then((msg: any) => {
      console.log(msg.sid);
    });
  }
}