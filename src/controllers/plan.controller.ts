import { Body, Controller, Get, HttpCode, Param, Post, Query, UploadedFile, UseInterceptors } from "@nestjs/common";
import { ApiBody, ApiTags } from "@nestjs/swagger";
import PlanService from "@/services/plan.service";
import { IParams } from "@/utils/interfaces";
import { CreatePlanDto, PlanSuggestionDto, SendPlanDto } from "@/validators/plan.validator";
import { Author } from "@/decorators/author.decorator";
import { FileInterceptor } from "@nestjs/platform-express";
import { appConfig } from "@/configs";
import { MulterOptions } from "@nestjs/platform-express/multer/interfaces/multer-options.interface";

@ApiTags("Plan")
@Controller("plans")
export default class PlanController {

  constructor(private readonly planService: PlanService) {
  }

  @Get()
  async getPlans(@Query() params: IParams) {
    return this.planService.getPlans(params);
  }

  @ApiBody({
    type: CreatePlanDto
  })
  @Post()
  async createPlan(@Author() data: CreatePlanDto) {
    return this.planService.createPlan(data);
  }

  @ApiBody({
    type: PlanSuggestionDto
  })
  @HttpCode(200)
  @Post("/suggestions")
  async getSuggestions(@Body() data: PlanSuggestionDto, @Query() params: IParams) {
    return this.planService.getSuggestions(data, params);
  }

  @Post(":patientId/sendwhatsapp")
  @UseInterceptors(FileInterceptor("file", <MulterOptions>appConfig.multerOptions))
  async sendWhatsapp(@Author() data: any, @Param("patientId") patientId: string,
                     @UploadedFile() files: Express.Multer.File) {
    data.image = files;
    return this.planService.sendPlanWhatsapp(data, patientId);
  }
}