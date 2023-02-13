let logged = document.getElementById("logged");
let not_logged = document.getElementById("not-logged");
logged.style.visibility = "hidden";

let aaron_button = document.getElementById("aaron-button");
aaron_button.addEventListener("click", async () => {
  logged.style.visibility = "visible";
  not_logged.style.visibility = "hidden";
  const pass = prompt("Enter password");
  let message = JSON.stringify({ pass: pass });
  console.log("message: ", message);
  const response = await fetch("/api/yoink", {
    method: "POST",
    body: message,
    headers: {
      "Content-Type": "application/json",
    },
  });
  const body = await response.json();
  console.log("body: ", body);
});
