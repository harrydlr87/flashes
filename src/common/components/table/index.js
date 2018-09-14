import React from "react";
import ReactTable from "react-table";
import "react-table/react-table.css";

const Table = ({ data }) => (
    <div>
        <ReactTable
            data={data}
            columns={[
                {
                    columns: [
                        {
                            Header: "Source Name",
                            accessor: "firstName"
                        },
                        {
                            Header: "Mission",
                            id: "lastName",
                        },
                        {
                            Header: "Coordinates",
                            accessor: "firstName"
                        },
                        {
                            Header: "Source Type",
                            accessor: "firstName"
                        },
                    ]
                },
            ]}
            defaultPageSize={10}
            className="-striped -highlight"
        />
    </div>
);

export default Table;
