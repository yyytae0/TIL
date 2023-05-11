import Vue from 'vue'
import Vuex from 'vuex'
import axios from 'axios'

Vue.use(Vuex)
const API_URL = 'http://127.0.0.1:8000'

export default new Vuex.Store({
  state: {
    articles: [
      {
        id: 1,
        title: '제목',
        content: '내용'
      },
      {
        id: 2,
        title: '제목2',
        content: '내용2'
      },
    ],
  },
  getters: {
  },
  mutations: {
    GET_ARTICLES(state, articles){
      state.articles = articles
    }
  },
  actions: {
    getArticles(context){
      axios({
        method: 'get',
        url: `${API_URL}/api/v1/articles/`,
      }).then(res => {
        context.commit('GET_ARTICLES', res.data)
      }).catch(err => {
        console.log(err)
      })
    }
  },
  modules: {
  }
})
