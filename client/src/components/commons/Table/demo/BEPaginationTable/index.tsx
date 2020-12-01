import React from 'react';
import BEPaginationTable from '../../component/BackendPaginationTable';
import useTable from '../../component/BackendPaginationTable/hook';
import { getListUsers } from '../../component/BackendPaginationTable/services';

const BEPaginationTableDemo = (props) => {
    const table = useTable();

    const columns = [
        {
            title: 'user',
            key: 'userName',
        },
        {
            title: 'Email',
            key: 'userEmail',
        },
        {
            title: 'Update at',
            key: 'updatedAt',
        },
    ];


    return (
        <>
            <button onClick={() => console.log(table?.getData())}>Get data</button>
            <button onClick={() => table?.fetchData()}>Fetch Data</button>
            <input type="text"
                onChange={(e) => {
                    table?.fetchData({
                        option: { search: e.target.value },
                        pagination: { current: 1 }
                    })
                }} />
            <BEPaginationTable
                apiServices={getListUsers}
                columns={columns}
                register={table}
            />
        </>
    )
}

export default BEPaginationTableDemo;