import { Accessor, Component, createContext, createEffect, createSignal, For, JSXElement, useContext } from 'solid-js';

type StepsContext = {
    step: Accessor<number>;
    stepContent: JSXElement;
    setStep: (step: number) => void;
    setStepContent: (content: JSXElement) => void;
}

const StepsContent = createContext<StepsContext>();

type Props = {
    stepIndex: Accessor<number>;
    steps: [
        JSXElement,
        JSXElement
    ][];
}

export const Steps: Component<Props> = (props) => {

    const [step, setActiveStep] = createSignal<number>(0);
    const [stepContent, setActiveStepContent] = createSignal<JSXElement>();

    createEffect(() => {
        setStep(props.stepIndex());
    });

    const store: StepsContext = {
        step,
        stepContent,
        setStep(step) {
            setActiveStep(step);
        },
        setStepContent(content) {
            setActiveStepContent(content);
        }
    };

    function setStep(index: number) {
        if (index >= props.steps.length) {
            setActiveStep(props.steps.length - 1);
            return;
        } else if (index < 0) {
            setActiveStep(0);
            return;
        } else {
            setActiveStep(index);
        }
    }

    const getStepContent = (): JSXElement => {
        const stepContent = props.steps[step()];
        if (stepContent?.length) {
            return stepContent[1];
        } else {
            throw new Error('Invalid step by index: ' + step());
        }
    };

    return (
        <StepsContent.Provider value={store}>
            <div class="flex flex-col gap-4">
                <ul class="steps">
                    <For each={props.steps}>
                        {([step]) => step}
                    </For>
                </ul>
                <div>{getStepContent()}</div>
            </div>
        </StepsContent.Provider>
    );
};

export const useSteps = () => useContext(StepsContent)!;