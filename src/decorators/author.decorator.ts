import { applyDecorators, Body, createParamDecorator, ExecutionContext } from "@nestjs/common";
import { Request } from "express";


export const Author = createParamDecorator((
  (isOld: boolean, ctx: ExecutionContext) => {
    const request: Request = ctx.switchToHttp().getRequest();
    request.body = {
      ...request.body,
      updatedBy: (request.user as any).user.id,
      ...(isOld ? {} : { createdBy: (request.user as any).user.id })
    };
    return request.body
  }
));
