import { Component, createEffect, createSignal, JSXElement } from 'solid-js';

type Props = {
    on: JSXElement;
    off: JSXElement;
    state: 'on' | 'off';
}

/**
 *
 * @example
 * <Swap
 *     on={<i class="fa-solid fa-sun text-4xl"/>}
 *     off={<i class="fa-solid fa-moon text-4xl"/>}
 * />
 */
export const Swap: Component<Props> = (props) => {
    const [state, setState] = createSignal(false);

    createEffect(() => {
        props.state === 'on'
            ? setState(true)
            : setState(false);
    });

    return (
        <label class="swap swap-rotate">

            <input type="checkbox" checked={state()}/>

            <span class="swap-on">
                {props.on}
            </span>
            <span class="swap-off">
                {props.off}
            </span>
        </label>
    );
};