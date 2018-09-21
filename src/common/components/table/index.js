import React from "react";
import ReactTable from "react-table";
import "react-table/react-table.css";

const Table = ({
  data,
  pages,
  onPageChang,
  className,
}) => (
    <div className={className}>
        <ReactTable
            pages={pages}
            data={data}
            manual
            columns={[
                {
                    columns: [
                        {
                            Header: "Source Name",
                            accessor: "source"
                        },
                        {
                            Header: "Plot",
                            accessor: "plotIcon"
                        },
                        {
                            Header: "Source Type",
                            accessor: "src_type"
                        },
                        {
                            Header: "Mission",
                            accessor: "tool_name",
                        },
                        {
                            Header: "BII",
                            accessor: "BII"
                        },
                        {
                            Header: "LII",
                            accessor: "LII"
                        },

                    ]
                },
            ]}
            defaultPageSize={10}
            className="-striped -highlight"
            onFetchData={onPageChang}
        />
    </div>
);

export default Table;
