

// this method does not work - page is already loaded and only runs if extension window is open

// chrome.tabs.onUpdated.addListener( function (tabId, changeInfo, tab) {
//     if (changeInfo.status == 'complete') {
//         chrome.privacy.services.autofillEnabled.get({}, function(details) {
//             if (details.levelOfControl === 'controlled_by_this_extension') {
//                 chrome.privacy.services.autofillEnabled.set({ value: false}, function() {
//                     if (chrome.runtime.lastError === undefined)
//                         console.log("Set autofill to off.");
//                     else
//                         console.log("Error setting autofill: ", chrome.runtime.lastError);
//                 });
//             }
//             else if (details.levelOfControl === 'not_controllable')
//                 console.log("autofill not controllable by extension");
//             else if (details.levelOfControl === 'controlled_by_other_extensions')
//                 console.log("autofill controlled by another extension");
//             else
//                 console.log("Level of control: ", details.levelOfControl);
//         });
//     }
// });
chrome.privacy.services.autofillEnabled.onChange.addListener(
    function (details) {
        console.log("autofill was change, value of: ", details.value);
        console.log("Is it specific to incognito: ", details.value);

    });

//  moved this code to a background script so it is always run even when extension page isn't open
// chrome.runtime.onMessage.addListener(function(request, sender, sendResponse) {
//     if (request.type == "autofillOff"){
//         console.log("got autofill off");
//         chrome.privacy.services.autofillEnabled.get({}, function(details) {
//             if (details.levelOfControl === 'controlled_by_this_extension') {
//                 chrome.privacy.services.autofillEnabled.set({ value: false}, function() {
//                     if (chrome.runtime.lastError === undefined){
//                         console.log("Set autofill to off.");
//                         document.getElementById('resultText').innerHTML = "Press Unlock to allow autofill";
//                         document.getElementById('resultText').setAttribute('style', 'color: black');
//                         chrome.privacy.services.autofillEnabled.get({}, function(details) {
//                             console.log(details.value)
//                         });
//                     }
//                     else
//                         console.log("Error setting autofill: ", chrome.runtime.lastError);
//                 });
//             }
//             else if (details.levelOfControl === 'not_controllable')
//                 console.log("autofill not controllable by extension");
//             else if (details.levelOfControl === 'controlled_by_other_extensions')
//                 console.log("autofill controlled by another extension");
//             else
//                 console.log("Level of control: ", details.levelOfControl);
//         });
//     }
//
//     sendResponse();
// });


jQuery(document).ready(function()
{
  document.getElementById("unlock").addEventListener("click", webcam);

  function webcam(){
    $.ajax({
        type: "POST",
        dataType: 'text',
        url: "http://127.0.0.1:5000/",
        success: function(msg) {
            if (msg === "user auth"){

                console.log("Give success method and autofill the data here.");

                chrome.privacy.services.autofillEnabled.get({}, function(details) {
                    if (details.levelOfControl === 'controlled_by_this_extension') {
                        chrome.privacy.services.autofillEnabled.set({ value: true }, function() {
                            if (chrome.runtime.lastError === undefined) {
                                console.log("Set autofill to on.");
                                document.getElementById('resultText').innerHTML = "Facial Recognition Sucessful";
                                document.getElementById('resultText').setAttribute('style', 'color: green');
                            }
                            else
                                console.log("Error setting autofill: ", chrome.runtime.lastError);
                        });
                    }
                    else if (details.levelOfControl === 'not_controllable')
                        console.log("autofill not controllable by extension");
                    else if (details.levelOfControl === 'controlled_by_other_extensions')
                        console.log("autofill controlled by another extension");
                    else
                        console.log("Level of control: ", details.levelOfControl);
                });

            }
            else if (msg === "no auth"){
                // can make this display on extension.
                console.log("User is not authorized to use autofill.");
                chrome.privacy.services.autofillEnabled.get({}, function(details) {
                    if (details.levelOfControl === 'controlled_by_this_extension') {
                        chrome.privacy.services.autofillEnabled.set({ value: false }, function() {
                            if (chrome.runtime.lastError === undefined) {
                                console.log("Set autofill to off.");
                                document.getElementById('resultText').innerHTML = "Facial Recognition Unsucessful";
                                document.getElementById('resultText').setAttribute('style', 'color: red');
                            }
                            else
                                console.log("Error setting autofill: ", chrome.runtime.lastError);
                        });
                    }
                    else if (details.levelOfControl === 'not_controllable')
                        console.log("autofill not controllable by extension");
                    else if (details.levelOfControl === 'controlled_by_other_extensions')
                        console.log("autofill controlled by another extension");
                    else
                        console.log("Level of control: ", details.levelOfControl);
                });
            }
            else{
                console.log("Error: Return value unexpected.");
            }

        },
        error: function (xhr, status, error) {
            console.log(error);
        }
    });
    }
});
