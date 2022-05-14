/* @refresh reload */
import { render } from 'solid-js/web';

import './index.css';
import App from './App';
import { Router } from 'solid-app-router';
import { AppProvider } from '@root/src/shared/providers/AppProvider';

import dayjs from 'dayjs';
import 'dayjs/locale/ru';
dayjs.locale('ru');

render(() => (
        <Router>
            <AppProvider>
                <App/>
            </AppProvider>
        </Router>
    ),
    document.getElementById('root') as HTMLElement
);
