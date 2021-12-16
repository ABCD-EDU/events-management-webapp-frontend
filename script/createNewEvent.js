const textInput = ["name", "address", "dateStart", "dateEnd", "description", "status", "category"];
const comboInput = ["status", "category"];
const toSend = {
    action: "CREATE_EVENT"
}

$ (() => {
    
    initializeButtons();

});

function initializeButtons() {
    $("#submit-button").click((e) => {
        generateData();
        console.log(toSend);
        createEvent(toSend);
        e.preventDefault(); 
    });
    $("#discard-button, #my-events, #upcoming-events").click((e) => {
        $.get("/events/discardEdit/");
        window.location.href = "/";
        e.preventDefault();
    });
    $("#create-event").hide();
    $("#log").hide();
    $('#status-option').prop('disabled', true);
    $('#status-option').css('opacity', .5);
    $('#status-option').css('cursor', "default");
}

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