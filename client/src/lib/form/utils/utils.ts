import { FormControl, FormError, FormValidatorsOption } from '@root/src/lib/form/form.type';
import { reconcile, SetStoreFunction } from 'solid-js/store';

/**
 * @internal
 * Object.entries with true types
 */
export const Entries = <T extends {}>(obj: T): [keyof T, T[keyof T]][] => {
    return Object.entries(obj) as [keyof T, T[keyof T]][];
};

/**
 * @internal
 * Set value to html control
 */
export const SetControlValue = (control: FormControl, value: any, event: Event) => {
    switch (control.type) {
        case 'checkbox':
            (control as HTMLInputElement).checked = Boolean(value);
            break;
        default:
            control.value = value;
    }
    control.dispatchEvent(event);
};

/**
 * @internal
 * Parse value from html control
 */
export const getControlValue = (input: FormControl): any => {
    switch (input.type) {
        case 'number':
            return Number(input.value);
        case 'checkbox':
            return Boolean(input.value);
        default:
            return input.value;
    }
};

/**
 * @internal
 * Validate controls by validators
 * and update errors store
 */
export const validateForm = <Controls>(
    controls: Controls,
    validators: FormValidatorsOption<Controls | undefined>,
    setError: SetStoreFunction<FormError<Controls>>
) => {
    const validationErrors: any = {};

    if (!validators) {
        return true;
    }

    /**
     * Validate all controls
     */
    Entries(controls).forEach(([name, value]) => {
        const error = validateControl(name, value, validators);
        if (error) {
            validationErrors[name] = error;
        } else {
            delete validationErrors[name];
        }
    });

    setError(reconcile(validationErrors));
    return Object.keys(validationErrors).length === 0;
};


/**
 * @internal
 * Validate control by validators
 */
export const validateControl = <Controls extends {}, Name extends keyof Partial<Controls>, Value extends Controls[Name]>(
    controlName: Name,
    controlValue: Value,
    validatorOptions: FormValidatorsOption<Controls | undefined>,
): string | void => {

    if (!validatorOptions) {
        return;
    }

    const validators = validatorOptions[controlName];
    if (Array.isArray(validators)) {
        for (let i = 0; i < validators.length; i++) {
            const validatorCallback = validators[i];
            const error = validatorCallback(controlValue);
            if (error) {
                return error;
            }
        }
    } else {
        return validators(controlValue);
    }
};