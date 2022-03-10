import { Component } from 'solid-js';

export const FormField: Component = (props) => {

    return (
        <div class="form-control relative mb-2">
            {props.children}
        </div>
    )
}