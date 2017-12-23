 var config = {
    apiKey: "AIzaSyDVVkM-mxj0P8Ca_U065bpfDphvVPStx1A",
    authDomain: "trainscheduler-a1120.firebaseapp.com",
    databaseURL: "https://trainscheduler-a1120.firebaseio.com",
    projectId: "trainscheduler-a1120",
    storageBucket: "trainscheduler-a1120.appspot.com",
    messagingSenderId: "475724004539"
  };
   firebase.initializeApp(config);


var url ="https://trainscheduler-a1120.firebaseio.com/";
var dataRef =  new firebase(databaseURL) ;
var name ='';
var destination = '';
var firstTime = '';
var frequency = '';
var nextTrain = '';
var nextTrainFormat = '';
var mAway = '';
var firstTimeConverted = '';
var currentTime = '';
var diffTime = '';
var tRemainder = '';
var minutesTillTrain = '';
var keyHolder = '';
var getKey = '';


$(document).ready(function() {

$("#add-train").on("click", function() {
        
name = $('#nameInput').val().trim();
  destination = $('#destinationInput').val().trim();
  firstTime = $('#firstTrainInput').val().trim();
    frequency = $('#frequencyInput').val().trim();
    firstTimeConverted = moment(firstTime, "hh:mm").subtract(1, "years");
      currentTime = moment();
      diffTime = moment().diff(moment(firstTimeConverted), "minutes");
      tRemainder = diffTime % frequency;
        minutesTillTrain = frequency - tRemainder;
        nextTrain = moment().add(minutesTillTrain, "minutes");
        nextTrainFormat = moment(nextTrain).format("hh:mm");

        
keyHolder = dataRef.push({
name: name,
destination: destination,
firstTime: firstTime,  
frequency: frequency,
nextTrainFormat: nextTrainFormat,
minutesTillTrain: minutesTillTrain
        });
         

        $('#nameInput').val('');
        $('#destinationInput').val('');
        $('#firstTrainInput').val('');
        $('#frequencyInput').val('');

        return false;
     });
         
     dataRef.on("child_added", function(childSnapshot) {
     

        $('.train-schedule').append("<tr class='table-row' id=" + "'" + childSnapshot.key() + "'" + ">" +
    "<td class='col-xs-3'>" + childSnapshot.val().name + "</td>" +
    "<td class='col-xs-2'>" + childSnapshot.val().destination + "</td>" +
    
    "<td class='col-xs-2'>" + childSnapshot.val().frequency + "</td>" +
    "<td class='col-xs-2'>" + childSnapshot.val().nextTrainFormat + "</td>" +
    
    "<td class='col-xs-2'>" + childSnapshot.val().minutesTillTrain + "</td>" +
    "<td class='col-xs-1'>" + "<input type='submit' value='remove train' class='remove-train btn btn-primary btn-sm'>" + "</td>" + "</tr>");

}, 

$("body").on("click", ".remove-train", function(){
     $(this).closest ('tr').remove();
     getKey = $(this).parent().parent().attr('id');
     dataRef.child(getKey).remove();
}));

}); 