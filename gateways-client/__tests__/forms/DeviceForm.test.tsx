import * as React from "react";
import {render, screen} from '@testing-library/react';
import userEvent from '@testing-library/user-event'
import fetchMock from "jest-fetch-mock";

import {getBaseUrl} from "../../src/utils/CommonUtils";
import {DeviceForm} from "../../src/components/Forms/DeviceForm";

describe("DeviceForm tests", () => {

    function setUp(props: any = {
        onSaveCb: jest.fn(),
        selectedGateway: null,
    }) {
        return render(<DeviceForm {...props}/>)
    }

    beforeAll(() => {
        fetchMock.doMockIf(`${getBaseUrl()}/device/123`)
            .mockResponse(JSON.stringify({}));
    })

    it('Should return DeviceForm markup', function () {
        let {} = setUp()
        expect(screen.getByPlaceholderText('Vendor...')).toBeInTheDocument();
        expect(screen.getByText('Status:')).toBeInTheDocument();
        expect(screen.getByText('Save')).toBeInTheDocument();
    });


    it('Should validate form and send request when click save', async function () {
        const onSaveCb = jest.fn();
        let {} = setUp({onSaveCb: onSaveCb, selectedGateway: {serialNumber: 123}})
        await userEvent.type(screen.getByRole("textbox"), "testvendor");
        expect(screen.getByRole('textbox')).toHaveValue("testvendor");
        await userEvent.click(screen.getByRole('button'))
        expect(onSaveCb).toHaveBeenCalledTimes(1)
        // @ts-ignore
        expect(fetch.mock.calls.length).toEqual(1);
    });
})