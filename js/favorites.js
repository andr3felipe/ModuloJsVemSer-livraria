document.addEventListener("DOMContentLoaded", function () {
  // Hide the content initially
  document.body.style.display = "none";

  // Check if the user is logged in
  if (!verifyLogin()) {
    // If not logged in, redirect to the login page
    window.location.href = "../index.html";
  } else {
    // If logged in, show the content
    document.body.style.display = "block";
    // Add any additional code you want to execute before the content is shown
  }
});

function verifyLogin() {
  const user = JSON.parse(localStorage.getItem("user"));
  return user != null;
}
