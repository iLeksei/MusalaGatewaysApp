import React, {ReactElement, useCallback, useEffect, useState} from "react";

import {GatewaysTable} from "../../components/GatewaysTable/GatewaysTable";
import {TableCaption} from "../../components/TableCaption/TableCaption";
import {DevicesTable} from "../../components/DevicesTable/DevicesTable";
import {FormModal} from "../../components/FormModal/FormModal";
import {Gateway} from "../../entities/Gateway";
import {Device} from "../../entities/Device";
import {useModalState} from "../../hooks/useModalState";
import {GatewayForm} from "../../components/Forms/GatewayForm";
import {DeviceForm} from "../../components/Forms/DeviceForm";
import {getBaseUrl} from "../../utils/CommonUtils";
import {ErrorInterceptor} from "../../components/ErrorInterceptor";

import "./styles.scss"


const MAX_DEVICES_AMOUNT: number = 10;

export const MainPage = (): ReactElement => {
    const [gateways, setGateways] = useState<Gateway[]>([]);
    const [devices, setDevices] = useState<Device[]>([]);
    const [selectedGateway, selectGateway] = useState<Gateway | null>(null);
    const [selectedDevice, selectDevice] = useState<Device | null>();
    const [isOpenGatewayForm, toggleGatewayForm] = useModalState();
    const [isOpenDeviceForm, toggleDeviceForm] = useModalState();

    useEffect(() => {
        const abortController = new AbortController();
        (async function onMount() {
            const result: Gateway[] | undefined = await fetchGateways(abortController.signal);
            setGateways(result || []);
        })()
        return () => abortController.abort();
    }, [])

    const selectGatewayCb = useCallback((gateway: Gateway) => {
        selectGateway(gateway);
        selectDevice(null);
        fetchDevices(gateway);
    }, []);

    const selectDeviceCb = useCallback((device: Device) => {
        selectDevice(device);
    }, [])

    const onSaveDeviceCb = () => {
        toggleDeviceForm();
        fetchDevices(selectedGateway);
    }

    const onSaveGatewayCb = async () => {
        toggleGatewayForm();
        const result = await fetchGateways();
        setGateways(result || []);
    }

    const deleteGateway = async () => {
        try {
            const url = `${getBaseUrl()}/gateway/${selectedGateway?.serialNumber}`;
            const response = await fetch(url, {method: "DELETE"});
            if (response.ok) {
                setGateways(prevState => prevState.filter(
                    (el) => el.serialNumber !== selectedGateway?.serialNumber));
                selectGateway(null);
                setDevices([]);
            }
        } catch (err: any) {
            console.error(err.stack);
        }
    }

    const fetchGateways = async (signal?: AbortSignal): Promise<Gateway[] | undefined> => {
        try {
            const response = await fetch(`${getBaseUrl()}/gateways`, {signal});
            return await response.json();
        } catch (err: any) {
            console.error(err.stack);
        }
    }

    const fetchDevices = async (gateway: Gateway | null) => {
        try {
            const url = `${getBaseUrl()}/devices/${gateway?.serialNumber}`;
            const response = await fetch(url);
            const result = await response.json();
            if (Array.isArray(result)) setDevices(result);
        } catch (err: any) {
            console.error(err.stack);
        }
    }

    const deleteDevice = async () => {
        try {
            const url = `${getBaseUrl()}/device/${selectedDevice?.uid}`;
            const response = await fetch(url, {method: "DELETE"});
            if (response.ok) {
                setDevices(prevState => prevState.filter((el) => el.uid !== selectedDevice?.uid));
                selectDevice(null);
            }
        } catch (err: any) {
            console.error(err.stack);
        }
    }

    return (
        <main className="main-page__container">
            <ErrorInterceptor>
                <section>
                    <TableCaption
                        caption="Gateways:"
                        onAddClick={toggleGatewayForm}
                        onDeleteClick={deleteGateway}
                        isAddDisabled={false}
                        isDeleteDisabled={!selectedGateway}
                    />
                    <GatewaysTable
                        data={gateways}
                        selectedGateway={selectedGateway}
                        onSelect={selectGatewayCb}
                    />
                </section>
                <section>
                    <TableCaption
                        caption="Devices:"
                        onAddClick={toggleDeviceForm}
                        onDeleteClick={deleteDevice}
                        isAddDisabled={!selectedGateway || devices.length >= MAX_DEVICES_AMOUNT}
                        isDeleteDisabled={!selectedGateway || !selectedDevice}
                    />
                    <DevicesTable
                        data={devices}
                        selectedGateway={selectedGateway}
                        selectedDevice={selectedDevice}
                        onSelect={selectDeviceCb}
                    />
                </section>
                <FormModal
                    title="Add new Gateway Form:"
                    show={isOpenGatewayForm}
                    onClose={toggleGatewayForm}
                >
                    <GatewayForm onSaveCb={onSaveGatewayCb}/>
                </FormModal>
                <FormModal
                    title="Add new Device Form:"
                    show={isOpenDeviceForm}
                    onClose={toggleDeviceForm}
                >
                    <DeviceForm onSaveCb={onSaveDeviceCb} selectedGateway={selectedGateway}/>
                </FormModal>
            </ErrorInterceptor>
        </main>
    );
}