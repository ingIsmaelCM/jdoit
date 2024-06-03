import { Request, Response } from "express";
import moment from "moment";
import "moment/locale/es";


class Tool {


  parseOrZero(value: string | number | undefined): number {
    if (typeof value == "number") {
      return value;
    }

    const converted = Number(value);
    if (isNaN(converted)) {
      return 0;
    }

    return converted;
  }

  setCookie(res: Response, name: string, value: string, expiration?: number) {
    res.cookie(name, value, {
      httpOnly: true,
      sameSite: false,
      secure: true,
      expires: new Date(Date.now() + (expiration || 24 * 60 * 60 * 1000))
    });
  }

  getCookies(req: Request) {
    const cookies = req.headers["cookie"];
    if (!cookies) return null;
    return Object.fromEntries(
      cookies.split("; ").map((cookie) => {
        const [name, value] = cookie.split("=");
        return [name, decodeURIComponent(value)];
      })
    );
  }

  dateToHuman(date: string): string {
    return moment(date).locale("es").format("DD MMM YYYY, hh:mm:ss A");
  }

  diffDates(start: any, end: any): number {
    start = moment(start);
    end = moment(end);
    return Math.round(moment.duration(end.diff(start)).asHours() * 100) / 100;
  }

  uppercaseFirst(str: string) {
    return `${str[0].toUpperCase()}${str.substring(1)}`.replace(/\s+/g, " ").trim();
  }


  initialToUpper = (sentence: string = "") => sentence.toLowerCase().replace(/\b[a-zA-ZáéíóúÁÉÍÓÚüÜñÑ]+\b/gi,
    (match: string) => match !== match.toUpperCase() ? this.uppercaseFirst(match) : match)
    .replace(/\s+/g, " ").trim();

  setUserRelated<
    T extends {
      createdBy?: any;
      updatedBy?: any;
      id?: string;
      [x: string]: any;
    }
  >(req: any, data: T): T {
    if (!data.id) {
      data.createdBy = req.auth.username;
    }
    data.updatedBy = req.auth.username;
    return data;
  }


}

export default new Tool();
