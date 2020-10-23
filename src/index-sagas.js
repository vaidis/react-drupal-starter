import { all } from 'redux-saga/effects';

import articleWatcher from './article/article-sagas'
import articlesWatcher from './articles/articles-sagas'
import {userLoginWatcher} from './user/user-sagas'
import {userLogoutWatcher} from './user/user-sagas'
import {userGetStatusWatcher} from './user/user-sagas'
import termWatcher from './term/term-sagas'

export default function* IndexSaga () {
    yield all([
      termWatcher(),
      articleWatcher(),
      articlesWatcher(),
      userLoginWatcher(),
      userLogoutWatcher(),
      userGetStatusWatcher(),
    ]);
}
