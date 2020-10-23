import { combineReducers } from 'redux'

import api from './api/api-reducers'
import user from './user/user-reducers'
import terms from './term/term-reducers'
import pager from './pager/pager-reducers'
import article from './article/article-reducers'
import articles from './articles/articles-reducers'

const IndexReducers = combineReducers({
  api,
  user,
  terms,
  pager,
  article,
  articles,
})

export default IndexReducers;
