
var clientId = localStorage.clientId
var clientSecret = localStorage.clientSecret
var refreshToken = localStorage.rftoken
var _0xf3c = ""
    function changeKey(t) {
        _0xf3c = t
    }
    
    var url = "https://api.dropbox.com/oauth2/token";

    var xhr = new XMLHttpRequest();
    xhr.open("POST", url);

    xhr.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");
    xhr.setRequestHeader("Authorization", "Basic "+btoa(clientId +":"+clientSecret));

    xhr.onreadystatechange = function () {
    if (xhr.readyState === 4) {
        console.log(xhr.status);
        changeKey(JSON.parse(xhr.responseText).access_token);
    }};

    var data = "grant_type=refresh_token&refresh_token="+refreshToken;

    xhr.send(data);
function closeModal() {
    $("#dialog").dialog( "close" );
    $("#dialog_load").dialog( "close" );
}
function waw() {
    $( "#dialog" ).dialog( "open" );
}
function wpw() {
    $( "#dialog_load" ).dialog( "open" );
}
$( "#dialog,#dialog_load" ).dialog({
    resizable: false,
  height: "auto",
  width: 400,
  modal: true,
    autoOpen: false,
});


var db;
var request = window.indexedDB.open('tempFileDB', 1);

request.onerror = function(event) {
  console.error('Error opening IndexedDB', event);
};

request.onsuccess = function(event) {
  db = event.target.result;
  console.log('IndexedDB opened successfully');
};

request.onupgradeneeded = function(event) {
  db = event.target.result;
  db.createObjectStore('tempFiles', {keyPath: 'id'});
  console.log('IndexedDB object store created');
};

function saveTempFile(fileData) {
  var transaction = db.transaction(['tempFiles'], 'readwrite');
  var objectStore = transaction.objectStore('tempFiles');
  var request = objectStore.add({id: 'tempFile', data: fileData});

  request.onsuccess = function(event) {
    console.log('File saved successfully');
  };

  request.onerror = function(event) {
    console.error('Error saving file', event);
  };
}

// Remove the file from IndexedDB when the window is closed
window.addEventListener('beforeunload', function() {
  var transaction = db.transaction(['tempFiles'], 'readwrite');
  var objectStore = transaction.objectStore('tempFiles');
  var request = objectStore.delete('tempFile');

  request.onsuccess = function(event) {
    console.log('File removed successfully');
  };

  request.onerror = function(event) {
    console.error('Error removing file', event);
  };
});
function getTempFile() {
  var transaction = db.transaction(['tempFiles'], 'readonly');
  var objectStore = transaction.objectStore('tempFiles');
  var request = objectStore.get('tempFile');

  request.onsuccess = function(event) {
    var fileData = event.target.result.data;
    console.log('File retrieved successfully:', fileData);
    // Use the file data here...
  };

  request.onerror = function(event) {
    console.error('Error retrieving file', event);
  };
}
