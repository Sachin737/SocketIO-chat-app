const socket = io();

let msgArea = document.querySelector(".message__area");
let textarea = document.querySelector("#textarea");

let Name = "";

do {
  Name = prompt("What's your good name?");
} while (!Name);

textarea.addEventListener("keyup", (ev) => {
  if (ev.key === "Enter") {
    sendMessage(ev.target.value);
  }
});

function sendMessage(msg) {
  let nmsg = {
    user: Name,
    message: msg.trim(),
  };
  //Append

  appendMessage(nmsg, "outgoing");
  BottomScroll();
  textarea.value = "";

  // Send to server

  socket.emit("message", nmsg);
}

function appendMessage(msg, type) {
  let Body = document.createElement("div");
  Body.classList.add(type, "message");

  let res = `
        <h4>${msg.user}</h4>
        <p>${msg.message}</p>
    `;

  Body.innerHTML = res;

  msgArea.appendChild(Body);
}

socket.on("message", (msg) => {
  appendMessage(msg, "incoming");
  BottomScroll();
});

function BottomScroll() {
  msgArea.scrollTop = msgArea.scrollHeight;
}
