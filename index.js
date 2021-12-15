async function fetchAsync(url) {
  let response = await fetch(url, {
    method: "GET",
  });
  let data = await response.json();
  console.log("data: " + data);
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

const getUserEvents = () => {
  fetchAsync("session/isLogged")
    .then((data) => {
      if (data.message) {
        fetchAsync("events/user-events").then((res) => {
          $("#upcoming-events").css("opacity", "0.5");
          $("#my-events").css("opacity", "1");

          const _items = res;
          const subNav = document.getElementById("events");
          subNav.innerHTML = "";
          for (var i = 0; i < _items.length; i++) {
            const {
              event_id,
              event_name,
              address,
              date_start,
              date_end,
              description,
              event_status,
              category,
            } = _items[i];
            subNav.innerHTML += `
      <section id=${event_name} class="card">
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
              <button onclick="leaveEvent(this.id)" id=${event_id} class="join">LEAVE</button>
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

// TODO: WHEN LOADING THE CARD, CHECK FIRST IF THE USER HAS ALREADY
// JOINED THE EVENT.
// IF YES: REMOVE THE BUTTON
// IF NO: BUTTON REMAINS
const getUpcomingEvents = () => {
  fetchAsync("events/upcoming-events").then((res) => {
    $("#upcoming-events").css("opacity", "1");
    $("#my-events").css("opacity", "0.5");

    const _items = res;
    const subNav = document.getElementById("events");
    subNav.innerHTML = "";
    for (var i = 0; i < _items.length; i++) {
      const {
        event_id,
        event_name,
        address,
        date_start,
        date_end,
        description,
        event_status,
        category,
        hasJoined,
      } = _items[i];
      subNav.innerHTML += `
      <section id=${event_name} class="card">
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
              <button 
              onclick=${hasJoined ? "leaveEvent(" + event_id + ")" : "joinEvent(" + event_id + ")"}
              id=${event_id} 
              class="join">${hasJoined ? "LEAVE" : "JOIN"}
              </button>
            </div>
        </div>
      </section>
  `;
    }
  });
};

$(() => {
  changeLogText();
  insertCreateEvent();

  // check whether user is logged in
  getUpcomingEvents();

  document.getElementById("upcoming-events").onclick = getUpcomingEvents;
  document.getElementById("my-events").onclick = getUserEvents;

  $("#create-event").click((e) => {
    window.location.href = "views/editCreateEvents.html";
  });
});
