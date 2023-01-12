import * as React from "react";
import {render, screen} from '@testing-library/react';
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
})