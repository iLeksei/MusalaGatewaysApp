import React, {ErrorInfo} from "react";
import {Alert} from "react-bootstrap";

import {getBaseUrl} from "../utils/CommonUtils";
import {COMMON_ERROR_MESSAGE} from "../constants";

export class ErrorInterceptor extends React.Component {
    state = {
        hasError: false,
    }

    static getDerivedStateFromError(error: any) {
        return { hasError: error };
    }

    componentDidCatch(error: Error, _info: ErrorInfo) {
        (async function() {
            const requestInit: RequestInit = {
                method: "POST",
                body: JSON.stringify(error.message),
            }
            await fetch(`${getBaseUrl()}/log-ui-error`, requestInit)
        })();
    }

    render() {
        if (this.state.hasError) {
            return <span><Alert variant="danger">{COMMON_ERROR_MESSAGE}</Alert></span>
        }

        return <>{this.props.children}</>;
    }
}