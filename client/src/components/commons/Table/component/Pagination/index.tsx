import React from 'react';
import { IPagination } from './interface';

interface IProps extends IPagination {
    handleChangePage: (pagination) => void;
}

const Pagination = (props: IProps) => {
    const { pageSize, current, total, handleChangePage } = props;
    const listPages = Array.from({ length: Math.ceil(total / pageSize) }, (_, i) => i + 1)
    const listPageSize = [ 10, 20, 50, 100 ];

    const handleClickPagination = page => {
        handleChangePage({
            pageSize,
            total,
            current: page,
        })
    }

    const handleChangePageSize = (e) => {
        handleChangePage({
            pageSize: e.target.value,
            total,
            current: 1,
        })
    }

    const checkPageToShow = (page, activePage, totalOfPage) => {
        if (
            page == 1 ||
            page == totalOfPage ||
            Math.abs(activePage - page) < 3
        ) {
            return true;
        } else {
            if (activePage < 3 || activePage > totalOfPage - 3) {
                if (Math.abs(activePage - page) < 3 + (activePage == 1 ? 2 : 1)) {
                    return true
                } else {
                    return false
                }
            }
        }
    }

    return (
        <div className="pagination">
            <div className="list-pages">
                <span
                    className={`page ${ current == 1 && 'disable' }`}
                    onClick={() => {
                        if (current == 1) return;
                        handleClickPagination(current - 1);
                    }}
                >
                    {'<'}
                </span>
                {
                    listPages.map(item => {
                        if (item == 2 && Math.abs(current - item) >= 3) {
                            return <div className="three-dots"></div>
                        }
                        if (checkPageToShow(item, current, listPages.length)) {
                            return <span
                                key={`page${ item }`}
                                className={`page ${ item == current && 'active-current-page' }`}
                                onClick={() => {
                                    if (item == current) return;
                                    handleClickPagination(item);
                                }}>
                                {item}
                            </span>
                        }
                        if (item == listPages.length - 1 && Math.abs(current - item) >= 3) {
                            return <div className="three-dots"></div>
                        }
                    })
                }
                <span
                    className={`page ${ current == listPages.length && 'disable' }`}
                    onClick={() => {
                        if (current == listPages.length) return;
                        handleClickPagination(current + 1);
                    }}
                >
                    {'>'}
                </span>
            </div>
            <div className="page-size">
                <select className='page-size-selection' onChange={handleChangePageSize}>
                    {
                        listPageSize.map(item => {
                            return <option className='page-size-option' value={item}>{item}/page</option>
                        })
                    }
                </select>
            </div>
        </div>
    )
}

export default React.memo(Pagination);