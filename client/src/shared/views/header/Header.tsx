import { Link } from 'solid-app-router';
import { Component } from 'solid-js';
import { PagesPathEnum } from '@root/src/pages/pages.type';
import { ThemeMenu } from '@root/src/shared/views/header/ThemeMenu';

export const Header: Component = () => {

    return (
        <header>
            <nav class="navbar bg-base-200">
                <div class="flex-1">
                    <Link
                        href={`/${PagesPathEnum.HOME}`}
                        class="btn btn-ghost normal-case text-xl"
                    >
                        Dictionary
                    </Link>
                </div>

                <div class="flex px-10">
                    <Link
                        href={`/${PagesPathEnum.WORDS}`}
                        class="btn text-sm btn-sm btn-ghost normal-case text-xl"
                    >
                        Words
                    </Link>
                </div>


                <div class="flex-none">
                    <ThemeMenu/>
                </div>
            </nav>
        </header>
    );
};
