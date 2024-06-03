import { BaseRepository } from "@/repositories/base.repository";
import PatientViewModel from "@/models/patient.view";
import PlanView from "@/models/plan.view";
import { col, fn } from "sequelize";

export default class PatientViewRepository extends BaseRepository<PatientViewModel> {
  constructor() {
    super(PatientViewModel);
  }

  async getPlans(patientId: string): Promise<any>{
    return PlanView.findAll({
      group: "type",
      where: {
        patientId: patientId,
      },
      attributes: ["type",
        [fn("avg", col("realProteins")), "proteins"],
        [fn("avg", col("realFat")), "fat"],
        [fn("avg", col("realCarbohidrates")), "carbohidrates"],
        [fn("avg", col("realCalories")), "calories"],
        [fn("any_value",col("patientId")), "patientId"]
      ]
    })
  }
}