let logged = document.getElementById("logged");
let not_logged = document.getElementById("not-logged");
logged.style.visibility = "hidden";

let aaron_button = document.getElementById("aaron-button");
aaron_button.addEventListener("click", async () => {
  logged.style.visibility = "visible";
  not_logged.style.visibility = "hidden";
  const pass = prompt("Enter password");
  let message = JSON.stringify({ pass: pass });
  const response = await fetch("/api/yoink", {
    method: "POST",
    body: message,
    headers: {
      "Content-Type": "application/json",
    },
  })
    .then((resp) => resp.json())
    .then((json) => {
      console.log("json: ", json);
      setTimeout(() => {
        window.location.replace("https://aaron.lieber.men/leaderboard");
      }, 1500);
    });
});
