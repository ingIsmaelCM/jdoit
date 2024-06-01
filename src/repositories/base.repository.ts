import Scope from "../utils/scopes";
import { IParams } from "@/utils/interfaces";
import { Model, ModelCtor, Sequelize } from "sequelize-typescript";
import {DestroyOptions, UpdateOptions, Transaction} from "sequelize"

/**
 * @template T - Generic thats extends from model
 *
 */
export class BaseRepository<T extends Model> {
  protected model;
  protected primaryKeyName: string;

  constructor(model: ModelCtor<T>) {
    this.model = model;
    this.primaryKeyName= model.primaryKeyAttribute||'id';
  }

  protected async safeRun(method: () => Promise<any>): Promise<any> {
    try {
      return await method();
    } catch (error: any) {
      throw error;
    }
  }

  public async getAll(params: IParams): Promise<any> {
    return this.safeRun(() => Scope.get(this.model, params));
  }

  public async find(
    key: string,
    value: string | number | boolean,
    withTrashed?: boolean,
    params?: IParams
  ): Promise<any> {
    return this.safeRun(() =>
      Scope.get(this.model, {
        ...params,
        page: undefined,
        perpage: undefined,
        order: undefined,
        desc: undefined,
        search: undefined,
        scopes: undefined,
        limit: 1,
        filter: [`${key}:${value}`],
        withtrashed: withTrashed,
      })
    );
  }

  public async findById(
    dataId: string | number,
    params?: any,
    withTrashed?: boolean
  ): Promise<any> {
    return this.safeRun(() =>
      this.find("id", dataId, withTrashed, params)
    );
  }

  public async first(params?: any, withTrashed?: boolean): Promise<T> {
    return this.safeRun(() => {
      const parameters: IParams = {
        order: this.primaryKeyName,
        ...params,
        limit: 1,
        withtrashed: withTrashed,
      };
      return Scope.get(this.model, parameters);
    });
  }

  public async last(params?: any, withTrashed?: boolean): Promise<T> {
    return this.safeRun(() => {
      const parameters: IParams = {
        order: this.primaryKeyName,
        desc: true,
        ...params,
        limit: 1,
        withtrashed: withTrashed,
      };
      return Scope.get(this.model, parameters);
    });
  }

  public async create(data: any, trans?: Transaction): Promise<T> {
    return this.safeRun(() => this.model.create(data, {transaction: trans}));
  }

  public async updateOrCreate(data: any, trans?: Transaction): Promise<T> {
    const newData = await this.safeRun(() => this.model.upsert(data, {
      transaction: trans,

    }));
    return newData[0]
  }

  public async bulkCreate(data: any[], trans: any): Promise<T[]> {
    return this.safeRun(() =>
      this.model.bulkCreate(data, {transaction: trans})
    );
  }

  public async update(
    data: any,
    primaryKey: string | number,
    trans?: Transaction,
    key?: string
  ): Promise<T> {
    return this.safeRun(async () => {
      const {updatedAt, createdAt, deletedAt, id, ...newData} = data;
      await this.model.update(newData, {
        where: Sequelize.where(
          Sequelize.col(key || this.primaryKeyName),
          primaryKey
        ),
        transaction: trans,
      });

      return await this.model.findByPk(primaryKey, {transaction: trans});
    });
  }

  public async delete(primaryKey: string | number, trans?: Transaction): Promise<T> {
    return this.safeRun(async () => {
      const dataToDelete = await this.find(this.primaryKeyName, primaryKey);
      if (dataToDelete) {
        return dataToDelete.destroy({transaction: trans});
      }
      return Promise.reject(
        {
          code: 404,
          message: "No se encontró el registro para eliminar"
        }
      )
    });
  }

  async bulkDelete(options: DestroyOptions, force: boolean, trans: Transaction) {
    return await this.safeRun(async () => {
      return await this.model.destroy({
        ...options,
        transaction: trans,
        force: true

      })
    })
  }

  async bulkUpdate(data: any, options: UpdateOptions, trans: Transaction) {
    return await this.safeRun(async () => {
      return await this.model.update(data, {
        ...options,
        transaction: trans,
      })
    })
  }

  public async restore(primaryKey: string | number, trans?: Transaction): Promise<T> {
    return this.safeRun(async () => {
      const dataToRestore = await this.find(
        this.primaryKeyName,
        primaryKey,
        true
      );
      return dataToRestore.restore({transaction: trans});
    });
  }

  public async forceDelete(
    primaryKey: string | number,
    trans?: Transaction
  ): Promise<T> {
    return this.safeRun(async () => {
      const dataToForceDelete = await this.find(
        this.primaryKeyName,
        primaryKey,
        true
      );
      return dataToForceDelete.destroy({
        force: true,
        transaction: trans,
      });
    });
  }

  async validateBeforeInsertRelation(model: ModelCtor<any>, id: string): Promise<any> {
    return this.safeRun(async () => {
      const exists = await model.findByPk(id);
      if (!exists) {
        return Promise.reject({
          code: 404,
          message: "No se encontró el registro relacionado"
        })
      }
      return exists;
    })
  }


}
