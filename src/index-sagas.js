import { all } from 'redux-saga/effects';

import articlePostWatcher from './articlePost/articlePost-sagas'
import articleWatcher from './article/article-sagas'
import articlesWatcher from './articles/articles-sagas'
import { userLoginWatcher } from './user/user-sagas'
import { userLogoutWatcher } from './user/user-sagas'

export default function* IndexSaga() {
  yield all([
    articlePostWatcher(),
    articleWatcher(),
    articlesWatcher(),
    userLoginWatcher(),
    userLogoutWatcher(),
  ]);
}
