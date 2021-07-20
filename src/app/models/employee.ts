import { IShift } from "./shift";

export interface IEmployee {
    idCode: string;
    empName: string;
    displayName: string;
    port: number;
    workUnit: string;
    workSite: string;
    unitSize: string;
    activeFrom: string;
    activeThrough: string;
    description: string;
    workLocation: string;
    skills: string[];
    additionalSkill: string;
    empShift: IShift[];
    flexCapable: string;
}
