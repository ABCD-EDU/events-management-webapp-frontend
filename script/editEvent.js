const textInput = ["name", "address", "dateStart", "dateEnd", "description", "status", "category"];
const comboInput = ["status", "category"];
const toSend = {action: "EDIT_EVENT"};
let toEditArray = [];
let toChangeData = new Set();
let data = null; // event data

$(async () => {
    let response = await fetch("../events/event_data", { method: "GET" });
    data = await response.json();
    data = data[0];
    console.log(data);
    setOnChange();
    setFields();
    $("#submit-button").click((e) => {
        generateData();
        console.log(toSend);
        editEvent(toSend);
        e.preventDefault();
    });
});

function generateData() {
    let body = {
        "eventID":data["event_id"]
    }
    toChangeData.forEach((id) => {
        const entry = {
            "attr": translateID(id),
            "val": $("#" + id).val()
        }
        toEditArray.push(entry);
    });
    body["toEditArray"] = toEditArray;
    toSend["data"] = body;
}

function translateID(id) {
    switch (id) {
        case "name-field":
            return "event_name";
        case "location-field":
            return "address";
        case "date-start-field":
            return "date_start";
        case "date-end-field":
            return "date_end";
        case "desc-field":
            return "description";
        case "status-option":
            return "event_status";
        case "category-option":
            return "category";
    }
}

function setOnChange() {
    $('input').map(function () {
        $(this).on("change", () => {toChangeData.add(this.id)});
    })
    $('.dropdown').map(function () {
        $(this).on("change", () => {toChangeData.add(this.id)});
    })
    $('[type=date]').map(function () {
        $(this).on("change", () => {toChangeData.add(this.id)});
    })
    $("#desc-field").on("change", () => { toChangeData.add("desc-field") });
}

function setFields() {
    $("#name-field").val(data["event_name"]);
    $("#location-field").val(data["address"]);
    $("#desc-field").val(data["description"]);
    $("#status-option select").val(data["event_status"]).change();
    $("#category-option select").val(data["category"]).change();
    $("#date-start-field").val(parseDate(data["date_start"]));
    $("#date-end-field").val(parseDate(data["date_end"]));
}

function parseDate(date) {
    let a = date.split("T");
    return a[0];
}

function editEvent(toSend) {
    $.ajax({
        url: '/events/edit/',
        type: 'post',
        dataType: 'json',
        contentType: 'application/json',
        success: function (data) {
            alert("event editted");
            // alert(JSON.parse(data))
        },
        data: JSON.stringify(toSend)
    });
}
