export interface IPagination {
    pageSize?: number,
    total?: number,
    current?: number,
}

export const InitPagination: IPagination = {
    pageSize: 10,
    total: 0,
    current: 1,
}
