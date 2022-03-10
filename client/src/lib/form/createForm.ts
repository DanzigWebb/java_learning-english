import { createStore, reconcile } from 'solid-js/store';
import {
    FormControl,
    FormError,
    FormOptions,
    FormValidatorsOption,
    RegisterOptions
} from '@root/src/lib/form/form.type';
import {
    Entries,
    getControlValue,
    SetControlValue,
    validateControl,
    validateForm
} from '@root/src/lib/form/utils/utils';
import { CUSTOM_EVENT_NAME } from '@root/src/lib/form/utils/constants';

const customEvent = new CustomEvent(CUSTOM_EVENT_NAME);

export function createForm<Controls extends {}>(options: FormOptions<Controls> = {}) {
    const refs: { [key in keyof Controls]?: FormControl } = {};
    const [errors, setErrors] = createStore<FormError<Controls>>({});

    /**
     * Get all values of control
     */
    const getValues = (): Controls => {
        const controls: Partial<Controls> = {};
        Entries(refs).forEach(([name, controlRef]) => (
            controls[name] = controlRef
                ? getControlValue(controlRef!)
                : ''
        ));
        return controls as Controls;
    };

    /**
     * Registration control
     */
    const register = <Name extends keyof Partial<Controls>, Value extends Controls[Name]>(
        name: Name,
        registerOptions: RegisterOptions<Controls> = {}
    ) => {

        /**
         * Init validators for control
         */
        if (registerOptions.validators) {
            if (options.validators) {
                options.validators[name] = registerOptions.validators;
            } else {
                options.validators = {} as FormValidatorsOption<Controls>;
                options.validators[name] = registerOptions.validators;
            }
        }

        return {
            ref: (ref: FormControl) => {
                const controlRef = (refs[name] = ref);

                /**
                 * Set default value to control with init register props
                 */
                const {defaultValues} = options;
                if (defaultValues && defaultValues[name]) {
                    setValue(name, defaultValues[name]!);
                }

                return controlRef;
            },
            onInput: (e: Event) => {
                const value = (e.target as FormControl).value;
                // @ts-ignore
                onControlChange(value, name);
            },
            name
        };
    };

    const onControlChange = <Name extends keyof Partial<Controls>, Value extends Controls[Name]>(
        value: Value,
        name: Name
    ) => {
        const errorMessage = validateControl(name, value, options.validators) as string;
        const state = {...errors, [name]: errorMessage};
        setErrors(reconcile(state));
    };

    /**
     * Set error to control
     */
    const setError = <Name extends keyof Partial<Controls>>(
        control: Name,
        message: string,
    ) => {
        setErrors({...errors, [control]: message});
    };

    /**
     * Set new value to registered control
     */
    const setValue = <Name extends keyof Controls, Value extends Controls[Name]>(
        name: Name,
        value: Value,
    ) => SetControlValue(refs[name]!, value, customEvent);

    /**
     * Get value of registered control
     */
    const getValue = <Name extends keyof Controls, Value extends Controls[Name]>(
        name: Name
    ) => getControlValue(refs[name]!);

    /**
     * @internal
     * Validate current controls
     */
    const _validate = (values: Controls) => validateForm(values, options.validators, setErrors);

    /**
     * Form submit wrapper with validation
     */
    const submit = (e?: Event) => {
        e?.preventDefault();
        const onSubmit = options.onSubmit;
        const values = getValues();

        if (_validate(values) && onSubmit) {
            onSubmit(values);
        }
    };

    return {
        register,
        setValue,
        getValue,
        setError,
        submit,
        errors,
    };
}