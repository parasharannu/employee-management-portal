export interface IShift {
    name: string;
    noOfPositions: number;
    shiftTimes: string[2];
    mealTimes?: string[2];
    rdos: boolean[];
    staggerRDO: string;
}
