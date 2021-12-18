let userType = null;
let isLogged = null;

async function fetchAsync(url) {
  let response = await fetch(url, {
    method: "GET",
  });
  let data = await response.json();
  // console.log("data: " + data);
  return data;
}

const intializeElements = () => {
  // hide/show create-event button
  if (userType !== "admin") {
    document.getElementById("create-event").style.display = "none";
  }else {
    $("#page-title").css("background-color", "#476A6F");
  }
  // set log text
  if (isLogged) {
    document.getElementById("log").innerText = "Logout";
  } else {
    document.getElementById("log").innerText = "Login";
  }
  // set title
  document.getElementById("page-title").innerText = "Upcoming Events";
};

const getUserEvents = () => {
  fetchAsync("session/isLogged")
  .then((data) => {
    if (data.message) {
        document.getElementById("page-title").innerText = "My Events";
        fetchAsync("events/user-events").then((res) => {
          $("#upcoming-events").css("opacity", "0.5");
          $("#my-events").css("opacity", "1");
          $("#page-title").innerHTML = "My Events";

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
            let dateStart = date_start.split("T")[0];
            let dateEnd = date_end.split("T")[0];
            subNav.innerHTML += `
      <section id=${event_name} class="card">
          <div id="info">
              <h2 id="event-name">${event_name}</h2>
              <h3 id="address">${address}</h3>
              <h3 id="date">Starting Date: ${dateStart}</h3>
              <h3 id="time">Ending Date: ${dateEnd}</h3>
              <p id="description">${description}</p>
          </div>
          <div id="footer">
              <h3 id="status">STATUS: ${event_status}</h3>
              <div id="buttons">
              <button onclick="${userType === "admin" ? "editEvent(this.id)" : "leaveEvent(this.id)"}" 
              id=${event_id} 
              class="join">${userType === "admin" ? "EDIT EVENT" : "LEAVE"}</button>
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
  document.getElementById("page-title").innerText = "Upcoming Events";
  fetchAsync("events/upcoming-events").then((res) => {
    $("#upcoming-events").css("opacity", "1");
    $("#my-events").css("opacity", "0.5");
    $("#page-title").innerHTML = "Upcoming Events";

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
      let dateStart = date_start.split("T")[0];
      let dateEnd = date_end.split("T")[0];
      subNav.innerHTML += `
      <section id=${event_name} class="card">
        <div id="info">
          <h2 id="event-name">${event_name}</h2>
          <h3 id="address">${address}</h3>
          <h3 id="date">Starting Date: ${dateStart}</h3>
          <h3 id="time">Ending Date: ${dateEnd}</h3>
          <p id="description">${description}</p>
        </div>
        <div id="footer">
            <h3 id="status">STATUS: ${event_status}</h3>
            <div id="buttons">
              <button 
              onclick=${determineButtonOnClick(hasJoined, event_id, userType)}
              id=${event_id} 
              class="join">${determineButtonName(hasJoined, event_id, userType)}
              </button>
            </div>
        </div>
      </section>
  `;
    }
  });
};

const determineButtonOnClick = (hasJoined, event_id, userType) => {
  if (userType === "admin") {
    return "editEvent(" + event_id + ")";
  }else if (userType === "member") {
    return hasJoined ? "leaveEvent(" + event_id + ")" : "joinEvent(" + event_id + ")";
  }else {
    return "attemptLogin()";
  }
}

const determineButtonName = (hasJoined, event_id, userType) => {
  if (userType === "admin") {
    return "EDIT EVENT";
  } else {
    return hasJoined ? "LEAVE" : "JOIN";
  }
}

async function initalizeVariables() {
  let response = await fetch("session/userType", {method: "GET"});
  let data = await response.json();
  userType = data.type;
  
  response = await fetch("session/isLogged", { method: "GET" });
  data = await response.json();
  isLogged = data.message;
}

$(async () => {
  await initalizeVariables();
  intializeElements();
  getUpcomingEvents();

  document.getElementById("upcoming-events").onclick = getUpcomingEvents;
  document.getElementById("my-events").onclick = getUserEvents;
  $("#create-event").click((e) => { window.location.href = "views/createEvents.html"; });
});
