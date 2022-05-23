import { Component, createSignal } from 'solid-js';
import { Page } from '@root/src/pages';
import { useNavigate } from 'solid-app-router';
import { CreateWord } from '@services/api';
import { WordCreateDto } from '@models/words';
import { PagesPathEnum } from '@root/src/pages/pages.type';

export const Home: Component = () => {
    const navigate = useNavigate();

    const [name, setName] = createSignal('');

    async function onSubmit(e: Event) {
        e.preventDefault();
        if (name().length) {
            try {
                const group: WordCreateDto = {
                    name: name(),
                    definition: '',
                };
                await CreateWord(group);
                navigate(`/${PagesPathEnum.WORDS}`);
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
                        <p class="text-sm opacity-80">Соберите свой список незнакомых слов на английском языке</p>
                    </div>

                    <input
                        type="text"
                        class="input mb-2"
                        placeholder="Home"
                        value={name()}
                        onInput={e => setName((e.target as HTMLInputElement).value)}
                    />

                    <button
                        className="btn btn-primary text-xs"
                        disabled={name().length === 0}
                        onClick={onSubmit}
                    >
                        Добавьте новое слово
                    </button>
                </form>
            </div>
        </Page>
    );
};
