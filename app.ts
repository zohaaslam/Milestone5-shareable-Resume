const form = document.getElementById('resume-form') as HTMLFormElement;
const resumeDisplayElement = document.getElementById('resume-display') as HTMLDivElement;
const shareableLinkContainer = document.getElementById('shareable-link-container') as HTMLDivElement;
const shareableLinkElement = document.getElementById('shareable-link') as HTMLAnchorElement;
const downloadPdfButton = document.getElementById('download-pdf') as HTMLButtonElement;
const displayPicture = document.getElementById("displayPicture") as HTMLImageElement;




form.addEventListener('submit', (event: Event) => {
    event.preventDefault();
    
    const username = (document.getElementById('username') as HTMLInputElement).value; // Consistency in ID
    const name = (document.getElementById('name') as HTMLInputElement).value;
    const email = (document.getElementById('email') as HTMLInputElement).value;
    const phone = (document.getElementById('phone') as HTMLInputElement).value;
    const education = (document.getElementById('education') as HTMLTextAreaElement).value;
    const experience = (document.getElementById('experience') as HTMLTextAreaElement).value;
    const skills = (document.getElementById('skills') as HTMLTextAreaElement).value;
    const profilepicture = (document.getElementById("profilepicture") as HTMLInputElement).files?.[0];


    const resumeData = {
        name,
        profilepicture,
        email,
        phone,
        education,
        experience,
        skills,
    };
    
    
    localStorage.setItem(username, JSON.stringify(resumeData));

    // Generate the resume HTML code
    const resumeHTML = `
        
        
         <img src="" id="generatedProfilePicture" alt="Profile Picture" style="width: 150px; height: 150px; border-radius:50%;  border: 2px solid rgb(141, 26, 141);
    object-fit: cover; box-shadow: 0 4px 8px rgb(141, 26, 141)  margin-bottom: 20px;  display: block;
    margin: 0 auto;">
         

        <h2><center>Shareable Resume</center></h2>
        <h2><center>Personal Information</center></h2>
         <p><strong>Name:<span contenteditable="true">${name}</span></strong>
        <p><strong>Email: <span contenteditable="true">${email}</span></strong></p>
        <p><b>Phone: <span contenteditable="true">${phone}</span><strong/></p>
        <h2>Education</h2>
        <p contenteditable="true">${education}</p>
        <h2>Experience</h2>
        <p contenteditable="true">${experience}</p>
        <h2>Skills</h2>
        <p contenteditable="true">${skills}</p>
    `;
    resumeDisplayElement.innerHTML = resumeHTML;

    if (profilepicture) {
        const reader = new FileReader();
        reader.onload = function (e) {
            const generatedProfilePicture = document.getElementById("generatedProfilePicture") as HTMLImageElement;
            if (generatedProfilePicture) {
                generatedProfilePicture.src = e.target?.result as string;
            }
        };
        reader.readAsDataURL(profilepicture);
    }

    //  URL with the username
    const shareableURL = `${window.location.origin}?username=${encodeURIComponent(username)}`;

    //  shareable link
    shareableLinkContainer.style.display = 'block';
    shareableLinkElement.href = shareableURL;
    shareableLinkElement.textContent = shareableURL;
});

// for PDf
downloadPdfButton.addEventListener('click', () => {
    window.print();
});


window.addEventListener('DOMContentLoaded', () => {
    const urlParams = new URLSearchParams(window.location.search);
    const username = urlParams.get('username');

    if (username) {
        const savedResumeData = localStorage.getItem(username);
        if (savedResumeData) {
            const resumeData = JSON.parse(savedResumeData);
            (document.getElementById('username') as HTMLInputElement).value = username;
            (document.getElementById('name') as HTMLInputElement).value = resumeData.name;
            (document.getElementById('email') as HTMLInputElement).value = resumeData.email;
            (document.getElementById('phone') as HTMLInputElement).value = resumeData.phone;
            (document.getElementById('education') as HTMLTextAreaElement).value = resumeData.education;
            (document.getElementById('experience') as HTMLTextAreaElement).value = resumeData.experience;
            (document.getElementById('skills') as HTMLTextAreaElement).value = resumeData.skills;
        }
    }

    const fileInput = document.querySelector("input[type='file']") as HTMLInputElement;
    const profilepicture = document.querySelector("#profilepicture") as HTMLImageElement;
    
    fileInput.addEventListener("change", function () {
        const file = fileInput.files?.[0]; // Get the selected file
        if (file) {
            const reader = new FileReader();
            reader.onload = function (e) {
                profilepicture.src = e.target?.result as string;
            };
            reader.readAsDataURL(file);
        }
    });
    



    // Show the resume output
    resumeDisplayElement.style.display = "block";
});