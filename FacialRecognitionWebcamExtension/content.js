

// does not work because content script cannot use chrome apis :(

// chrome.privacy.services.autofillEnabled.get({}, function(details) {
//     if (details.levelOfControl === 'controlled_by_this_extension') {
//         chrome.privacy.services.autofillEnabled.set({ value: false}, function() {
//             if (chrome.runtime.lastError === undefined)
//                 console.log("Set autofill to off.");
//             else
//                 console.log("Error setting autofill: ", chrome.runtime.lastError);
//         });
//     }
//     else if (details.levelOfControl === 'not_controllable')
//         console.log("autofill not controllable by extension");
//     else if (details.levelOfControl === 'controlled_by_other_extensions')
//         console.log("autofill controlled by another extension");
//     else
//         console.log("Level of control: ", details.levelOfControl);
// });


// alert("content script ran");


// decided for a long term connection to allow for more capability

// chrome.extension.sendMessage({}, function(response) {
//     //code to initialize extension
// });
//
// //code to send message to extension
// chrome.runtime.sendMessage({type: "autofillOff"});

// long term connection on a port
var port = chrome.runtime.connect({name: "autofill"});
port.postMessage({msg: "autofillOff"});