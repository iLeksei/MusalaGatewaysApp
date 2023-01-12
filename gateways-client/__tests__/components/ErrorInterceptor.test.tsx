import * as React from "react";
// @ts-ignore
import {render, screen} from '@testing-library/react';
import fetchMock from "jest-fetch-mock";

import {getBaseUrl} from "../../src/utils/CommonUtils";
import {ErrorInterceptor} from "../../src/components/ErrorInterceptor";

describe("ErrorInterceptor tests", () => {

    beforeAll(() => {
        fetchMock.doMockIf(`${getBaseUrl()}/log-ui-error`).mockResponse("OK");
    })

    it('Should return ErrorInterceptor markup', function () {
        let {} = render(
            <ErrorInterceptor>
                <div>InterceptorTestChildren</div>
            </ErrorInterceptor>
        )
        expect(screen.getByText('InterceptorTestChildren')).toBeInTheDocument();
    });


    it('Should return Error message markup', async function () {
        const ErrorComponent = () => {
            throw new Error("test error")
            return <div>test</div>
        }
        const consoleError = console.error;
        console.error = () => {}
        render(
            <ErrorInterceptor>
                <ErrorComponent/>
            </ErrorInterceptor>
        )
        expect(screen.getByRole("alert")).toHaveTextContent("Something goes wrong :(" +
            " Please connect with administrator" +
            " or try to refresh page, Thank you!")
        // @ts-ignore
        expect(fetch.mock.calls.length).toEqual(1);
        console.error = consoleError;
    });
})