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

const searchEvents = () => {
  // fetchAsync("session/isLogged")
  //   .then((data) => {
  //     if (data.message) {
  const searchValue = document.getElementById("search-field").value

  fetchAsync(`events/search?search=${searchValue}`).then((res) => {
    const _items = res;
    console.log(_items);
    sortByName(_items, true)
    // sortByName(_items, true)
    console.log(_items);
    sessionStorage.setItem("searchResult", JSON.stringify(_items))
    insertEvents(_items)

    console.log(`Testing MYSQL string format: ${_items[0].date_start}`);
  })
  //   }
  // }
  // )
}

const insertEvents = (_items) => {
  console.log("insert events called");
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
              <section class="card">
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
                <button onclick="joinEvent(this.id)" id=${event_id} class="join">JOIN</button>
                </div>
            </div>
        </section>
        `;
  }
}

const sortByName = (array, asc) => {
  const prop = "event_name";
  console.log(`Sorting by ${prop} | ${asc ? "Asc" : "Desc"}`);

  array.sort(function (a, b) {
    if (asc) {
      return (a[prop] > b[prop]) ? 1 : ((a[prop] < b[prop]) ? -1 : 0);
    } else {
      return (b[prop] > a[prop]) ? 1 : ((b[prop] < a[prop]) ? -1 : 0);
    }
  });
}

const sortByDateTime = (array, asc) => {
  const prop = "date_start";
  console.log(`Sorting by ${prop} | ${asc ? "Asc" : "Desc"}`);
  array.sort(function (a, b) {
    if (asc) {
      return (a.date_start > b.date_start) ? 1 : ((a.date_start < b.date_start) ? -1 : 0);
    } else {
      return (b.date_start > a.date_start) ? 1 : ((b.date_start < a.date_start) ? -1 : 0);
    }
  });

}

const sortListener = () => {
  const value = document.getElementById("sort-options").value;
  const _items = JSON.parse(sessionStorage.getItem("searchResult"));

  switch (value) {
    case "name-asc":
      console.log("Sorting name-asc");
      sortByName(_items, true);
      insertEvents(_items)
      break
    case "name-desc":
      sortByName(_items, false);
      insertEvents(_items)
      break
    case "date-asc":
      sortByDateTime(_items, true);
      insertEvents(_items)
      break
    case "date-desc":
      sortByDateTime(_items, false);
      insertEvents(_items)
      break
  }
}


document.querySelector("#search-button").addEventListener('click', searchEvents);
document.querySelector("#sort-options").onchange = sortListener;