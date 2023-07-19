let form = false;
let id = 0;
let allEvents = [];
var filteredEvents = [];
let shownPanels = document.createElement('div');
shownPanels.setAttribute("id", "shownPanels");
$(document).ready(function() {

  // GLOBAL VARIABLES
  document.getElementById("defaultOpen").click();
  let eventForm = document.querySelector(".eventForm");
  let eventButton = document.querySelector("#eventButton");
  let submitButton = document.querySelector(".submitButton");
  $(".backdrop").hide();
  window.addEventListener('load', function() {
    document.querySelector('input[type="file"]').addEventListener('change', function() {
        if (this.files && this.files[0]) {
            var img = document.querySelector('img');
            img.onload = () => {
                URL.revokeObjectURL(img.src);  // no longer needed, free memory
            }
  
            //img.src =  // set src to blob url
            $("#imgTag").val(URL.createObjectURL(this.files[0]));
        }
    });
  });
  
});

function run() {
  // Get the element with id="defaultOpen" and click on it
}

function openPage(evt, pageName) {
  // Declare all variables
  var i, tabcontent, tablinks;

  // Get all elements with class="tabcontent" - hide them
  tabcontent = document.getElementsByClassName("tabcontent");
  for (i = 0; i < tabcontent.length; i++) {
    tabcontent[i].style.display = "none";
  }

  // Get all elements with class="tablinks" - remove "active" class
  tablinks = document.getElementsByClassName("tablinks");
  for (i = 0; i < tablinks.length; i++) {
    tablinks[i].className = tablinks[i].className.replace("active", "");
  }

  // Show current tab - add "active" class to the button that opened the tab
  document.getElementById(pageName).style.display = "block";
  evt.currentTarget.className += " active";
}

//Create event and display it in HTML
function addEvent(title, description, info, id, img, event, isNew) {
  var newEvent;
  
  //Check if addEvent is meant to create new event or display old event
  if(isNew) {
    newEvent = new Event(title, description, info, id, img);
    allEvents.push(newEvent);      
  } else {
    newEvent = event;
  }

  //Set up portfolio variable, append panels
  let portfolio = document.getElementById("portfolio");
  portfolio.append(shownPanels);

  //Set up panel variable (class & id)
  let panel = document.createElement('div');
  panel.setAttribute("class", "panel");
  panel.setAttribute("id", "panel_" + newEvent.id);

  //Set up panelLeft & panelRight variables for formatting
  let panelLeft = document.createElement('div');
  panelLeft.setAttribute("class", "panelLeft");
  panelLeft.setAttribute("id", "panelLeft_" + newEvent.id);
  let panelRight = document.createElement('div');
  panelRight.setAttribute("class", "panelRight");
  panelRight.setAttribute("id", "panelRight_" + newEvent.id);

  //Set up title variable (class & id)
  let titleDiv = document.createElement('div');
  titleDiv.setAttribute("class", "title");
  titleDiv.setAttribute("id", "title_" + newEvent.id);

  //Set up description variable (class & id)
  let descriptionDiv = document.createElement('div');
  descriptionDiv.setAttribute("class", "description");
  descriptionDiv.setAttribute("id", "description_" + newEvent.id);

  //Set up info variable (class & id)
  let infoDiv = document.createElement('div');
  infoDiv.setAttribute("class", "info");
  infoDiv.setAttribute("id", "info_" + newEvent.id);

  //Set up id variable (class & id)
  let idDiv = document.createElement('div');
  idDiv.setAttribute("class", "id");
  idDiv.setAttribute("id", "id_" + newEvent.id);
  //Set up img variable (class & id)
  let imgDiv = document.createElement('img');
  imgDiv.setAttribute("class", "img");
  imgDiv.setAttribute("id", "img_" + newEvent.id);

  //Append all class constructor elements to set variables
  titleDiv.append(newEvent.title);
  descriptionDiv.append(newEvent.description);
  infoDiv.append(newEvent.info);
  idDiv.append(newEvent.id);
  imgDiv.setAttribute("src", document.getElementById("imgTag").value);
  console.log(document.getElementById("imgTag").value);
  console.log(imgDiv);

  //Append variables to panels (left, right, & full)
  panelLeft.append(titleDiv);
  panelLeft.append(descriptionDiv);
  panelRight.append(infoDiv);
  panelRight.append(imgDiv);
  panelLeft.append(idDiv);
  panel.append(panelLeft);
  panel.append(panelRight);

  //Show all panels
  shownPanels.append(panel);
  console.log(panel);
  console.log(newEvent.upperTitle);
  
}

