export default function sessionService(Parse) {
  
  let session = {};

  return {
    getUser,
    setToken,
    getToken,
    destroy
  };

  function getUser() {
      return Parse.User.current();
  }

  function setToken(token) {
    session.token = `Bearer ${token}`;
  }

  function getToken() {
    // return session.token;
      return Parse.User.current();
  }

  function destroy() {
    session = {};
  }

}
