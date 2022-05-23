import { createStore, reconcile } from 'solid-js/store';
import {
    FormControl, FormControlRefs,
    FormError,
    FormOptions,
    FormValidatorsOption,
    RegisterOptions
} from '@root/src/lib/form/form.type';
import {
    Entries,
    getControlValue, resetForm,
    SetControlValue,
    validateControl,
    validateForm
} from '@root/src/lib/form/utils/utils';
import { CUSTOM_EVENT_NAME } from '@root/src/lib/form/utils/constants';

const customEvent = new CustomEvent(CUSTOM_EVENT_NAME);

export function createForm<Controls extends {}>(options: FormOptions<Controls> = {}) {
    const refs: FormControlRefs<Controls> = {};
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

    /**
     * Validate control if change
     */
    const onControlChange = <Name extends keyof Partial<Controls>, Value extends Controls[Name]>(
        value: Value,
        name: Name
    ) => {
        const errorMessage = validateControl(name, value, options.validators) as string;
        const clone = reconcile(errors);
        setErrors({...clone, [name]: errorMessage});
    };

    /**
     * Set error to control
     */
    const setError = <Name extends keyof Partial<Controls>>(
        control: Name,
        message: string,
    ) => {
        const clone = reconcile(errors);
        setErrors({...clone, [control]: message});
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
     * Reset value of registered control
     */
    const reset = () => resetForm(refs, setErrors);

    /**
     * @internal
     * Validate current controls
     */
    const _validate = (values: Controls) => validateForm(values, options.validators, setErrors);

    /**
     * Form submit wrapper with validation
     */
    const submit = (submitHandler: (controls: Controls) => void) => (e?: Event) => {
        e?.preventDefault();
        const onSubmit = options.onSubmit;
        const values = getValues();

        if (_validate(values)) {
            if (onSubmit) {
                onSubmit(values);
            }

            if (submitHandler) {
                submitHandler(values);
            }
        }
    };

    return {
        register,
        setValue,
        getValue,
        getValues,
        setError,
        submit,
        reset,
        errors,
        refs,
    };
}
