/* @refresh reload */
import { render } from 'solid-js/web';

import './index.css';
import App from './App';
import { Router } from 'solid-app-router';
import { AppProvider } from '@root/src/shared/providers/AppProvider';

import dayjs from 'dayjs';
import isoWeek from 'dayjs/plugin/isoWeek';
import weekday from 'dayjs/plugin/weekday';
import localizedFormat from 'dayjs/plugin/localizedFormat';
import 'dayjs/locale/ru';

dayjs.extend(isoWeek);
dayjs.extend(weekday)
dayjs.extend(localizedFormat);
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
