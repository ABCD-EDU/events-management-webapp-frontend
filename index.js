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
      console.log(data);
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
};

/**
 * TODO: Consider adding a toast when user has logged out successfully
 *
 * As of now it just changes the Logout text to Login
 */
const attemptLogin = () => {
  fetchAsync("session/isLogged").then((data) => {
    console.log(data.message);
    if (data.message) {
      fetchAsync("session/logout").then((data) => {
        if (data.message) {
          document.getElementById("log").innerText = "Login";
        }
      });
    } else {
      window.location.href = "session/login";
    }
  });
};

const getUserEvents = () => {
  fetchAsync("session/isLogged")
    .then((data) => {
      if (data.message) {
        fetchAsync("events/user-events").then((res) => {
          const _items = res;
          const subNav = document.getElementById("events");
          subNav.innerHTML = "";
          for (var i = 0; i < _items.length; i++) {
            const {
              event_name,
              address,
              date_start,
              date_end,
              description,
              event_status,
              category,
            } = _items[i];
            subNav.innerHTML += `
      <section id="card">
          <div id="info">
              <h2 id="event-name">${event_name}</h2>
              <h3 id="address">${address}</h3>
              <h3 id="date">Starting Date: ${date_start}</h3>
              <h3 id="time">Ending Date: ${date_end}</h3>
              <p id="description">${description}</p>
          </div>
          <div id="footer">
              <h3 id="status">STATUS: ${event_status}</h3>
              <div id="buttons">
                  <button id="join">JOIN</button>
                  <button id="leave">LEAVE</button>
              </div>
          </div>
      </section>
      `;
          }
        });
      }
    })
    .catch(console.log);
};

const getUpcomingEvents = () => {
  fetchAsync("session/isLogged")
    .then((data) => {
      if (data.message) {
        fetchAsync("events/upcoming-events").then((res) => {
          const _items = res;
          const subNav = document.getElementById("events");
          subNav.innerHTML = "";
          for (var i = 0; i < _items.length; i++) {
            const {
              event_name,
              address,
              date_start,
              date_end,
              description,
              event_status,
              category,
            } = _items[i];
            subNav.innerHTML += `
      <section id="card">
          <div id="info">
              <h2 id="event-name">${event_name}</h2>
              <h3 id="address">${address}</h3>
              <h3 id="date">Starting Date: ${date_start}</h3>
              <h3 id="time">Ending Date: ${date_end}</h3>
              <p id="description">${description}</p>
          </div>
          <div id="footer">
              <h3 id="status">STATUS: ${event_status}</h3>
              <div id="buttons">
                  <button id="join">JOIN</button>
                  <button id="leave">LEAVE</button>
              </div>
          </div>
      </section>
      `;
          }
        });
      }
    })
    .catch(console.log);
};

const init = () => {
  changeLogText();
  insertCreateEvent();
  getUserEvents();
};

document.body.onload = init;
document.getElementById("log").onclick = attemptLogin;
document.getElementById("upcoming-events").onclick = getUpcomingEvents;
document.getElementById("my-events").onclick = getUserEvents;
