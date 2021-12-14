const e = require("express");

const showCreateEvent = () => {
    fetch("session/userType", {method: "GET"})
    .then((res) => {
        const createEvent = document.getElementById("create-event")
        if (res.type === "member") {
            createEvent.style.display = "none";
        } else if (res.type === "admin") {
            createEvent.style.display = "block";
        }
    })
}

window.onload = showCreateEvent;