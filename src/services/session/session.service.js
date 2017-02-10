'use strict';

export default function sessionService() {
  
  let session = {};

  return {
    setToken,
    getToken,
    destroy
  };

  function setToken(token) {
    session.token = `Bearer ${token}`;
  }

  function getToken() {
    return session.token;
  }

  function destroy() {
    session = {};
  }

}
