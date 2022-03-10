import { Accessor, Component, createContext, createSignal, onCleanup, Show, useContext } from 'solid-js';
import { Portal } from 'solid-js/web';
import usePopper from '@root/src/lib/popper/usePopper';
import { SelectDropdown } from '@components/form/select/SelectDropdown';

type ContextType = {
    value: Accessor<string>
    setValue: (v: string) => void;
}

const SelectContext = createContext<ContextType>();

type Props = {
    placeholder?: string;
}

export const Select: Component<Props> = (props) => {

    const [value, setValue] = createSignal('');
    const [show, setShow] = createSignal(false);

    const [reference, setReference] = createSignal<HTMLElement>();
    const [popper, setPopper] = createSignal<HTMLElement>();

    const instance = usePopper(reference, popper, {
        modifiers: [{
            name: 'offset',
            options: {
                offset: [0, 8],
            },
        }]
    });

    onCleanup(() => {
        instance()?.destroy();
    });

    function showDropdown() {
        setShow(true);
    }

    function destroyDropdown() {
        setShow(false);
    }

    const store: ContextType = {
        value,
        setValue
    };

    return (
        <SelectContext.Provider value={store}>
            <input
                ref={setReference}
                class="select select-bordered"
                value={value()}
                placeholder={props.placeholder || ''}
                onClick={showDropdown}
                onFocus={showDropdown}
            />

            <Show when={show()}>
                <Portal>
                    <div class="overlay" onClick={() => destroyDropdown()}>
                        <div ref={setPopper} style={{'min-width': reference()?.scrollWidth + 'px'}}>
                            <SelectDropdown>
                                {props.children}
                            </SelectDropdown>
                        </div>
                    </div>
                </Portal>
            </Show>
        </SelectContext.Provider>
    );
};

export const useSelect = () => useContext(SelectContext)!;