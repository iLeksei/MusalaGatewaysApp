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
            expect(screen.getByText("Musala Gateways Application")).toBeInTheDocument();
            expect(screen.getByText('Gateways:')).toBeInTheDocument();
            expect(screen.getByText('Devices:')).toBeInTheDocument();
            expect(screen.getByText('Please, select Gateway!')).toBeInTheDocument();

            expect(screen.getAllByText('Add')).toHaveLength(2);
            expect(screen.getAllByText('Delete')).toHaveLength(2);
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
})