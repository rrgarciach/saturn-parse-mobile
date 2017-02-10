'use strict';

import LoginCtrl from './login.controller';
import q from 'q';

describe('Controller: LoginCtrl', () => {

  let ctrl;
  let $ionicSMDMock = jasmine.createSpyObj('$ionicSideMenuDelegate', ['canDragContent']);
  let $stateMock = jasmine.createSpyObj('$state', ['go']);
  let authServiceMock = jasmine.createSpyObj('authService', ['login']);

  beforeAll(() => {
    ctrl = new LoginCtrl($ionicSMDMock, $stateMock, authServiceMock);
  });

  it('should call login from Auth Service', () => {
    // Arrange
    let deferred = q.defer();
    authServiceMock.login.and.returnValue(deferred.promise);

    // Act
    ctrl.doLogin();

    // Assert
    expect(authServiceMock.login).toHaveBeenCalled();
  });

  it('should redirect to Orders List', () => {
    // Arrange
    let deferred = q.defer();
    authServiceMock.login.and.returnValue(deferred.promise);

    // Act
    ctrl.doLogin();

    // Assert
    deferred.resolve(() => {
      expect($stateMock.go).toHaveBeenCalledWith('app.orders');
    });



  });

});
