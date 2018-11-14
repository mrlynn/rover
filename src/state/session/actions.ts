import actionCreatorFactory from 'typescript-fsa';
import { asyncFactory } from 'typescript-fsa-redux-thunk';
import { AnonymousCredential, StitchUser } from 'mongodb-stitch-browser-sdk';
import { AppState, AsyncContext } from '..';

const create = actionCreatorFactory('session');
const createAsync = asyncFactory<AppState, AsyncContext>(create);

export const login = createAsync<{}, StitchUser>('login', (_params, _dispatch, _getState, { stitch }) =>
  stitch.auth.loginWithCredential(new AnonymousCredential())
);

export const logout = createAsync('logout', (_params, _dispatch, _getState, { stitch }) =>
  stitch.auth.logout()
);
