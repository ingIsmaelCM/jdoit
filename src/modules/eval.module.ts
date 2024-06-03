import { Module } from "@nestjs/common";
import EvalService from "@/services/eval.service";
import EvalRepository from "@/repositories/eval.repository";
import EvalController from "@/controllers/eval.controller";


@Module({
  imports:[],
  exports:[],
  providers:[EvalService, EvalRepository],
  controllers: [EvalController]
})

export default class  EvalModule{}