const joinEvent = (event_id) => {
  let data = {
    event_id: event_id,
  };

  fetch("events/join", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data),
  }).then((res) => {});
};

const leaveEvent = (event_id, event_name) => {
  let data = {
    event_id: event_id,
  };

  fetch("events/leave", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data),
  }).then((res) => {});

  $(`#${event_id}`).parent().parent().parent().css("display", "none");
};
