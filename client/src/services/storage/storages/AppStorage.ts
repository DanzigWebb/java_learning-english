import { AbstractStorage, StorageKeyEnum } from '@root/src/services/storage';
import { Theme } from '@root/src/shared/providers/AppProvider';

type AppStorageState = {
    theme: Theme;
}

class AppStorage extends AbstractStorage<AppStorageState> {}

export const appStorage = new AppStorage(
    localStorage,
    StorageKeyEnum.APP
);