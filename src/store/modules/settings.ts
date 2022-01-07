import { Module } from 'vuex'
import { IRootState } from '../index'
import { settings as setting } from '@/utils/settings'

export interface ISettingsState {
  showSettings: boolean
  tagsView: boolean
  fixedHeader: boolean
  sidebarLogo: boolean
}

type keys = keyof ISettingsState

export const settings: Module<ISettingsState, IRootState> = {
  namespaced: true,
  state: () => ({
    showSettings: setting.showSettings,
    tagsView: setting.tagsView,
    fixedHeader: setting.fixedHeader,
    sidebarLogo: setting.sidebarLogo,
  }),
  mutations: {
    CHANGE_SETTING: (
      state: ISettingsState,
      { key, value }: { key: keys; value: boolean }
    ) => {
      // eslint-disable-next-line no-prototype-builtins
      if (state.hasOwnProperty(key)) {
        state[key] = value
      }
    },
  },
  actions: {
    changeSetting({ commit }, data) {
      commit('CHANGE_SETTING', data)
    },
  },
}
