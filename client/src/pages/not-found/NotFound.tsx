import { Component } from 'solid-js';
import { Page } from '@root/src/pages/Page';
import { useApp } from '@root/src/shared/providers/AppProvider';
import { Link } from 'solid-app-router';
import { PagesPathEnum } from '@root/src/pages/pages.type';

export const NotFound: Component = () => {
    const app = useApp();

    return (
        <Page full>
            <div class="hero h-full bg-base-200">
                <div class="text-center hero-content">
                    <div class="max-w-md">
                        <h1 class="text-9xl font-bold">404</h1>
                        <p class="py-6">Provident cupiditate voluptatem et in. Quaerat fugiat ut assumenda excepturi
                            exercitationem quasi. In deleniti eaque aut repudiandae et a id nisi.</p>

                        <Link href={app.auth()
                            ? PagesPathEnum.HOME
                            : PagesPathEnum.SIGNIN
                        }>
                            <button class="btn btn-primary">
                                {app.auth()
                                    ? 'Get started'
                                    : 'Login'
                                }
                            </button>
                        </Link>
                    </div>
                </div>
            </div>
        </Page>
    );
};