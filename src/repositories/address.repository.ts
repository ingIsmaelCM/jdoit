import { BaseRepository } from "@/repositories/base.repository";
import AddressModel from "@/models/address.model";

export default class AddressRepository extends BaseRepository<AddressModel> {
  constructor() {
    super(AddressModel);
  }
}