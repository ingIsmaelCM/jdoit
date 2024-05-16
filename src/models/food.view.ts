import { BelongsTo, Column, DataType, ForeignKey, Table } from "sequelize-typescript";
import FoodModel, { IFood } from "@/models/food.model";
import MeasureModel from "@/models/measure.model";

export  interface  IFoodView extends IFood{
  cant: number;
  measure: string;
  sigla: string;
  calories: number;
  proteins: number;
  carbohidrates: number;
  fat: number;
  cholesterol: number;
  measureId: string;
  categoryName: string;
}

@Table({
  tableName: "foodview",
  paranoid: true,
  indexes:[]
})

export  default  class  FoodView extends  FoodModel implements IFoodView{
  @Column({
    type: DataType.DECIMAL(6, 2),
    allowNull: false
  })
  cant: number;

  @Column({
    type: DataType.DECIMAL(6, 2),
    allowNull: false,
    defaultValue: 0
  })
  calories: number;

  @Column({
    type: DataType.DECIMAL(6, 2),
    allowNull: false,
    defaultValue: 0
  })
  proteins: number;


  @Column({
    type: DataType.DECIMAL(6, 2),
    allowNull: false,
    defaultValue: 0
  })
  carbohidrates: number;


  @Column({
    type: DataType.DECIMAL(6, 2),
    allowNull: false,
    defaultValue: 0
  })
  fat: number;

  @Column({
    type: DataType.DECIMAL(6, 2),
    allowNull: false,
    defaultValue: 0
  })
  cholesterol: number;

  @Column({
    type: DataType.STRING(75),
    allowNull: false
  })
  measureId: string;


  @Column({
    type: DataType.STRING(75),
    allowNull: false
  })
  categoryName: string;

  @Column({
    type: DataType.STRING(50),
    allowNull: false
  })
  measure: string;

  @Column({
    type: DataType.STRING(10),
    allowNull: false
  })
  sigla: string;


  static  getSearchables():Array<keyof IFoodView>{
    return [...FoodModel.getSearchables(), "calories","carbohidrates",
      "cholesterol","categoryName","categoryId" ]
  }

  static getRelations():Array<string>{
    return []
  }

}