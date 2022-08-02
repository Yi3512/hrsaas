import { login } from '@/api/user'
export default {
  namespaced: true,
  state: {
    token: '',
  },
  mutations: {
    setToken(state, payload) {
      state.token = payload
    },
  },
  actions: {
    async getToken(context, payload) {
      // console.log(payload, 123)
      const res = await login(payload)
      console.log(res, 333)
      context.commit('setToken', res)
    },
  },
  getters: {},
}
