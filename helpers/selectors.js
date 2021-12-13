async function fetchAsync(url) {
  let response = await fetch(url, {
    method: "GET",
  });
  let data = await response.json();
  return data;
}

$("#categories").on("change", () => {
  let category = document.getElementById("categories").value;
  fetchAsync("session/isLogged").then((data) => {
    if (data.message) {
      fetchAsync(`events/category/${category}`).then((res) => {
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
  });
});
