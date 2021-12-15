const joinEvent = (event_id) => {
  fetch("session/isLogged")
  .then((data) => {
    if (!data.message) {
      window.location.href = "session/login";
    }
  })
  let data = {
    event_id: event_id,
  };

  fetch("events/join", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data),
  })
  .then(() => {
    const element = document.getElementById(event_id)
    element.style.display = "none";
  });
};

// TODO (OPTIONAL): ADD FADE EFFECT WHEN REMOVING THE BUTTON
// NOTE: JQUERY MAY NOT WORK AS INTENDED WITH PROMISES 
const leaveEvent = (event_id) => {
  let data = {
    event_id: event_id,
  };

  fetch("events/leave", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data),
  })
  .then(() => {
    const element = document.getElementById(event_id);
    element.parentNode.parentNode.parentNode.style.display = "none";
  });
};

const editEvent = (event_id) => {
  alert(event_id);
}