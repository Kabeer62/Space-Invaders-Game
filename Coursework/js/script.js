function check() {
    username = document.getElementById("registerName").value;
    myemail = document.getElementById("registerEmail").value;
    mypass1 = document.getElementById("mypass1").value;
    mypass2 = document.getElementById("mypass2").value;

    // alert (x);
    if (username != "") {
        msg = " you have entered " + username;
        alert(" you have entered " + username);
        if (mypass1 != mypass2) {
            msg = msg + "password doesn't match";
            alert("password doesn't match");
        }
    }
    else {
        msg = "id is required";
        alert("id is required");
    }
    f.innerText = msg;
}

function register() {
    //  event.defaultPrevented;
        // firstname= document.getElementById("register").registerName.value;
        // theuser = {
        let username = document.getElementById("registerName").value;
        let email = document.getElementById("registerEmail").value;
        let password = document.getElementById("mypass1").value;
        let confirmPassword = document.getElementById("mypass2").value;
        let f = document.getElementById("feedback");
    // }
    
    
    
    if (username === "" || email === "" || password === "" || confirmPassword === "") {
        alert("Please fill in all the fields.");
        return false;
    }

    // check if passwords match
    if (password !== confirmPassword){
        alert("Password do not match. ");
        return false;
    }

    // Validate email format
    let emailFormat = /\S+@\S+\.\S+/;
    if (!emailFormat.test(email)) {
        alert("Please enter a valid email address. ");
        return false;
    }

    let theuser = {
        username: username,
        email: email,
        password: password,
        score: 0
    };
    // Store user information in localStorage
        let theuserstring = JSON.stringify(theuser);
        localStorage.setItem("currentUser", theuserstring);
        localStorage.setItem(email, theuserstring);

        window.location.href = "profile.html";
        return false;
}


//For Login JS
function login() {
    let theemail = document.getElementById("login").loginEmail.value;
    let thepassword = document.getElementById("login").loginPassword.value;
    let thefeedback = document.getElementById("feedback");

    let storedUser = localStorage.getItem(theemail);

    if (!storedUser) {
        thefeedback.innerText = "User not found";
    } else {
        let theuser = JSON.parse(storedUser);
        if (thepassword === theuser.password) {
            thefeedback.innerText = "You are logged in as " + theuser.username;

            // Store the current user in localStorage for profile display
            localStorage.setItem('currentUser', JSON.stringify(theuser));

            // Redirect to the profile page after login
            window.location.href = "profile.html";
        } else {
            thefeedback.innerText = "Password is incorrect";
        }
    }
    return false;
}



// Profile JS
function displayUserProfile(currentUser) {
    if (currentUser) {
        document.querySelector('.col-4.username').textContent = currentUser.username;
        document.querySelector('.col-4.email').textContent = currentUser.email;
        document.getElementById('number').innerHTML = currentUser.score;
    }
}
    let currentUser = JSON.parse(localStorage.getItem('currentUser'));
    displayUserProfile(currentUser);    

function logOut() {
        localStorage.removeItem('currentUser');
        window.location.href = "login signup.html";
}