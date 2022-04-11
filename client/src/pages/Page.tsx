import { Component } from 'solid-js';

type Props = {
    full?: boolean;
}

export const Page: Component<Props> = (props) => {

    return (
        <div
            class="flex flex-col justify-start"
            classList={{
                'h-full': !!props.full
            }}
        >
            {props.children}
        </div>
    );
};
