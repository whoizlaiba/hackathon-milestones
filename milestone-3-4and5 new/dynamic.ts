// Handle the Edit and Done buttons for Education and Experience
const educationEditButton = document.getElementById(
  "education-edit-button"
) as HTMLButtonElement;
const educationDoneButton = document.getElementById(
  "education-done-button"
) as HTMLButtonElement;
const educationTextarea = document.getElementById(
  "education-textarea"
) as HTMLTextAreaElement;

const experienceEditButton = document.getElementById(
  "experience-edit-button"
) as HTMLButtonElement;
const experienceDoneButton = document.getElementById(
  "experience-done-button"
) as HTMLButtonElement;
const experienceTextarea = document.getElementById(
  "experience-textarea"
) as HTMLTextAreaElement;
const editBtn: any = document.getElementById("editBtn");

educationEditButton.addEventListener("click", () => {
  educationTextarea.style.display = "block";
  educationEditButton.style.display = "none";
  educationDoneButton.style.display = "inline-block";
});

educationDoneButton.addEventListener("click", () => {
  educationTextarea.style.display = "none";
  educationEditButton.style.display = "inline-block";
  educationDoneButton.style.display = "none";
});

experienceEditButton.addEventListener("click", () => {
  experienceTextarea.style.display = "block";
  experienceEditButton.style.display = "none";
  experienceDoneButton.style.display = "inline-block";
});

experienceDoneButton.addEventListener("click", () => {
  experienceTextarea.style.display = "none";
  experienceEditButton.style.display = "inline-block";
  experienceDoneButton.style.display = "none";
});

// Handle form submission
const form = document.getElementById("resume-form") as HTMLFormElement;
const resumeDisplayElement = document.getElementById(
  "resume-display"
) as HTMLDivElement;
const shareableLinkContainer = document.getElementById(
  "shareable-link-container"
) as HTMLDivElement;
const shareableLink = document.getElementById(
  "shareable-link"
) as HTMLAnchorElement;

form.addEventListener("submit", (event: Event) => {
  event.preventDefault();

  const name = (document.getElementById("name") as HTMLInputElement).value;
  const email = (document.getElementById("email") as HTMLInputElement).value;
  const phone = (document.getElementById("phone") as HTMLInputElement).value;
  const education = (
    document.getElementById("education-textarea") as HTMLTextAreaElement
  ).value;
  const experience = (
    document.getElementById("experience-textarea") as HTMLTextAreaElement
  ).value;
  const skills = (document.getElementById("skills") as HTMLTextAreaElement)
    .value;
  const username = (document.getElementById("username") as HTMLInputElement)
    .value; // Get username

  const pictureInput = document.getElementById("picture") as HTMLInputElement;
  const pictureFile = pictureInput.files?.[0];

  function displayResume(pictureHTML: string) {
    const resumeHTML = `<div id="page-1">
            <div id="head">
            <h1>${name}</h1>
            </div> 
            <span id="pic">${pictureHTML}</span>    
            
            <div id="contact">
            <h3>CONTACT</h3>
            <p><b>Email:<br></b> ${email}</p>
            <p><b>Phone:<br></b> ${phone}</p>
            </div>
            <div id="education">
            <h3>EDUCATION</h3>
            <p>${education}</p>
            </div>
            <div id="experience">
            <h3>EXPERIENCE</h3>
            <p>${experience}</p>
            </div>
            <div id="skill">
            <h3>SKILLS</h3>
            <p>${skills}</p>
            </div>
            </div>`;

    if (resumeDisplayElement) {
      resumeDisplayElement.innerHTML = resumeHTML;
      resumeDisplayElement.style.display = "block";
      form.style.display = "none";
      shareableLinkContainer.style.display = "block";
      pdfButton.style.display = "block";
      editBtn.style.display = "block";
      experienceEditButton.style.display = "block";
      educationEditButton.style.display = "block";
      educationTextarea.style.display = "none";
      experienceTextarea.style.display = "none";
    } else {
      console.error("The Resume Display Element Is Missing");
    }
    editBtn.addEventListener("click", () => {
      resumeDisplayElement.style.display = "none";
      editBtn.style.display = "none";
      form.style.display = "block";
      shareableLinkContainer.style.display = "none";
      pdfButton.style.display = "none";
    });
    // Generate and display shareable link
    const shareableURL = `${
      window.location.origin
    }?username=${encodeURIComponent(username)}`;
    if (shareableLink) {
      shareableLink.href = shareableURL;
      shareableLink.textContent = shareableURL;
      shareableLinkContainer.style.display = "block";
    }

    // Save resume data in localStorage
    localStorage.setItem(
      username,
      JSON.stringify({
        name,
        email,
        phone,
        education,
        experience,
        skills,
        pictureHTML,
      })
    );
  }

  if (pictureFile) {
    const reader = new FileReader();
    reader.onload = (e) => {
      const pictureHTML = `<img src="${e.target?.result}" alt="Profile Picture" id="image">`;
      displayResume(pictureHTML);
    };
    reader.readAsDataURL(pictureFile);
  } else {
    displayResume("");
  }
});

// Handle PDF generation
const pdfButton = document.getElementById("pdf-button") as HTMLButtonElement;

pdfButton.addEventListener("click", () => {
  const resumeContent = document.getElementById(
    "resume-display"
  ) as HTMLDivElement;

  if (resumeContent) {
    // Use html2pdf library to generate and download the PDF
    const opt = {
      margin: 0.5,
      filename: "resume.pdf",
      image: { type: "jpeg", quality: 0.98 },
      html2canvas: { scale: 2 },
      jsPDF: { unit: "in", format: "letter", orientation: "portrait" },
    };
    html2pdf().from(resumeContent).set(opt).save();
  } else {
    console.error("Resume content is missing");
  }
});

// Prefill the form based on the username in the URL
window.addEventListener("DOMContentLoaded", () => {
  const urlParams = new URLSearchParams(window.location.search);
  const username = urlParams.get("username");

  if (username) {
    // Autofill form if data is found in localStorage
    const savedResumeData = localStorage.getItem(username);
    if (savedResumeData) {
      const resumeData = JSON.parse(savedResumeData);
      (document.getElementById("username") as HTMLInputElement).value =
        username;
      (document.getElementById("name") as HTMLInputElement).value =
        resumeData.name;
      (document.getElementById("email") as HTMLInputElement).value =
        resumeData.email;
      (document.getElementById("phone") as HTMLInputElement).value =
        resumeData.phone;
      (
        document.getElementById("education-textarea") as HTMLTextAreaElement
      ).value = resumeData.education;
      (
        document.getElementById("experience-textarea") as HTMLTextAreaElement
      ).value = resumeData.experience;
      (document.getElementById("skills") as HTMLTextAreaElement).value =
        resumeData.skills;

      if (resumeData.pictureHTML) {
        resumeDisplayElement.innerHTML =
          resumeData.pictureHTML +
          `
          
          <h3>Personal Information</h3>
          <p><b>Name:</b> ${resumeData.name}</p>
          <p><b>Email:</b> ${resumeData.email}</p>
          <p><b>Phone:</b> ${resumeData.phone}</p>
          <h3>Education</h3>
          <p>${resumeData.education}</p>
          <h3>Experience</h3>
          <p>${resumeData.experience}</p>
          <h3>Skills</h3>
          <p>${resumeData.skills}</p>`;
      }
    }
  }
});
