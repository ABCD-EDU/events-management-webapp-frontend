/**
 * TODO: Consider adding a toast when user has logged out successfully
 *
 * As of now it just changes the Logout text to Login
 */
const attemptLogin = () => {
  fetchAsync("session/isLogged").then((data) => {
    if (data.message) {
      fetchAsync("session/logout").then((logout) => {
        if (logout.message) {
          document.getElementById("log").innerText = "Login";
          location.reload(true);
        }
      });
    } else {
      window.location.href = "session/login";
    }
  });
};

document.getElementById("log").onclick = attemptLogin;
