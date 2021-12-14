/**
 * TODO: Consider adding a toast when user has logged out successfully
 *
 * As of now it just changes the Logout text to Login
 */
const attemptLogin = () => {
  fetch("session/isLogged", {method: "POST"}).then((data) => {
    console.log(data.message);
    if (data.message) {
      fetchAsync("session/logout").then((data) => {
        if (data.message) {
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
