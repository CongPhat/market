import Table from "@components/commons/Table";
import React, { useState } from "react";
import "../../style.scss";
const fakeData = [];

for (let index = 1; index <= 100; index++) {
    fakeData.push({
        key: index.toString(),
        name: Math.floor(Math.random() * 100) + 1,
        age: Math.floor(Math.random() * 100) + 1,
        address: "10 Downing Street",
    });
}

const BasicTable = (props) => {
    const [search, setSearch] = useState("");
    const [search2, setSearch2] = useState("");

    const columns = [
        {
            key: "name",
            title: "Name",
            sort: (a, b) => {
                return a.name - b.name;
            },
        },
        {
            key: "age",
            title: "Age",
            sort: (a, b) => {
                return a.age - b.age;
            },
        },
        {
            key: "address",
            title: "Address",
        },
        {
            key: "action",
            title: "Action",
            render: (record, text) => {
                return <button onClick={() => console.log(record, text)}>Edit</button>;
            },
        },
    ];

    return (
        <div className={"simple-table h-100"}>
            <input
                type="text"
                onChange={(e) => {
                    setSearch(e.target.value);
                }}
            />
            <input
                type="text"
                onChange={(e) => {
                    setSearch2(e.target.value);
                }}
            />
            <Table
                dataSource={fakeData}
                columns={columns}
                filter={{
                    name: search,
                    age: search2,
                }}
            />
        </div>
    );
};
export default BasicTable;
