export const state = () => ({
  users: [],
});

export const mutations = {
  setUsers(state, data) {
    state.users = data;
  },
};

export const actions = {
  setUsers({commit}, data) {
    commit('setUsers', data);
  },
};

export const getters = {
  getUsers(state) {
    return state.users;
  },
};