/* eslint-disable no-underscore-dangle */
import { v4 as uuidv4 } from 'uuid';

import Constants from '../constants/auth';
import User from './user';
import { delay } from '../../../src/utils/index';

const singleton = Symbol('');
const singletonEnforcer = Symbol('');

class Auth {
  constructor(enforcer) {
    if (enforcer !== singletonEnforcer) {
      throw new Error('Cannot construct singleton');
    }

    this._uuid = uuidv4();
    this._currentUser = null;
    this._onAuthStateChangedObservers = [];
  }

  static get instance() {
    if (!this[singleton]) {
      this[singleton] = new Auth(singletonEnforcer);
    }

    return this[singleton];
  }

  get currentUser() {
    return this._currentUser;
  }

  get uuid() {
    return this._uuid;
  }

  get onAuthStateChangedObservers() {
    return this._onAuthStateChangedObservers;
  }

  onAuthStateChanged(observer) {
    this.onAuthStateChangedObservers.push(observer);

    return () => {
      this._onAuthStateChangedObservers = this.onAuthStateChangedObservers.filter(
        (obs) => obs !== observer,
      );
    };
  }

  async signInAnonymously() {
    const user = Constants.anonymousUser1;

    this._currentUser = new User(
      user.displayName,
      user.email,
      user.isAnonymous,
      user.uid,
      this.signOut,
    );

    await delay(Constants.defaultDelayInMilliseconds);

    this.onAuthStateChangedObservers.forEach((observer) =>
      observer(this._currentUser),
    );

    return this._currentUser;
  }

  async signOut() {
    if (this._currentUser === null) {
      return;
    }

    this._currentUser = null;

    await delay(Constants.defaultDelayInMilliseconds);
  }
}

export default Auth;
