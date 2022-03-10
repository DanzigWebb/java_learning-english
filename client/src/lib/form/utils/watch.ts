import { onCleanup } from 'solid-js';
import { FormControl } from '@root/src/lib/form/form.type';
import { getControlValue } from '@root/src/lib/form/utils/utils';

/** @internal */
export const watchValue = <Values, Key extends keyof Values, Value extends Values[Key]>(
    controlRef: FormControl,
    onChange: (value: Value) => void,
    callImmediately: boolean,
) => {
    const listener = () => onChange(getControlValue(controlRef));

    if (callImmediately) {
        listener();
    }

    controlRef.addEventListener('input', listener);
    controlRef.addEventListener('set-manually', listener);
    onCleanup(() => {
        controlRef.removeEventListener('input', listener);
        controlRef.removeEventListener('set-manually', listener);
    });
};