export default function sessionService(Parse) {
  
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
    // return session.token;
      return Parse.Session.current();
  }

  function destroy() {
    session = {};
  }

}
