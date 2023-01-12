import * as React from "react";
import {render} from '@testing-library/react';
import userEvent from '@testing-library/user-event'

import {DevicesTable} from "../../src/components/DevicesTable/DevicesTable";

describe("DevicesTable tests", () => {

    const defaultProps: any = {
        data: [{ uid: 123, vendor: "test-vendor", createdAt: "11.01.2022", status: "ONLINE" }],
        selectedGateway: null,
        selectedDevice: null,
        onSelect: jest.fn(),
    }

    function setUp(props = defaultProps) {
        return render(<DevicesTable {...props}/>)
    }

    it('Should return devices table markup', function () {
        let {getByText} = setUp()

        expect(getByText("UID")).toBeInTheDocument();
        expect(getByText("Vendor")).toBeInTheDocument();
        expect(getByText("Date created")).toBeInTheDocument();
        expect(getByText("Status")).toBeInTheDocument();
        expect(getByText("123")).toBeInTheDocument();
        expect(getByText("test-vendor")).toBeInTheDocument();
        expect(getByText("11.01.2022")).toBeInTheDocument();
        expect(getByText("ONLINE")).toBeInTheDocument();

        let component = setUp({...defaultProps, data: []})
        expect(component.getByText("Please, select Gateway!")).toBeInTheDocument();

        let component2 = setUp({...defaultProps, data: [], selectedGateway: { name: "test-gateway"}})
        expect(component2.getByText('There are no Devices for Gateway: "test-gateway"')).toBeInTheDocument();

    });

    it('should call onSelect callback when select a row', async function () {
        const onSelectCb = jest.fn();
        let {getByText} = setUp({...defaultProps, onSelect: onSelectCb});

        await userEvent.click(getByText("test-vendor"));
        await expect(onSelectCb).toHaveBeenCalledTimes(1);
    });
})