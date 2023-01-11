import React, {ReactElement, useMemo} from "react";
import BootstrapTable, {SelectRowProps} from "react-bootstrap-table-next";

import {Device} from "../../entities/Device";
import {Gateway} from "../../entities/Gateway";


interface IProps {
    data: Device[],
    selectedGateway?: Gateway | null,
    selectedDevice?: Device | null,
    onSelect: (device: Device) => void;
}

const columns = [
    {
        dataField: "uid",
        text: "UID",
    },
    {
        dataField: "vendor",
        text: "Vendor",
        align: 'center',
        headerAlign: 'center',
    },
    {
        dataField: "createdAt",
        text: "Date created",
        align: 'center',
        headerAlign: 'center',
    },
    {
        dataField: "status",
        text: "Status",
        align: 'center',
        headerAlign: 'center',
    }
]

export const DevicesTable = React.memo((props: IProps): ReactElement => {

    const noDataText = useMemo(() => {
        if (props.selectedGateway && !props.data?.length) {
            return `There are no Devices for Gateway: "${props.selectedGateway?.name}"`;
        }

        if (!props.selectedGateway) {
            return "Please, select Gateway!"
        }

        return "";
    }, [props.data, props.selectedGateway])

    const selectRow: SelectRowProps<Device> = {
        mode: "radio",
        clickToSelect: true,
        bgColor: '#c8cfd4',
        hideSelectColumn: true,
        onSelect: props.onSelect,
        selected: [props.selectedDevice?.uid || ""],
    }

    return (
        <BootstrapTable
            hover
            striped
            condensed
            noDataIndication={noDataText}
            keyField="uid"
            data={props.data || []}
            columns={columns}
            selectRow={selectRow}
        />
    );
});