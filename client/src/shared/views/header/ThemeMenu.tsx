import { Component, createSignal } from 'solid-js';
import { Tooltip } from '@components/tooltip/Tooltip';
import { Menu, MenuOption } from '@components/menu';
import { Theme, useApp } from '@root/src/shared/providers/AppProvider';

export const ThemeMenu: Component = () => {

    const app = useApp();

    const [menuTrigger, setTrigger] = createSignal<HTMLElement>();
    const [show, setShow] = createSignal(false);

    const toggleMenu = () => setShow(!show());

    const toggleTheme = (theme: Theme) => {
        app.setTheme(theme);
        setShow(false);
    };

    return (
        <>
            <Tooltip message="Цветовая схема" placement="left">
                <button class="btn btn-sm btn-circle btn-ghost" ref={setTrigger} onClick={toggleMenu}>
                    <i class="fa-solid fa-palette"/>
                </button>
            </Tooltip>

            <Menu
                isShow={show()}
                reference={menuTrigger()}
                onBackdropClick={toggleMenu}
            >
                <MenuOption onClick={() => toggleTheme('light')} active={app.theme() === 'light'}>
                    <i class="fa-solid fa-sun"/>
                </MenuOption>
                <MenuOption onClick={() => toggleTheme('dark')} active={app.theme() === 'dark'}>
                    <i class="fa-solid fa-moon"/>
                </MenuOption>
            </Menu>
        </>
    );
};