import { BaseRepository } from "@/repositories/base.repository";
import PatientViewModel from "@/models/patient.view";

export default class PatientViewRepository extends BaseRepository<PatientViewModel> {
  constructor() {
    super(PatientViewModel);
  }
}