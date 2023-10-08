// src/utils/usefulFunc.js
export function displayMessage(message, type = "error", onCloseAllModals, onOkClicked) {
    const messageBox = document.createElement("div");
    const messageText = document.createElement("p");
    const okButton = document.createElement("button");

    okButton.innerText = "OK";
    okButton.onclick = function() {
        // Close the message box
        document.body.removeChild(messageBox);

         // Close all modals by invoking the callback
         if(onCloseAllModals) {
            onCloseAllModals();
        }

        // Invoke onOkClicked if provided
        if(onOkClicked) {
            onOkClicked();
        }
    };

    // Style the message box
    messageBox.style.position = "fixed";
    messageBox.style.top = "50%";
    messageBox.style.left = "50%";
    messageBox.style.transform = "translate(-50%, -50%)";
    messageBox.style.padding = "20px";
    messageBox.style.borderRadius = "8px";
    messageBox.style.zIndex = 9999;  // To ensure it's above other elements
    messageBox.style.display = "flex";
    messageBox.style.flexDirection = "column";
    messageBox.style.alignItems = "center";  // Horizontally center the content
    messageBox.style.justifyContent = "center";  // Vertically center the content

    // Style based on the type of message
    if (type === "success") {
        messageBox.style.backgroundColor = "green";
        messageBox.style.color = "white";
    } else {
        messageBox.style.backgroundColor = "red";
        messageBox.style.color = "white";
    }

    // Add the message text and OK button to the message box
    messageText.innerText = message;
    messageBox.appendChild(messageText);
    messageBox.appendChild(okButton);

    // Add the message box to the body
    document.body.appendChild(messageBox);
}
