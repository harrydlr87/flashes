import React from "react";
import ReactTable from "react-table";
import "react-table/react-table.css";
import { connect } from 'react-redux' ;

const getColumns = (user) => {

  const columns = [
    {
      Header: "Source Name",
      accessor: "source"
    },
    {
      Header: "Activity rate",
      id: "activityValue",
      accessor: ({ activityValue }) => activityValue && activityValue + '%',
    },
    {
      Header: "Plot",
      accessor: "plotIcon"
    },
    {
      className: 'sourceType',
      headerClassName: 'sourceType',
      Header: "Source Type",
      accessor: "src_type"
    },
    {
      Header: "Mission",
      accessor: "mission",
    },
    /*{
      Header: "BII",
      accessor: "BII"
    },
    {
      Header: "LII",
      accessor: "LII"
    },*/
  ];

  if(user) {
    columns.push({
      Header: "Actions",
      accessor: "actions"
    })
  }

  return columns;
};

const Table = ({
  user,
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
            columns={[{columns: getColumns(user)}]}
            defaultPageSize={10}
            className="-striped -highlight"
            onFetchData={onPageChang}
        />
    </div>
);

const mapStateToProps = (state) => ({
  user: state.application.user,
});

const enhance = connect(mapStateToProps);

export default enhance(Table);
