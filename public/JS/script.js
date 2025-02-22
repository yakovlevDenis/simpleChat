$(document).ready(() => {
  const socket = io.connect();
  const nickname = $(".login-form #nickname");
  const loginForm = $(".login-form");
  const messageForm = $(".message-form");
  const messagesList = $(".messages-list");
  const usersList = $(".users-list");
  const messageInput = $("#message");
  loginForm.submit((e) => {
    e.preventDefault();
    console.log(nickname.val());
    socket.emit("login", nickname.val());
  });
  messageForm.submit((e) => {
    e.preventDefault();   //!!!without post
    socket.emit("message", messageInput.val());
    messageInput.val("");
  });
  // listeners login
  socket.on("login", (data) => {
    if (data.status === "OK") {
      $(".login-form-container").addClass("d-none");
      messageForm.removeClass("d-none");
      messagesList.removeClass("d-none");
      usersList.removeClass("d-none");
    }
  });
  // listener message
  socket.on("new message", (data) => {
    let newMsg = `<a class="list-group-item list-group-item-action">
                <div class="d-flex w-100 justify-content-between">
                  <h5 class="mb-1">${data.nickname}</h5>
                  <small class="text-muted">${new Date(data.time)}</small>
                </div>
                <p class="mb-1">${data.message}</p>
              </a>`;
    messagesList.children("ul").append(newMsg);
  });

  socket.on("users", (data) => {
    usersList.children("ul").html(" ");
    for (let index = 0; index < data.users.length; index++) {
      usersList
        .children("ul")
        .append(`<li class="list-group-item">${data.users[index]}</li>`);
    }
  });
});
