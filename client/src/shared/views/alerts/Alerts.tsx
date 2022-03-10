import { Component, createEffect, createSignal, For } from 'solid-js';
import { Alert, AlertType } from '@components/alert/Alert';

export type AlertProp = {
    type: AlertType;
    message: string;
    timeout?: number;
}

type Props = {
    alerts: AlertProp[];
}

export const Alerts: Component<Props> = (props) => {

    const [list, setList] = createSignal<AlertProp[]>([]);

    createEffect(() => {
        setList(props.alerts);
    });

    function destroyAlert(alert: AlertProp) {
        setList(list().filter(a => a !== alert));
    }

    return (
        <For each={list()}>
            {alert => (
                <Alert
                    show={true}
                    type={alert.type}
                    timeout={alert.timeout || 5000}
                    onClose={() => destroyAlert(alert)}
                >
                    {alert.message}
                </Alert>
            )}
        </For>
    );
};