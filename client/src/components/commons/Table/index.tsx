import React, { useEffect, useMemo, useState } from "react";
import { ITableProps, InitSorter, ISorter, IColumn } from "./interface";
import Pagination from "./component/Pagination";
import './style.scss';
import { InitPagination, IPagination } from "./component/Pagination/interface";

const Table = (props: ITableProps) => {
    const {
        dataSource = [],
        columns,
        pagination,
        filter = '',
        handleChangePage,
    } = props;
    const [dataToShow, setDataToShow] = useState([]);
    const [paginationState, setPaginationState] = useState<IPagination>({ ...InitPagination, total: props.dataSource.length });
    const [sorter, setSorter] = useState<ISorter>(InitSorter);
    const paginationToUse: IPagination = useMemo(() => {
        if (!pagination) return paginationState;
        return {
            pageSize: pagination.pageSize || paginationState.pageSize,
            current: pagination.current || paginationState.current,
            total: pagination.total || paginationState.total,
        }
    }, [pagination, paginationState])

    useEffect(() => {
        setDataToShow(dataSource)
    }, [dataSource])

    useEffect(() => {
        const newData = filterData(dataSource, filter);
        setDataToShow(newData);
        setPaginationToUse({ ...paginationToUse, total: newData.length, current: 1 });
        setSorter(InitSorter);
    }, [filter])

    const filterData = (_dataSource, _filter) => {
        const newData = [];
        if (typeof _filter == 'string' || typeof _filter == 'number') {
            _dataSource.forEach(dataItem => {
                const check = Object.keys(dataItem).some(key => {
                    return dataItem[key].toString().includes(_filter.toString());
                })

                if (check) {
                    newData.push(dataItem);
                }
            })
        } else if (typeof _filter == 'object') {
            _dataSource.forEach(dataItem => {
                const check = Object.keys(_filter).every(keyItem => {
                    const value = _filter[keyItem].toString();
                    return dataItem[keyItem].toString().includes(value);
                })

                if (check) {
                    newData.push(dataItem);
                }
            })
        }

        return newData;
    }

    const paginaData = (_dataToShow, _paginationToUse) => {
        const { pageSize, current, total } = _paginationToUse;
        const dataAfterPagina = _dataToShow.filter((item, index) => {
            return index >= (current - 1) * pageSize && index < (current - 1) * pageSize + pageSize
        })
        return dataAfterPagina;
    }

    const setPaginationToUse = (_pagination: IPagination) => {
        setPaginationState(_pagination);
        if (handleChangePage) {
            handleChangePage(_pagination, sorter);
        }
    }

    const sortData = (_dataSource: Array<any>, currentData: Array<any>, newColumn: IColumn, currentSorter: ISorter) => {
        if (!newColumn.sort) return;
        let dataAfterSort = [];
        let newSorter: ISorter = { ...InitSorter, column: newColumn };

        if (currentSorter.column.key == newColumn.key) {
            switch (currentSorter.order) {
                case 'ascend':
                    newSorter.order = 'descend';
                    dataAfterSort = currentData.reverse();
                    break;
                case 'descend':
                    newSorter.order = null;
                    dataAfterSort = filterData(_dataSource, filter);
                    break

                default:
                    newSorter.order = 'ascend';
                    dataAfterSort = currentData.sort(newColumn.sort);
                    break
            }
        } else {
            newSorter.order = 'ascend';
            dataAfterSort = currentData.sort(newColumn.sort);
        }

        return {
            newSorter,
            dataAfterSort
        }
    }

    const renderColumns = () => {
        return columns.map(column => {
            if (column?.colSpan == 0 || column?.rowSpan == 0) return;
            return <th
                colSpan={column?.colSpan}
                rowSpan={column?.rowSpan}
                key={column?.key}
                style={{ cursor: column?.sort ? 'pointer' : 'auto' }}
                className={`
                    column
                    ${sorter.column?.key == column?.key && sorter.order && 'active-header-sorter'}
                `}
                onClick={() => {
                    const { newSorter, dataAfterSort } = sortData([...dataSource], dataToShow, column, sorter);
                    setSorter(newSorter);
                    setDataToShow(dataAfterSort);
                    if (handleChangePage) {
                        handleChangePage(paginationToUse, newSorter);
                    }
                }}
            >
                <div style={{ display: 'flex', alignItems: 'center' }}>
                    <span className='column-content'>{column?.title}</span>
                    {
                        column?.sort && <span className="sorter-icon">
                            <span className={`triangle-up ${sorter.column?.key == column?.key && sorter.order == 'ascend' && 'active-sorter-icon'}`}></span>
                            <span className={`triangle-down ${sorter.column?.key == column?.key && sorter.order == 'descend' && 'active-sorter-icon'}`}></span>
                        </span>
                    }
                </div>
            </th>
        })
    }

    const renderData = () => {
        let dataAfterPagina;
        if (pagination?.current) {
            dataAfterPagina = dataSource;
        } else {
            dataAfterPagina = paginaData(dataToShow, paginationToUse);
        }
        return dataAfterPagina.map((item, index) => {
            return <tr key={item.key}>{
                columns.map((column) => {
                    let content;
                    let renderProps: any = {};
                    if (column.render) {
                        const renderValue = column.render(item[column.key] || null, item, index);
                        const { children, props: _renderProps } = renderValue;
                        if (children) {
                            content = children;
                        } else {
                            content = renderValue;
                        }
                        if (_renderProps) {
                            renderProps = {
                                colSpan: _renderProps.colSpan,
                                rowSpan: _renderProps.rowSpan,
                            }
                        }
                    } else {
                        content = item[column.key]
                    }
                    if (renderProps?.colSpan == 0 || renderProps?.rowSpan == 0) return;
                    return <td
                        {...renderProps}
                        className={`${column.key == sorter.column.key && sorter.order && 'active-column-sorter'}`}
                        key={item.key + column.key}
                    >
                        {content}
                    </td>
                })
            }</tr>
        })
    }

    return <div className="wrap-table">
        <table className="table">
            <thead className='table-header'>
                <tr>
                    {renderColumns()}
                </tr>
            </thead>
            <tbody className='table-body'>
                {renderData()}
            </tbody>
        </table>
        <Pagination
            {...paginationToUse}
            handleChangePage={setPaginationToUse}
        />
    </div>

}

export default Table;