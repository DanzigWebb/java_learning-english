import { Link } from 'solid-app-router';
import { Component, Show } from 'solid-js';
import { Tooltip } from '@components/tooltip/Tooltip';
import { useApp } from '@root/src/shared/providers/AppProvider';
import { PagesPathEnum } from '@root/src/pages/pages.type';
import { ThemeMenu } from '@root/src/shared/views/header/ThemeMenu';
import { ProfileMenu } from '@root/src/shared/views/header/ProfileMenu';

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

                <div class="flex-none">
                    <ThemeMenu/>
                </div>
            </nav>
        </header>
    );
};
