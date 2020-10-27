import { all } from 'redux-saga/effects';

import articleWatcher from './article/article-sagas'
import articlesWatcher from './articles/articles-sagas'
import {userLoginWatcher} from './user/user-sagas'
import {userLogoutWatcher} from './user/user-sagas'

export default function* IndexSaga () {
    yield all([
      articleWatcher(),
      articlesWatcher(),
      userLoginWatcher(),
      userLogoutWatcher(),
    ]);
}
