const textInput = ["name", "address", "dateStart", "dateEnd", "description", "status", "category"];
const comboInput = ["status", "category"];
const toSend = {
    action: "CREATE_EVENT"
}
let data = null;

$(async () => {

    let response = await fetch("../events/event_data", { method: "GET" });
    data = await response.json();
    data = data[0];
    console.log(data);

    setFields();

    $("#submit-button").click((e) => {
        console.log(data)
    });

});

function generateData() {
    let data = {}
    textInput.forEach(field => {
        const n = '[name="' + field + '"]';
        data[field] = $(n).val();
    })
    comboInput.forEach(field => {
        const n = '[name="' + field + '"] option:selected';
        data[field] = $(n).text();
    })
    toSend["data"] = data;
}

function setFields() {
    $("#name-field").val(data["event_name"]);
    $("#location-field").val(data["address"]);
    $("#status-option").val(data["event_status"]);
    $("#date-start-field").val(data["date_start"]);
    $("#date-end-field").val(data["date_end"]);
    $("#category-option").val(data["category"]);
    $("#desc-field").val(data["description"]);
}

function createEvent(toSend) {
    $.ajax({
        url: '/events/create/',
        type: 'post',
        dataType: 'json',
        contentType: 'application/json',
        success: function (data) {
            alert("Event Created")
            // alert(JSON.parse(data))
        },
        data: JSON.stringify(toSend)
    });
}
