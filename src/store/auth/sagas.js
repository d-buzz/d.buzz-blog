import { call, put, takeEvery, select } from 'redux-saga/effects'
import {
  AUTHENTICATE_USER_REQUEST,
  authenticateUserSuccess,
  authenticateUserFailure,
} from './actions'

import { generateSession, readSession } from 'services/helper'