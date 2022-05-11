import { Component } from 'solid-js';

type Props = {
    full?: boolean;
    class?: string;
}

export const Page: Component<Props> = (props) => {

    return (
        <div
            class={"flex flex-col justify-start" + ' ' + props.class || ''}
            classList={{
                'h-full': !!props.full
            }}
        >
            {props.children}
        </div>
    );
};
