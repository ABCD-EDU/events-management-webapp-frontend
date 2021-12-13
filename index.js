async function fetchAsync(url) {
  let response = await fetch(url, {
    method: "GET",
  });
  let data = await response.json();
  return data;
}

const changeLogText = () => {
  fetchAsync("session/isLogged").then((data) => {
    if (data.message) {
      document.getElementById("log").innerText = "Logout";
    } else {
      console.log(data)
      document.getElementById("log").innerText = "Login";
    }
  });
};

const insertCreateEvent = () => {
  fetchAsync("session/userType").then((data) => {
    const type = data.type;
    if (type === "member") {
      document.getElementById("create-event").style.display = "none";
    }
  });
}

const init = () => {
  changeLogText();
  insertCreateEvent();
}

/**
 * TODO: Consider adding a toast when user has logged out successfully
 * 
 * As of now it just changes the Logout text to Login
 */
const attemptLogin = () => {
  fetchAsync("session/isLogged").then((data) => {
    console.log(data.message)
    if (data.message) {
      fetchAsync("session/logout").then((data) => {
        if (data.message) {
          document.getElementById("log").innerText = "Login";
        }
      });
    } else {
      window.location.href = "session/login"
    }
  });
}

document.body.onload = init;
document.getElementById("log").onclick = attemptLogin;
