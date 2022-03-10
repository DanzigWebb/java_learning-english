import type { Component } from 'solid-js';
import { Header } from '@root/src/shared/views/header/Header';
import { JSX } from 'solid-js';
import { Route, Routes } from 'solid-app-router';
import { appStorage } from '@root/src/services/storage';
import { useApp } from '@root/src/shared/providers/AppProvider';
import { Alerts } from '@root/src/shared/views/alerts/Alerts';
import { Home, NotFound } from '@root/src/pages';


const Routers: Component = () => {
    return (
        <Routes>
            <Route
                path={`/`}
                element={<Home/>}
            />
            <Route path="/*all" element={<NotFound/>}/>
        </Routes>
    );
};

const styles: JSX.CSSProperties = {
    'min-height': '100vh',
    'display': 'grid',
    'grid-template-rows': 'auto 1fr'
};

const App: Component = () => {

    const app = useApp();

    initApp();

    return (
        <main class="main" style={styles}>
            <Header/>

            <section class="overflow-hidden">
                <Routers/>
            </section>

            <Alerts alerts={app.alerts()}/>
        </main>
    );
};

const initApp = () => {
    const app = useApp();

    const theme = appStorage.get('theme');

    if (theme) {
        app.setTheme(theme);
    }
};

export default App;
