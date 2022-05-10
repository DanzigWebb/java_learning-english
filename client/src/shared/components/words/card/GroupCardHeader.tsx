import { Component, createMemo, createSignal, Show } from 'solid-js';
import { WordGroupDto } from '@models/words';
import { Menu, MenuOption } from '@solsy/ui';
import { Tooltip } from '@solsy/ui';

type Props = {
    done: boolean;
    group: WordGroupDto;
    onArchived?: (group: WordGroupDto) => void;
}

/**
 * Header for GroupCard
 * Change it's color depending on the done prop
 *
 * @note This component is part of the card element (div.card)
 */
export const GroupCardHeader: Component<Props> = (props) => {

    const [show, setShow] = createSignal(false);
    const [reference, setReference] = createSignal<HTMLElement>();
    const isArchived = createMemo(() => props.group.archived);

    const headerColor = (done: boolean) => {
        if (isArchived()) {
            return 'bg-base-300';
        }

        if (done) {
            return 'bg-accent text-accent-content';
        } else {
            return 'bg-warning text-warning-content';
        }
    };

    const open = () => setShow(true);
    const close = () => setShow(false);

    const toggleArchived = () => {
        const group = {...props.group, archived: !isArchived()};
        props.onArchived?.(group);
    };

    return (
        <>
            <header class={`mb-2 px-4 rounded-lg shadow-md sticky top-0 z-10 flex-[0_0_auto] transition-all ${headerColor(props.done)}`}>
                <div class="card-content flex items-center justify-between">
                    <h3 class="text-lg p-2 truncate inline-flex gap-2 items-center">

                        <Show when={isArchived()}>
                            <Tooltip message="In archive">
                                <i class="fa-solid fa-box-archive text-error"/>
                            </Tooltip>
                        </Show>

                        <span
                            class="capitalize"
                            classList={{'line-through': isArchived()}}
                        >
                            {props.group.name}
                        </span>
                    </h3>
                    <button class="btn btn-sm btn-ghost btn-circle" onClick={open} ref={setReference}>
                        <i class="fa-solid fa-ellipsis-vertical"/>
                    </button>
                </div>
            </header>

            <Menu
                isShow={show()}
                reference={reference()}
                onBackdropClick={close}
            >
                <MenuOption onClick={toggleArchived}>
                    <i class="fa-solid fa-box-archive"/>
                    <span>Archived</span>
                </MenuOption>
            </Menu>
        </>
    );
};
