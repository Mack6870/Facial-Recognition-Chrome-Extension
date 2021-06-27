
// short term connection
// chrome.runtime.onMessage.addListener(function(request, sender, sendResponse) {
//     if (request.type == "autofillOff"){
//         console.log("got autofill off");
//         chrome.privacy.services.autofillEnabled.get({}, function(details) {
//             if (details.levelOfControl === 'controlled_by_this_extension') {
//                 chrome.privacy.services.autofillEnabled.set({ value: false}, function() {
//                     if (chrome.runtime.lastError === undefined){
//                         console.log("Set autofill to off.");
//                         alert("background caught the autofill off and applied it");
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

// long term connection
chrome.runtime.onConnect.addListener(function(port) {
    console.assert(port.name == "autofill");
    port.onMessage.addListener(function(message) {
        if (message.msg == "autofillOff"){
            console.log("got autofill off");
            chrome.privacy.services.autofillEnabled.get({}, function(details) {
                if (details.levelOfControl === 'controlled_by_this_extension') {
                    chrome.privacy.services.autofillEnabled.set({value: false}, function () {
                        if (chrome.runtime.lastError === undefined) {
                            console.log("Set autofill to off.");
                            chrome.privacy.services.autofillEnabled.get({}, function (details) {
                                console.log(details.value)
                            });
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
        else
            console.log("error with message recieved");
    });
});