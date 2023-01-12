import * as React from "react";
import {render, screen, waitFor} from '@testing-library/react';
import userEvent from '@testing-library/user-event'
import fetchMock from "jest-fetch-mock";

import {MainPage} from "../../src/pages/MainPage/MainPage";
import {getBaseUrl} from "../../src/utils/CommonUtils";

describe("MainPage tests", () => {

    function setUp(props = {}) {
        return render(<MainPage {...props}/>)
    }

    beforeEach(() => {
        fetchMock.doMockIf(`${getBaseUrl()}/gateways`)
            .mockResponse(JSON.stringify([{serialNumber: 123, name: "gateway1", ipAddress: "1.1.1.1"}]));

    })

    it('Should return ManePage markup', async function () {
        let {} = setUp()

        await waitFor(() => {
            expect(screen.getByText('gateway1')).toBeInTheDocument();
            expect(screen.getByText('123')).toBeInTheDocument();
            expect(screen.getByText('1.1.1.1')).toBeInTheDocument();
            screen.debug();
            expect(screen.getByText("Musala Gateways Application")).toBeInTheDocument();
            expect(screen.getByText('Gateways:')).toBeInTheDocument();
            expect(screen.getByText('Devices:')).toBeInTheDocument();
            expect(screen.getByText('Please, select Gateway!')).toBeInTheDocument();

            expect(screen.getAllByText('Add')).toHaveLength(2);
            expect(screen.getAllByText('Delete')).toHaveLength(2);
        })
    });

    it('When Devices amount equals to 10, Add device button is disabled', async function () {
        let devices = new Array(10).fill(null)
            .map((el, idx) => ({
                uid: "11" + idx,
                vendor: "test-vendor",
                createdAt: "01.01.2022",
                status: "ONLINE"
            }))
        fetchMock.doMockIf(`${getBaseUrl()}/devices/123`).mockResponse(JSON.stringify(devices));
        let {} = setUp()

        await waitFor(async () => {
            expect(screen.getByText('gateway1')).toBeInTheDocument();
            await userEvent.click(screen.getByText("gateway1"));
            expect(screen.getAllByText("test-vendor")).toHaveLength(10);
            expect(screen.getAllByText("Delete")[1]).toBeDisabled();
        })

    });

    it('Should fetch Devices when select Gateway', async function () {
        let {} = setUp()
        fetchMock.doMockIf(`${getBaseUrl()}/devices/123`).mockResponse(JSON.stringify([{
            uid: 456,
            vendor: "test-vendor",
            createdAt: "01.01.2022",
            status: "ONLINE"
        }]));

        await waitFor(async () => {
            expect(screen.getByText('gateway1')).toBeInTheDocument();
            await userEvent.click(screen.getByText("gateway1"));
            expect(screen.getByText("test-vendor")).toBeInTheDocument();
        })
    });

    //todo
    it('Should call request for deleting Device', function () {

    });

    //todo
    it('Should call request for deleting Gateway', async function () {
        let {} = setUp()
        fetchMock.doMockIf(`${getBaseUrl()}/devices/123`).mockResponse(JSON.stringify([]));
        const deleteRequestMock = fetchMock.doMockIf(`${getBaseUrl()}/gateway/123`)
            .mockResponse("OK");

        await waitFor(async () => {
            expect(screen.getByText('gateway1')).toBeInTheDocument();

            await userEvent.click(screen.getByText("gateway1"));
            await userEvent.click(screen.getAllByText("Delete")[0]);
            expect(deleteRequestMock).toHaveBeenCalledTimes(1);
        })
    });
})