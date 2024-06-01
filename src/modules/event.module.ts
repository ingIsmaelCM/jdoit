import { Module } from "@nestjs/common";
import PlansGateway from "@/services/sockets/plans.gateway";


@Module({
  providers: [PlansGateway,],
  exports: [PlansGateway]
})
export  default  class  EventModule{}