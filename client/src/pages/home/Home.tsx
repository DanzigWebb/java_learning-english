import { Component, createSignal } from 'solid-js';
import { Page } from '@root/src/pages';
import { useNavigate } from 'solid-app-router';
import { createGroup } from '@services/api';
import { WordGroupCreateDto } from '@models/words';

export const Home: Component = () => {
    const navigate = useNavigate();

    const [name, setName] = createSignal('');

    async function onSubmit(e: Event) {
        e.preventDefault();
        if (name().length) {
            try {
                const group: WordGroupCreateDto = {
                    name: name(),
                };
                await createGroup(group);
                navigate('/groups');
            } catch (e) {
                // Todo: An error alert should be shown there
            }
        }
    }

    return (
        <Page full>
            <div class="card shadow-xl bg-base-200 text-center max-w-sm m-auto">
                <figure>
                    <img
                        class="w-full"
                        src="https://a.trellocdn.com/prgb/dist/images/home/orientation/new-user.e8544e0e1b2824e4ac46.svg"
                        alt=""
                    />
                </figure>

                <form className="card-body">
                    <div class="opacity-90 mb-4">
                        <h3 class="text-xl font-semibold pb-2">Создайте новую группу</h3>
                        <p class="text-sm opacity-80">Соберите в группе неизвестные иностранные слова, объедененные по
                            смыслу</p>
                    </div>

                    <input
                        type="text"
                        class="input mb-2"
                        placeholder="Транспорт"
                        value={name()}
                        onInput={e => setName((e.target as HTMLInputElement).value)}
                    />

                    <button
                        className="btn btn-primary text-xs"
                        disabled={name().length === 0}
                        onClick={onSubmit}
                    >
                        Создайте свою доску
                    </button>
                </form>
            </div>
        </Page>
    );
};