import { WordGroupDto } from '@models/words';
import { Component } from 'solid-js';

type Props = {
    done: boolean;
    group: WordGroupDto;
}

/**
 * Header for GroupCard
 * Change it's color depending on the done prop
 *
 * @note This component is part of the card element (div.card)
 */
export const GroupCardHeader: Component<Props> = (props) => {

    const headerColor = (done: boolean) => {
        if (done) {
            return 'bg-accent text-accent-content';
        } else {
            return 'bg-warning text-warning-content';
        }
    };

    return (
        <header class={`mb-2 px-4 transition-all ${headerColor(props.done)}`}>
            <div class="card-content flex items-center justify-between">
                <h3 class="text-lg p-2 truncate">{props.group.name}</h3>
                <button class="btn btn-sm btn-ghost btn-circle">
                    <i class="fa-solid fa-ellipsis-vertical"/>
                </button>
            </div>
        </header>
    )
}