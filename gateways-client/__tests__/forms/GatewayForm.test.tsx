import * as React from "react";
// @ts-ignore
import {render, screen, waitFor} from '@testing-library/react';
import userEvent from '@testing-library/user-event'
import fetchMock from "jest-fetch-mock";

import {getBaseUrl} from "../../src/utils/CommonUtils";
import {GatewayForm} from "../../src/components/Forms/GatewayForm";

describe("GatewayForm tests", () => {

    function setUp(props: any = { onSaveCb: jest.fn() }) {
        return render(<GatewayForm {...props}/>)
    }

    beforeAll(() => {
        fetchMock.doMockIf(`${getBaseUrl()}/gateway`)
            .mockResponse(JSON.stringify({}));
    })

    it('Should return GatewayForm markup', function () {
        let {} = setUp()
        expect(screen.getByPlaceholderText('Gateway name...')).toBeInTheDocument();
        expect(screen.getByPlaceholderText('xxx.xxx.xxx.xxx')).toBeInTheDocument();
        expect(screen.getByText('Save')).toBeInTheDocument();
    });


    it('Should validate Gateway form and send request when click save', async function () {
        const onSaveCb = jest.fn();
        let {} = setUp({onSaveCb: onSaveCb})
        await userEvent.type(screen.getAllByRole("textbox")[0], "gatewayTestName");
        await userEvent.type(screen.getAllByRole("textbox")[1], "1.1.1.1");
        expect(screen.getAllByRole("textbox")[0]).toHaveValue("gatewayTestName");
        expect(screen.getAllByRole("textbox")[1]).toHaveValue("1.1.1.1");
        await userEvent.click(screen.getByRole('button'))
        expect(onSaveCb).toHaveBeenCalledTimes(1)
        // @ts-ignore
        expect(fetch.mock.calls.length).toEqual(1);
    });

    it('Should send request and get Device violations', async function () {
        const onSaveCb = jest.fn();
        fetchMock.resetMocks();
        fetchMock.doMockIf(`${getBaseUrl()}/gateway`)
            .mockResponse(JSON.stringify({"Gateway": "Test violation"}), {status: 403});
        let {} = setUp({onSaveCb: onSaveCb})
        await userEvent.type(screen.getAllByRole("textbox")[0], "gatewayTestName");
        await userEvent.type(screen.getAllByRole("textbox")[1], "1.1.1.1");
        await userEvent.click(screen.getByRole('button'))
        // @ts-ignore
        expect(fetch.mock.calls.length).toEqual(1);
        await waitFor(() => {
            expect(screen.getByText("Test violation")).toBeInTheDocument()
        })
    });
})