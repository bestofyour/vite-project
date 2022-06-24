/* eslint-disable prettier/prettier */
import { defineStore } from 'pinia';
import { store } from '@/store';

type IdLabel = number;
type NameLabel = string;
type NumOrStr<T> = T extends number ? IdLabel : NameLabel;
interface User<T extends number | string | boolean> {
  [key: string]: NumOrStr<T>;
}
const str = Symbol(1);
export const userStore = defineStore({
  id: 'user',
  state: (): User<string> => ({
    user: 'admin',
    [str]: '1111',
  }),

  getters: {
    doubleCount: (state) => state.user + 'accent',
  },
});
export function useLocaleStoreWithOut() {
  return userStore(store);
}
