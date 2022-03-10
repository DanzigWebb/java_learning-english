import { Component, JSXElement } from 'solid-js';
import { useSteps } from '@components/steps/Steps';

type Props = {
    label: JSXElement;
    index: number;
}

export const Step: Component<Props> = (props) => {

    const steps = useSteps();

    const isActive = () => {
        return props.index <= steps?.step()
    };

    return (
        <li
            class="step"
            classList={{
                'step-primary': isActive()
            }}
        >
            {props.label}
        </li>
    );
};