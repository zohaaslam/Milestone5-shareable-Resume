var form = document.getElementById('resume-form');
var resumeDisplayElement = document.getElementById('resume-display');
var shareableLinkContainer = document.getElementById('shareable-link-container');
var shareableLinkElement = document.getElementById('shareable-link');
var downloadPdfButton = document.getElementById('download-pdf');
var displayPicture = document.getElementById("displayPicture");
form.addEventListener('submit', function (event) {
    var _a;
    event.preventDefault();
    var username = document.getElementById('username').value; // Consistency in ID
    var name = document.getElementById('name').value;
    var email = document.getElementById('email').value;
    var phone = document.getElementById('phone').value;
    var education = document.getElementById('education').value;
    var experience = document.getElementById('experience').value;
    var skills = document.getElementById('skills').value;
    var profilepicture = (_a = document.getElementById("profilepicture").files) === null || _a === void 0 ? void 0 : _a[0];
    var resumeData = {
        name: name,
        profilepicture: profilepicture,
        email: email,
        phone: phone,
        education: education,
        experience: experience,
        skills: skills,
    };
    localStorage.setItem(username, JSON.stringify(resumeData));
    // Generate the resume HTML code
    var resumeHTML = "\n        \n        \n         <img src=\"\" id=\"generatedProfilePicture\" alt=\"Profile Picture\" style=\"width: 150px; height: 150px; border-radius:50%;  border: 2px solid rgb(141, 26, 141);\n    object-fit: cover; box-shadow: 0 4px 8px rgb(141, 26, 141)  margin-bottom: 20px;  display: block;\n    margin: 0 auto;\">\n         \n\n        <h2><center>Shareable Resume</center></h2>\n        <h2><center>Personal Information</center></h2>\n         <p><strong>Name:<span contenteditable=\"true\">".concat(name, "</span></strong>\n        <p><strong>Email: <span contenteditable=\"true\">").concat(email, "</span></strong></p>\n        <p><b>Phone: <span contenteditable=\"true\">").concat(phone, "</span><strong/></p>\n        <h2>Education</h2>\n        <p contenteditable=\"true\">").concat(education, "</p>\n        <h2>Experience</h2>\n        <p contenteditable=\"true\">").concat(experience, "</p>\n        <h2>Skills</h2>\n        <p contenteditable=\"true\">").concat(skills, "</p>\n    ");
    resumeDisplayElement.innerHTML = resumeHTML;
    if (profilepicture) {
        var reader = new FileReader();
        reader.onload = function (e) {
            var _a;
            var generatedProfilePicture = document.getElementById("generatedProfilePicture");
            if (generatedProfilePicture) {
                generatedProfilePicture.src = (_a = e.target) === null || _a === void 0 ? void 0 : _a.result;
            }
        };
        reader.readAsDataURL(profilepicture);
    }
    //  URL with the username
    var shareableURL = "".concat(window.location.origin, "?username=").concat(encodeURIComponent(username));
    //  shareable link
    shareableLinkContainer.style.display = 'block';
    shareableLinkElement.href = shareableURL;
    shareableLinkElement.textContent = shareableURL;
});
// for PDf
downloadPdfButton.addEventListener('click', function () {
    window.print();
});
window.addEventListener('DOMContentLoaded', function () {
    var urlParams = new URLSearchParams(window.location.search);
    var username = urlParams.get('username');
    if (username) {
        var savedResumeData = localStorage.getItem(username);
        if (savedResumeData) {
            var resumeData = JSON.parse(savedResumeData);
            document.getElementById('username').value = username;
            document.getElementById('name').value = resumeData.name;
            document.getElementById('email').value = resumeData.email;
            document.getElementById('phone').value = resumeData.phone;
            document.getElementById('education').value = resumeData.education;
            document.getElementById('experience').value = resumeData.experience;
            document.getElementById('skills').value = resumeData.skills;
        }
    }
    var fileInput = document.querySelector("input[type='file']");
    var profilepicture = document.querySelector("#profilepicture");
    fileInput.addEventListener("change", function () {
        var _a;
        var file = (_a = fileInput.files) === null || _a === void 0 ? void 0 : _a[0]; // Get the selected file
        if (file) {
            var reader = new FileReader();
            reader.onload = function (e) {
                var _a;
                profilepicture.src = (_a = e.target) === null || _a === void 0 ? void 0 : _a.result;
            };
            reader.readAsDataURL(file);
        }
    });
    // Show the resume output
    resumeDisplayElement.style.display = "block";
});
