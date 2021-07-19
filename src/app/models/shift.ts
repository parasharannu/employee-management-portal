export interface IShiftTime {
    first: string;
    second: string;
}

export interface IShiftMeal {
    first: string;
    second: string;
}

export interface IShift {
    name: string;
    noOfPositions: number;
    shiftTime: IShiftTime;
    mealTime?: IShiftMeal;
    rdos: any
    staggerRDO: string;
}
