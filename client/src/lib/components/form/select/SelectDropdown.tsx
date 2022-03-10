import { Component, createSignal, onMount } from 'solid-js';
import { SelectTypeEnum } from '@components/form/select/Select.type';

export const SelectDropdown: Component = (props) => {

    const [dropdown, setDropdown] = createSignal<HTMLElement>();

    onMount(() => {
        focusOption();
    });

    function focusOption() {
        const optionsRef = dropdown()?.querySelector(`.${SelectTypeEnum.OPTION_SELECTOR}`) as HTMLButtonElement;
        if (optionsRef) {
            optionsRef.focus();
        }
    }

    return (
        <div
            ref={setDropdown}
            class="p-2 shadow menu dropdown-content bg-base-200 max-h-60 overflow-y-scroll"
            tabIndex={0}
        >
            {props.children}
        </div>
    );
};