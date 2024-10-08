import {  Op} from "sequelize";
import tools from "./tools";
import * as moment from 'moment';
import { IParams } from "@/utils/interfaces";
import { DataType, Model, ModelCtor } from "sequelize-typescript";

/* BUG Send page, perpage and limit at the same time throw error */
class Scope {

    operators: any = {
        eq: Op.eq,
        ne: Op.ne,
        gt: Op.gt,
        gte: Op.gte,
        lt: Op.lt,
        lte: Op.lte,
        and: Op.and,
        or: Op.or,
        bet: Op.between,
        like: Op.like,
        notlike: Op.notLike,
        ilike: Op.iLike,
        notilike: Op.notILike,
        in: Op.in,
    };

    paginate(perPage: number, page: number): object {
        if (!isNaN(perPage) && !isNaN(page)) {
            const startIndex: number = (page - 1) * perPage;
            return {
                offset: tools.parseOrZero(startIndex),
                limit: tools.parseOrZero(perPage),
            };
        }
        return {};
    }

    limit(limit: number): object {
        return {limit: tools.parseOrZero(limit)};
    }

    search(search: string, cols: Array<string>): object {
        if (cols.length > 0) {
            return {
                [Op.or]: cols.map((col) => {
                    return {
                        [col]: {
                            [Op.like]: `%${search}%`,
                        },
                    };
                }),
            };
        }
        return {};
    }

    fields(fields: string, cols: Array<string>): Record<string, any> {
        let selections = fields.split(",");
        selections = selections.filter((sel) => cols.includes(sel) || sel == "id");
        if (selections.length > 0) {
            return {attributes: selections};
        } else {
            return {};
        }
    }

    //Filter format field:value:union

    isLike(filter: string, cols: Array<string>): Record<string, any>  {
        const [field = "", value = "", union = "and"] = filter.split(":");
        let condition: any = {};

        cols.push("createdBy", "updatedBy");
        if (cols.includes(field)) {
            condition = {
                [field]: {[this.operators["like"]]: `${value}`},
            };
        }
        return {
            union: union,
            condition,
        };
    }

    isNotLike(filter: string, cols: Array<string>): Record<string, any>  {
        const [field = "", value = "", union = "and"] = filter.split(":");
        let condition: any = {};

        cols.push("createdBy", "updatedBy");
        if (cols.includes(field)) {
            condition = {
                [field]: {[this.operators["notlike"]]: `${value}`},
            };
        }
        return {
            union: union,
            condition,
        };
    }

    //Filter format filed:op:value:union
    filter(filter: Array<string>, cols: Array<string>): object {
        let filtered: any = {};
        const and: any = [];
        const or: any = [];
        const conditions: any = {};
        cols.push("createdBy", "updatedBy");
        if (!Array.isArray(filter)) return {};
        filter.forEach((f) => {
            const parts: Array<string> = f.split(":");
            if (parts.length === 2 && (cols.includes(parts[0]) || parts[0] == "id")) {
                conditions[parts[0]] = parts[1];
            } else if (
                parts.length === 3 &&
                (cols.includes(parts[0]) || parts[0] == "id") &&
                Object.keys(this.operators).includes(parts[1]) //field:op:value1,value2
            ) {
                const values = parts[2].split(",").map((v: any) => {
                    if (v.length >= 9 && parts[1] == "bet") {
                        return moment(v);
                    }
                    return v;
                });
                conditions[parts[0]] = {
                    [this.operators[parts[1]]]: values,
                };
            } else if (
                parts.length === 4 &&
                (cols.includes(parts[0]) || parts[0] == "id") &&
                Object.keys(this.operators).includes(parts[1])
            ) {
                const values = parts[2].split(",").map((v: any) => {
                    if (v.length >= 9 && parts[1] == "bet") {
                        return moment(v);
                    }
                    return v;
                });
                const filt = {
                    [parts[0]]: {[this.operators[parts[1]]]: values}, //field:op:value1,value2:conjunc
                };
                if (parts[3] == "or") {
                    or.push(filt);
                } else {
                    and.push(filt);
                }
            } else {
                return;
            }
        });

        filtered = conditions;
        if (and.length > 0) {
            filtered[Op.and] = and;
        }
        if (or.length > 0) {
            filtered[Op.or] = or;
        }
        return filtered;
    }

    isNull(field: string, cols: Array<string>): object {
        if (cols.includes(field)) {
            return {
                [field]: {
                    [Op.eq]: null,
                },
            };
        } else {
            return {};
        }
    }

    notNull(field: string, cols: Array<string>): object {
        if (cols.includes(field)) {
            return {
                [field]: {
                    [Op.ne]: null,
                },
            };
        } else {
            return {};
        }
    }

    include<T extends typeof Model<any, any>>(
        includes: string,
        model: T
    ): object {
        const associations =(<any>model).getRelations()||[];
        associations.push("creator", "updator");
        let inclusions: Array<any> = includes.split(",");
        inclusions = inclusions.filter((i) =>
            associations.find((ass: string) => ass == i)
        );

        inclusions.forEach((incl, key) => {
            if (incl.includes(".")) {
                inclusions[key] = this.recursiveInclude(incl.split("."), 0);
            }
        });
        return {
            distinct: "id",
            include: inclusions,
        };
    }

    recursiveInclude(incl: Array<any>, level: number): any {
        if (level >= incl.length - 1) return {association: incl[level]};
        return {
            association: incl[level],
            include: this.recursiveInclude(incl, level + 1),
        };
    }

