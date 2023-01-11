import React, {ReactElement} from "react";
import BootstrapTable, {SelectRowProps} from "react-bootstrap-table-next";

import {Gateway} from "../../entities/Gateway";

interface IProps {
    data: Gateway[],
    selectedGateway?: Gateway | null,
    onSelect: (gateway: Gateway) => void;
}

const columns = [
    {
        dataField: "serialNumber",
        text: "Serial Number",
    },
    {
        dataField: "name",
        text: "Name",
    },
    {
        dataField: "ipAddress",
        text: "IPv4 Address",
    },
];

export const GatewaysTable = React.memo((props: IProps): ReactElement => {

    const selectRow: SelectRowProps<Gateway> = {
        mode: "radio",
        clickToSelect: true,
        bgColor: '#adb5bd',
        hideSelectColumn: true,
        onSelect: props.onSelect,
        selected: [props.selectedGateway?.serialNumber || ""],
    }

    return (
            <BootstrapTable
                hover
                condensed
                noDataIndication="There are no Gateways."
                keyField="serialNumber"
                columns={columns}
                data={props.data}
                selectRow={selectRow}
            />
    );
});