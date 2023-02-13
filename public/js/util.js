let aaron_button = document.getElementById("aaron-button");
aaron_button.addEventListener("click", async () => {
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
