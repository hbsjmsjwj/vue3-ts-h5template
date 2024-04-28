import { defineStore } from 'pinia';
import { piniaPersistConfig } from './helper/persist';
import { UserState } from './interface/index';
const storeName = 'user'
export const useUserStore = defineStore(storeName, {
  state: (): UserState => ({
    name: '',
    user: '',
    jobNumber: '',
    token: '',
    permissions: [],
    ams_menus: [],
  }),
  getters: {
    isLogin(): boolean {
      return !!this.token;
    },
  },
  actions: {
    // Set Token
    setToken(token: string) {
      this.token = token || '';
    },
    async getTokenService() {
      setTimeout(() => {
        // this.setToken('zt22243');
      }, 1000);
    },
    async getPermissionsService() {
      setTimeout(() => {
        this.setPermissions(['admin', 'button']);
      }, 1000);
    },
    setPermissions(data: null | undefined | string[]) {
      this.permissions = data || [];
    },
    async setUserInfo() {
      //todo
    },
    devSetToken(val: string) {
      this.token = val;
      this.setUserInfo();
    },
    logout() {
      this.token = '';
    },
    login() {
      // todo
    },
    async getMentPermisstion() {
    //  todo
    },
    async getPermisstion() {
       //  todo
    },
  },
  persist: piniaPersistConfig(storeName, ['name', 'jobNumber', 'token']),
});
