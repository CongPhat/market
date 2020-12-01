import { IPagination } from './component/Pagination/interface';
export interface IColumn {
    key: string,
    title?: string,
    colSpan?: number,
    rowSpan?: number
    sort?: (a, b) => any;
    render?: (text, record, index) => any,
}

export const InitColumn: IColumn = {
    key: '',
}

export interface IFilter {
    [ key: string ]: string
}

export interface ITableProps {
    dataSource: Array<any>,
    columns: Array<IColumn>,
    pagination?: IPagination,
    filter?: IFilter | string,
    handleChangePage?: (pagination: IPagination, sorter: ISorter) => void;
}


// SORTER
export interface ISorter {
    column: IColumn | null,
    order: 'ascend' | 'descend' | null,
}

export const InitSorter: ISorter = {
    column: InitColumn,
    order: null,
}