
// Database Reference
var database = firebase.database();

// Initial Variables
var trainName = "";
var destination = "";
var frequency = "";
var nextArv = "";
var minAway = "";
var firstTime = "";



$("button").on("click", function(event) {
    event.preventDefault();

    console.log("works");

    var trainName = $("#trainNameInput").val().trim();
    var destination = $("#destinationInput").val().trim();
    var firstTime = $("#firstTimeInput").val().trim();
    var frequency = $("#freqInput").val().trim();
    var firstTimeConverted = moment(firstTime, "HH:mm");
    var currentTime = moment().format("HH:mm");
    var nextArv = moment().diff(moment(firstTimeConverted), "minutes");
    var timeRemainder = nextArv % frequency;
    var minAway = frequency - timeRemainder;
    var nextArv = moment().add(minAway, "minutes").format("HH:mm");
    

    console.log(trainName);
    console.log(destination);
    console.log(firstTime);
    console.log(frequency);

    

    database.ref().push({
        name: trainName,
        destination: destination,
        firstTime: firstTime,
        frequency: frequency,
        nextArv: nextArv,
        minAway: minAway,
        dataAdded: firebase.database.ServerValue.TIMESTAMP
    });
   


});

database.ref().orderByChild("dateAdded").limitToLast(3).on("child_added", function(childSnapshot) {

    $("tbody").append("<tr class='well'><th scope='row' id='trainName'>" + childSnapshot.val().name + "</th><td id='destination'> " + childSnapshot.val().destination + "</td><td id=frequency'>" + childSnapshot.val().frequency + "</td><td id='nextArv'>" + childSnapshot.val().nextArv + "</td><td id='minAway'>" + childSnapshot.val().minAway + "</td></tr>");
}, function(errorObject) {
    console.log("Errors handled: " + errorObject.code);
});




