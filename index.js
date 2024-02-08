$(document).ready(function () {
    $("#signUpBtn").click(function (event) {
      event.preventDefault();
      let name = $("#userName").val();
      let email = $("#email").val();
      let password = $("#password").val();
  
      if (name == "") {
        let nameError = document.getElementById("nameError");
        nameError.textContent = "field cannot be empty";
        nameError.style.color = "red";
        error = true;
        return false;
      } else if (name.length <= 2) {
        let nameError = document.getElementById("nameError");
        nameError.textContent = "Length too small";
        nameError.style.color = "red";
        error = true;
        return false;
      } else {
        let nameError = document.getElementById("nameError");
        nameError.textContent = "good";
        nameError.style.color = "green";
        error = false;
      }
      if (email == "") {
        let emailError = document.getElementById("emailError");
        emailError.textContent = "email field cannot be empty";
        emailError.style.color = "red";
        error = true;
        return false;
      } else if (
        email.indexOf("@") < 1 ||
        email.indexOf("@") > email.length - 5
      ) {
        let emailError = document.getElementById("emailError");
        emailError.textContent = "@ is required";
        emailError.style.color = "red";
        error = true;
        return false;
      } else {
        let emailError = document.getElementById("emailError");
        emailError.textContent = "good";
        emailError.style.color = "green";
        error = false;
      }
  
      let userDetails = {
        name: name,
        email: email,
        password: password,
      };
  
      $.ajax({
        url: "http://todo.reworkstaging.name.ng/v1/users",
        method: "POST",
        contentType: "application/json",
        data: JSON.stringify(userDetails),
        success: function (response) {
          console.log("User registration successful:", response);
          alert("Your registration is successful!");
        },
        error: function (error) {
          console.log("Registration error:", error);
          alert("Registration Error.");
        },
      });
  
      $("form")[0].reset();
    });
  
    $("#loginBtn").click(function (event) {
      event.preventDefault();
      let email = $("#email").val();
      let password = $("#password").val();
  
      if (email == "") {
        let emailError = document.getElementById("emailError");
        emailError.textContent = "email field cannot be empty";
        emailError.style.color = "red";
        error = true;
        return false;
    //   } else if (
    //     email.indexOf("@") < 1 ||
    //     email.indexOf("@") > email.length - 5
      ) {
        let emailError = document.getElementById("emailError");
        emailError.textContent = "@ is required";
        emailError.style.color = "red";
        error = true;
        return false;
      } else {
        let emailError = document.getElementById("emailError");
        emailError.textContent = "good";
        emailError.style.color = "green";
        error = false;
      }
  
      let userDetails = {
        email: email,
        password: password,
      };
  
      $.ajax({
        url: "http://todo.reworkstaging.name.ng/v1/users/login",
        method: "POST",
        contentType: "application/json",
        data: JSON.stringify(userDetails),
        success: function (feedback) {
          console.log("Login response:", feedback);
  
          if (feedback.code == 404 || feedback.type == "NOT_EXISTS") {
            alert("Sorry, your username or password is incorrect.");
          } else {
            alert("Login successful");
            window.location.href = "homepage.html";
          }
        },
        error: function (error) {
          console.log("Login error:", error);
          alert("Login Error.");
        },
      });
  
      $("form")[0].reset();
    });
  });
  