function toggleForm() {

  if(!form){
    $(".eventForm").show();
    form = true;
    $(".backdrop").show();
  }else{
    // var event = new Event();
    $(".eventForm").hide();
    $(".backdrop").hide();
    form = false;
    var titleText = document.getElementById("titleText").value;
    console.log(titleText);
    var descriptionText = document.getElementById("descriptionText").value;
    console.log(descriptionText);
    var infoText = document.getElementById("infoText").value;
    console.log(infoText);
    var imgUrl = document.getElementById("imgUrl").value;
    console.log(imgUrl);

    // If you were to paste a url link this is the function to format it
    var imgCut = imgUrl.lastIndexOf("\\");
    imgUrl = imgUrl.substring(imgCut+1, imgUrl.length);
    console.log(imgUrl);

    console.log(id);
    addEvent(titleText, descriptionText, infoText, id, imgUrl,"",true);
    id++;
    
  }
}


// Exit form function
function exitForm(){
  $(".eventForm").hide();
  $(".backdrop").hide();
  form = false;
}

// On click toggle form function
function windowOnClick(event) {
  if(event.target === eventForm) {
    toggleForm();
  }
}

// Set event listeners for event button, submitbutton, and window
document.onload = function() {
  eventButton.addEventListener("click", toggleForm);
  submitButton.addEventListener("click", toggleForm);
  window.addEventListener("click", windowOnClick);
}

//algo #1
class Event {

  constructor(t, d, i, id, img) {
    this.title = t;
    this.upperTitle = t.toUpperCase();
    this.description = d;
    this.upperDescription = d.toUpperCase();
    this.info = i;
    this.upperInfo = i.toUpperCase();
    this.id = id;
    this.img = img;
  }
  
}

//algo 2
function sort(select){
  console.log("function triggered");
  console.log($(select).val());
  if ($(select).val() == "alph") {
    console.log("alpha");
    organizeAlpha();
  }else{
    console.log("id");
    organizeId();  
  }
}

//ID
//algo 3
function organizeId(){
  console.log("id run");
  shownPanels.innerHTML = "";
  if(filteredEvents.length < allEvents.length){
    filteredEvents = allEvents;
  }
  let n = filteredEvents.length;

  for(let i = 0; i < n; i++){
    let min = i;
    for(let j = i+1; j < n; j++){
      if(filteredEvents[j].id < filteredEvents[min].id){
        min = j;
      }
    }
    //Swap smallest with i^th element
    if(min != i){
      let temp = filteredEvents[i];
      filteredEvents[i] = filteredEvents[min];
      filteredEvents[min] = temp;
    }
  }
  for(let k = 0; k < filteredEvents.length; k++){
    addEvent(filteredEvents[k].title, filteredEvents[k].description, filteredEvents[k].info, filteredEvents[k].id, filteredEvents[k].img, filteredEvents[k], false);
  }
}

//Alphabet
//algo 4
function organizeAlpha(){
  console.log("alph run");
  shownPanels.innerHTML = "";
  let n = filteredEvents.length;
  let m = 0;
  if(n < allEvents.length){
    filteredEvents = allEvents;
    n = filteredEvents.length;
  }
  for(var i = 0; i < n; i++){
    var a = filteredEvents[i];
    var titleA = a.title.toLowerCase();
    for(var j = i+1; j < n; j++){
      var b = filteredEvents[j];
      var titleB = b.title.toLowerCase();
      console.log("apple" > "banana");
      if (titleA > titleB){
        a = filteredEvents[j];
        m = j;
        console.log("no swap");
      }
    }
    if (a != filteredEvents[i]){
      temp = filteredEvents[i];
      filteredEvents[i] = filteredEvents[m];
      filteredEvents[m] = temp;
      console.log("swap");
    }
    console.log(a);
    console.log(b);
  }
    
  for(let k = 0; k < filteredEvents.length; k++){
    addEvent(filteredEvents[k].title, filteredEvents[k].description, filteredEvents[k].info, filteredEvents[k].id, filteredEvents[k].img, filteredEvents[k], false);
  }
}

//Search function
//algo 5
function search() {
  var input = document.getElementById("myInput");
  console.log(input);
  var filterTerm = input.value.toUpperCase();
  filteredEvents = [];
  shownPanels.innerHTML = "";

  if(filterTerm.length = 0){
    // If there is no search term than display original panels
    for(let i = 0; i < allEvents.length; i++){
      addEvent(allEvents[i].title, allEvents[i].description, allEvents[i].info, allEvents[i].id, allEvents[i].img, allEvents[i], false);
    }
    
  }else{
    // Check
    for(let i = 0; i < allEvents.length; i++){
      if(allEvents[i].upperTitle.indexOf(filterTerm) > -1 || allEvents[i].upperDescription.indexOf(filterTerm) > -1 || allEvents[i].upperInfo.indexOf(filterTerm) > -1){
        filteredEvents.push(allEvents[i]);
      }
    }
    
    // Set shownPanels to nothing.
    shownPanels.innerHTML = "";
    console.log(filteredEvents);
    // Run through resultArray and run addEvent (display the new panels).
    for(let i = 0; i < filteredEvents.length; i++){
      addEvent(filteredEvents[i].title, filteredEvents[i].description, filteredEvents[i].info, filteredEvents[i].id, filteredEvents[i].img, filteredEvents[i], false);
    }
  }
}
