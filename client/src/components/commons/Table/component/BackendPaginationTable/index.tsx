import React, { useEffect, useState } from 'react';
import Table from "@components/commons/Table";
import { InitPagination, IPagination } from '../Pagination/interface';
import { useAsync } from 'src/services/hook';
import { IBEPaginationTable, InitOption, IOption } from './interface';

const BEPaginationTable = (props: IBEPaginationTable) => {
    let { apiServices, columns = [], register } = props;

    const { execute: getListData, value: listData, status } = useAsync(apiServices)
    const [ statePagination, setStatePagination ] = useState<IPagination>(InitPagination);
    const [ stateOption, setStateOption ] = useState<IOption>(InitOption);

    useEffect(() => {
        getDataWithCurrentState();
    }, [])

    const getDataWithCurrentState = (state?: { pagination?: IPagination, option?: IOption }) => {
        const currentState = {
            pagination: statePagination,
            option: stateOption,
        }

        let {
            pagination = statePagination,
            option = stateOption
        } = state || currentState;

        pagination = {
            current: pagination?.current || statePagination.current,
            pageSize: pagination?.pageSize || statePagination.pageSize,
            total: pagination?.total || statePagination.total,
        }

        let {
            search = stateOption.search,
            filter = stateOption.filter
        } = option;

        setStateOption({ search, filter });
        setStatePagination(pagination);
        getListData(pagination, search, filter)
            .then(res => {
                setStatePagination(res.info);
            })
    }

    const handleChangePage = (newPagination: IPagination, _sorter) => {
        getDataWithCurrentState({
            pagination: newPagination
        })
    }

    const getData = () => {
        return {
            data: listData?.data || [],
            ...statePagination,
            ...stateOption
        }
    }

    register.getData = getData;
    register.fetchData = getDataWithCurrentState;
    register.setOption = (value) => setStateOption(prev => ({ ...prev, ...value }));
    register.setPagination = (value) => setStatePagination(prev => ({ ...prev, ...value }));

    return (
        <div className="BE-pagination-table">
            <Table
                dataSource={listData?.data || []}
                columns={columns}
                pagination={statePagination}
                handleChangePage={handleChangePage}
            />
        </div>
    )
}

export default BEPaginationTable; 