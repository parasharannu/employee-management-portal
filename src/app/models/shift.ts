export interface IShiftTime {
    first: string;
    second: string;
}

export interface IShiftMeal {
    first: string;
    second: string;
}

export interface IRDOS {
    name: string;
    value: string;
}

export interface IShift {
    name: string;
    noOfPositions: number;
    shiftTime: IShiftTime;
    mealTime?: IShiftMeal;
    rdos: IRDOS[];
    staggerRDO: string;
}
