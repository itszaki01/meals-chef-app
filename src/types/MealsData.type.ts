export type MealsDataType = {
    strMeal:string,
    strMealThumb:string,
    mealPictures:{
      mealPicture:string,
    }[],
    ingredients:{
      ingredient:string,
    }[],
    idMeal:string,
    price:number,
    isUpdated?:boolean,
    isNew?:boolean
}