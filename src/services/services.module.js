'use strict';

import apiService from './api/api.service';
import authService from './auth/auth.service';
import sessionService from './session/session.service';

export default angular.module('app.services', [])
  .service('apiService', apiService)
  .service('authService', authService)
  .service('sessionService', sessionService)
  .name;
