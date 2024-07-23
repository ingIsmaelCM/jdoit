import { IFoodView } from "@/models/food.view";
import { Injectable } from "@nestjs/common";

export interface IDiet {
  proteins: number;
  carbohidrates: number;
  fat: number;
  maxFoods: number;
  iterations?: number;
}

@Injectable()
export default class PlanSuggestion {
  async getDiet(nutrients: IDiet, foods: Partial<IFoodView>[]) {
    return generateSuggestionForDiet(nutrients, foods);
  }
}

function generateSuggestionForDiet(nutrients: IDiet, foods: Partial<IFoodView>[], retries = 0) {
  let bestCombination = [];
  let bestDifference = Infinity;
  const { proteins, carbohidrates, fat, maxFoods, iterations = 1000 } = nutrients;
  for (let i = 0; i < iterations; i++) {
    // Generar una combinación aleatoria de alimentos
    const currentCombination = [];
    let currentProteins = 0;
    let currentCarbohidrates = 0;
    let currentFat = 0;

    for (let j = 0; j < maxFoods; j++) {
      const randomIndex = Math.floor(Math.random() * foods.length);
      const food = foods[randomIndex];
      const portion = getRandomPortion();
      currentCombination.push({ ...food, portion });
      currentProteins += food.proteins * portion;
      currentCarbohidrates += food.carbohidrates * portion;
      currentFat += food.fat * portion;
    }

    // Calcular la diferencia total de nutrientes
    const totalDiff = calculateDifference(currentProteins, currentCarbohidrates, currentFat, nutrients);

    // Verificar si esta combinación es mejor que la mejor encontrada hasta ahora
    if (totalDiff < bestDifference) {
      bestDifference = totalDiff;
      bestCombination = currentCombination;
      foods = foods.filter((f: any) => currentCombination.every((c: any) =>
        c.id !== f.id && c.name[0] !== f.name[0] && (maxFoods > 3 ||
          foods.length < 500 || f.categoryName !== c.categoryName)));
    }
  }
  //Hace hasta tres intentos para no devolver un resultado vacío
  if (bestCombination.length === 0 && retries < 10) {
    return generateSuggestionForDiet({
      proteins, carbohidrates, fat, maxFoods,
      iterations: iterations * 2
    }, foods, retries + 1);
  }

  return bestCombination;
}

function calculateDifference(currentProteins: number, currentCarbohidrates: number, currentFat: number, nutrients: IDiet) {
  const { proteins, carbohidrates, fat } = nutrients;
  const proteinDiff = currentProteins > proteins ? Infinity : proteins - currentProteins;
  const carbohidrateDiff = currentCarbohidrates > carbohidrates ? Infinity : carbohidrates - currentCarbohidrates;
  const fatDiff = currentFat > fat ? Infinity : fat - currentFat;
  //Asegura que la diferencia entre los nutrientes obtenidos y los esperados no sea mayor a 5
  if (proteinDiff > 5 || carbohidrateDiff > 5 || fatDiff > 5) {
    return Infinity;
  }

  return proteinDiff + carbohidrateDiff + fatDiff;
}

function getRandomPortion() {
  return Number((Math.random() * (2.5 - 0.5) + 0.5).toFixed(1));
}


