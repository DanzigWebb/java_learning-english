import { Component, createSignal, onCleanup, onMount } from 'solid-js';
import { CreateWordControls, CreateWordGroupModal } from '@shared/components/modals';
import { createForm } from '@root/src/lib/form/createForm';
import { HomeFilters } from '@root/src/pages/groups-row/type/home.type';
import { Tooltip } from '@components/tooltip/Tooltip';
import { debounceTime, Subject, takeUntil } from 'rxjs';

type Controls = HomeFilters;

type Props = {
    onSubmit?: (controls: CreateWordControls) => void;
    onUpdateFilters?: (filter: Partial<HomeFilters>) => void;
}

export const GroupsRowHeader: Component<Props> = (props) => {
    const [show, setShow] = createSignal(false);
    const {register, getValues} = createForm<Controls>({
        defaultValues: {
            name: '',
            archived: false
        }
    });

    const filters$ = new Subject<Partial<Controls>>();
    const destroy$ = new Subject();

    onMount(() => {
        emitFilters(getValues());

        filters$.pipe(
            debounceTime(200),
            takeUntil(destroy$)
        ).subscribe(emitFilters);
    });

    onCleanup(() => {
        destroy$.next(null);
        destroy$.complete();
    });

    const openModal = () => setShow(true);
    const closeModal = () => setShow(false);

    const emitFilters = (filters: Partial<Controls>) => props.onUpdateFilters?.(filters);

    function valueChange() {
        const value = getValues();
        filters$.next(value);
    }

    const onSubmit = async (controls: CreateWordControls) => {
        setShow(false);
        props.onSubmit?.(controls);
    };

    return (
        <>
            <header class="p-4">
                <form onInput={valueChange} className="flex items-center gap-2 pb-4">
                    <p>Filters: </p>
                    <input
                        type="text"
                        autocomplete="off"
                        placeholder="Word or group name..."
                        class="input input-ghost bg-base-200"
                        {...register('name')}
                    />

                    <label class="label cursor-pointer">
                        <span class="label-text pr-2">Archived</span>
                        <input
                            type="checkbox"
                            class="toggle toggle-accent toggle-sm"
                            {...register('archived')}
                        />
                    </label>

                    <div className="flex-1"/>

                    <Tooltip message="Create group">
                        <button
                            class="btn btn-circle btn-sm btn-accent gap-2"
                            type="button"
                            onClick={openModal}
                        >
                            <i class="fa-solid fa-plus"/>
                        </button>
                    </Tooltip>
                </form>

                <div class="divider m-0"/>
            </header>

            <CreateWordGroupModal
                show={show()}
                close={closeModal}
                submit={onSubmit}
            />
        </>
    );
};