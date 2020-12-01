export interface IBEPaginationTable {
    apiServices: Function;
    columns: Array<any>;
    register?: any;
}

export interface IOption {
    search?: string;
    filter?: Object;
}

export const InitOption: IOption = {
    search: '',
    filter: {},
}