    order(cols: string[], field: string, desc?: boolean): object {
        desc = desc?.toString().toLowerCase() == "true";
        if (cols.includes(field)) {
            if (Boolean(desc)) {
                return {order: [[field, "DESC"]]};
            }
            return {order: [field]};
        }
        return {};
    }

    withTrashed(paranoid: boolean | string): object {
        return {
            paranoid: paranoid != "true" && paranoid != true,
        };
    }

    onlyTrashed(trashed: boolean | string): object {
        if (trashed == true || trashed == "true") {
            return {
                deletedAt: {
                    [Op.not]: null,
                },
            };
        }
        return {};
    }

    withScopes(scopes: string, modelScopes: Array<string>): Array<string> {
        return scopes.split(",").filter((scope) => modelScopes.includes(scope));
    }

    getPaginationProps(page: number, perpage: number, result: any): object {
        const lastPage = Math.ceil(result.count / perpage);

        return {
            ...result,
            lastPage,
            nextPage: page < lastPage ? Number(page) + 1 : null,
            prevPage: page > 1 ? Number(page) - 1 : null,
            currentPage: Number(page),
        };
    }

    getQuery<T extends Model<any, any>>(
        params: IParams,
        cols: Array<string>,
        model: ModelCtor<T>
    ): Record<string, any>  {
        const fields = Object.keys(model.getAttributes());

        cols.push("createdAt");
        cols.push("updatedAt");
        cols.push("id");
        const query: any = {
            ...(params.page && params.perpage
                ? this.paginate(params.perpage, params.page)
                : {}),

            ...(params.include ? this.include(params.include, model) : {}),
            ...(params.limit ? this.limit(params.limit) : {}),
            ...(params.fields ? this.fields(params.fields, fields) : {}),
            ...(params.order ? this.order(cols, params.order, params.desc) : {}),
            ...(params.withtrashed ? this.withTrashed(params.withtrashed) : {}),
            ...(params.onlytrashed ? this.withTrashed(String(params.onlytrashed) == "true") : {}),// Need to get data where deletedAt not null


        };
        const like: any = params.like ? this.isLike(params.like, cols) : null;
        const notLike: any = params.notlike ? this.isNotLike(params.notlike, cols) : null;
        const filter: any = params.filter ? this.filter(params.filter, cols) : {};
        if (like) {
            filter[this.operators[like.union]] = [
                ...(filter[this.operators[like.union]] || []),
                like.condition,
            ];
        }
        if (notLike) {
            filter[this.operators[notLike.union]] = [
                ...(filter[this.operators[notLike.union]] || []),
                notLike.condition,
            ];
        }
        const searchables = Object.entries(model.getAttributes())
            .filter(([key, value]) => {
                return !(value.type instanceof DataType.DATE)
                    && !(value.type instanceof DataType.DATEONLY)
                    && !(value.type instanceof DataType.VIRTUAL)
            }).map(([key]) => key);
        query.where = {
            ...(params.search ? this.search(params.search, searchables) : {}),
            [Op.and]: {

                ...(params.onlytrashed ? this.onlyTrashed(params.onlytrashed) : {}),
                ...filter,
                ...(params.isNull ? this.isNull(params.isNull, cols) : {}),
                ...(params.notNUll ? this.notNull(params.notNUll, cols) : {}),
            },
        };
        if (!params.limit && (!params.page || !params.perpage)) {
            query.limit = 1000;
        }
        return query;
    }

    async get<T extends Model>(
        model: ModelCtor<T>,
        params: IParams
    ): Promise<any> {
        const cols =( <any>model).getSearchables()||[];
        const args = this.getQuery(params, cols, model);
        model = this.loadScopes(model, params);
        return this.loadResults(model, params, args);
    }

    private loadScopes<T extends Model>(
        model: ModelCtor<T>,
        params: IParams
    ): ModelCtor<T> {
        const modelScopes = model.options.scopes;
        if (params.scopes && modelScopes) {
            const scopes = Object.keys(modelScopes);
            model = <ModelCtor<T>>(model.scope(this.withScopes(params.scopes, scopes)));
        }
        return model;
    }

    private async loadResults<T extends Model>(
        model: ModelCtor<T>,
        params: IParams,
        args: any
    ): Promise<any> {
        let result: any | any[] = [];
        const operationQuery = params.operation
        const [operation, column] = operationQuery?.split(':') || [];
        const field = column ? column.split(',') : [];
        switch (operation) {
            case "sum":
                if (field.length == 1) {
                    result = await model.sum(column, args)
                } else {
                    for (const f of field) {
                        const data = await model.sum(f, args);
                        (result as any[]).push(data as any)
                    }
                }
                break;
            case "max":
                if (field.length == 1) {
                    result = await model.max(column, args)
                } else {
                    for (const f of field) {
                        const data = await model.max(f, args);
                        (result as any[]).push(data as any)
                    }
                }
                break;
            case "min":
                if (field.length == 1) {
                    result = await model.min(column, args)
                } else {
                    for (const f of field) {
                        const data = await model.min(f, args);
                        (result as any[]).push(data as any)
                    }
                }
                break;
            case "count":
                result = await model.count(args);
                break;
            default :
                if (params.limit && params.limit == 1) {
                    result = await model.findOne(args);
                } else {
                    result = await model.findAndCountAll(args);
                }
                if (params.page && params.perpage && !params.limit) {
                    result = this.getPaginationProps(params.page, params.perpage, result);
                }
                break
        }
        return result;
    }

}

export default new Scope();
