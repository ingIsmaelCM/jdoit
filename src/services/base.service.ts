import { Transaction } from "sequelize";
import SequelizeConnection from "@/database/sequelize.connection";

export default class BaseService {

  // eslint-disable-next-line @typescript-eslint/ban-types
  async runWithTrans(method: Function) {
    const trans: Transaction = await SequelizeConnection.getInstance().getTrans();
    try {
      const res=await method(trans);
      await trans.commit();
      return res;
    } catch (e: any) {
      console.log(e)
      await trans.rollback();
      throw e;
    }
  }
}