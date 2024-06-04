import { Controller, Delete, Get, Param, Patch, Post, Put, Query } from "@nestjs/common";
import EvalService from "@/services/eval.service";
import { ApiBody, ApiTags } from "@nestjs/swagger";
import { IParams } from "@/utils/interfaces";
import { Author } from "@/decorators/author.decorator";
import { CreateEvalDto } from "@/validators/eval.validator";


@ApiTags("Evaluations")
@Controller("evals")
export default class EvalController {

  constructor(private readonly evalService: EvalService) {
  }


  @Get()
  getEvals(@Query() params: IParams) {
    return this.evalService.getEvals(params);
  }


  @Get(":id")
  findEval(@Param("id") id: string, @Query() params: IParams) {
    return this.evalService.findEval(id, params);
  }

  @ApiBody({
    type: CreateEvalDto
  })
  @Post()
  createEval(@Author() data: CreateEvalDto) {
    return this.evalService.createEval(data);
  }

  @ApiBody({
    type: CreateEvalDto
  })
  @Put(":id")
  updateEval(@Author() data: CreateEvalDto, @Param("id") id: string) {
    return this.evalService.updateEval(id, data);
  }

  @Delete(":id")
  deleteEval(@Param("id") id: string) {
    return this.evalService.deleteEval(id);
  }

  @Patch(":id")
  restoreEval(@Param("id") id: string) {
    return this.evalService.restoreEval(id);
  }
}