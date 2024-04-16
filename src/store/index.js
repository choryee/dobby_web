import { createStore } from 'vuex'

export default createStore({
  state: {
    },
  getters: {
    },
  mutations: {
      setUserName(state, userName) {
        state.userName = userName;
      },
      setEmployeeNumber(state, employeeNo){
        state.employeeNo = employeeNo;
      }
  },
  actions: {
    },
  modules: {
    }
});
