$(document).ready(function() { 

var config = {
    apiKey: "AIzaSyBulAuStAT2LgmAQGROJAFoTjQeGWKPiBw",
    authDomain: "kutrainschedule.firebaseapp.com",
    databaseURL: "https://kutrainschedule.firebaseio.com",
    projectId: "kutrainschedule",
    storageBucket: "kutrainschedule.appspot.com",
    messagingSenderId: "152967803692"
  };

  firebase.initializeApp(config);

 var db = firebase.database();

  db.ref().on("child_added", function(snapshot) {

        // Store db info in new variables for easier usability

    var newTrain = snapshot.val().trainName;
    var newDestination = snapshot.val().destination;
    var newTime = snapshot.val().firstTime;
    var newFrequency = snapshot.val().frequency;


        // Moment calculations

    newTime = moment(newTime, "hh:mm").subtract(1, "years");
    var currentTime = moment();
    var difference = moment().diff(moment(newTime), "minutes");
    var timeRemaining = difference % newFrequency;
    var minutesLeft = newFrequency - timeRemaining;
    var nextArrival = moment().add(minutesLeft, "minutes");
    var nextArrivalFormatted = moment(nextArrival).format("HH:mm");
  
        // Add new table elements

    $("#trainTable").append(
        '<tr><td>' + newTrain + '</td>' +
        '<td>' + newDestination + '</td>' +
        '<td>' + newFrequency + '</td>' +
        '<td>' + nextArrivalFormatted + '</td>' +
        '<td>' + minutesLeft + '</td></tr>'
    )


  });


  $("#addTrain").on("click", function(e) {
        e.preventDefault();

        var trainName = $("#trainName").val().trim();
        var destination = $("#destination").val().trim();
        var firstTime = $("#firstTime").val().trim();
        var frequency = $("#frequency").val().trim();

        db.ref().push({
            trainName: trainName,
            destination: destination,
            firstTime: firstTime,
            frequency: frequency
        });
        
        $("#trainName, #destination, #firstTime, #frequency").val("");
  });

});
