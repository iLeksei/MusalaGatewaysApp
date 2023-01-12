import * as React from "react";
import {render} from '@testing-library/react';
import userEvent from '@testing-library/user-event'

import {GatewaysTable} from "../../src/components/GatewaysTable/GatewaysTable";

describe("GatewaysTable tests", () => {

    const defaultProps = {
        data: [{ serialNumber: 123, name: "test1", ipAddress: "1.1.1.1" }],
        selectedGateway: null,
        onSelect: jest.fn(),
    }

    function setUp(props = defaultProps) {
        return render(<GatewaysTable {...props}/>)
    }

    it('Should return gateways table markup', function () {
        let {getByText} = setUp()
        expect(getByText("Serial Number")).toBeInTheDocument();
        expect(getByText("Name")).toBeInTheDocument();
        expect(getByText("IPv4 Address")).toBeInTheDocument();
        expect(getByText("123")).toBeInTheDocument();
        expect(getByText("test1")).toBeInTheDocument();
        expect(getByText("1.1.1.1")).toBeInTheDocument();

        let component = setUp({...defaultProps, data: []})
        expect(component.getByText("There are no Gateways.")).toBeInTheDocument();
    });

    it('should call onSelect callback when select a row', async function () {
        const onSelectCb = jest.fn();
        let {getByText} = setUp({...defaultProps, onSelect: onSelectCb});

        await userEvent.click(getByText("test1"));
        await expect(onSelectCb).toHaveBeenCalledTimes(1);
    });
})