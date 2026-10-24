// Selects the HTML elements used in the application
const applicationForm = document.querySelector("#applicationForm");
const position = document.querySelector("#position");
const company = document.querySelector("#company");
const jobLink = document.querySelector("#jobLink");
const applicationDeadline = document.querySelector("#applicationDeadline");
const applicationList = document.querySelector("#applicationList");
const applicationCounter = document.querySelector("#applicationCounter");

// Highlights invalid required fields and removes the highlight when the user starts typing
[position, company, jobLink].forEach(function (field) {
    field.addEventListener("invalid", function () {
        field.classList.add("invalid-field");
    });
    field.addEventListener("input", function () {
        field.classList.remove("invalid-field");
    });
});

// Saves all applications to local storage
function saveApplications() {
    const applications = [];
    const applicationCards = applicationList.querySelectorAll(".application-card");

    applicationCards.forEach(function (card) {
        const deadlineText = card.querySelector(".deadline").textContent;
        const application = {
            position: card.querySelector("h3").textContent,
            company: card.querySelector(".company").textContent,
            jobLink: card.querySelector("a")?.href || "",
            applicationDeadline: deadlineText.replace("Application deadline: ", "").replace("Not specified", ""),
            status: card.querySelector("select").value
        };
        applications.push(application);
    });

    localStorage.setItem("applications", JSON.stringify(applications));
}

// Creates a card for a new job application
function createApplicationCard(application) {
    const applicationCard = document.createElement("div");
    applicationCard.classList.add("application-card");

    const positionHeading = document.createElement("h3");
    positionHeading.textContent = application.position;

    const companyParagraph = document.createElement("p");
    companyParagraph.classList.add("company");
    companyParagraph.textContent = application.company;

    const linkElement = document.createElement("a");
    if (application.jobLink) {
        linkElement.href = application.jobLink;
        linkElement.textContent = "View job advertisement";
        linkElement.target = "_blank";
        linkElement.rel = "noopener noreferrer";
    }

    const dateParagraph = document.createElement("p");
    dateParagraph.classList.add("deadline");
    dateParagraph.textContent = application.applicationDeadline
        ? "Application deadline: " + application.applicationDeadline
        : "Application deadline: Not specified";
    
    const statusSelect = document.createElement("select");
    const statuses = ["Interested", "Applied", "Interview", "Accepted", "Rejected"];

    statuses.forEach(function (statusOption) {
        const option = document.createElement("option");
        option.value = statusOption;
        option.textContent = statusOption;
        statusSelect.append(option);
    });

    statusSelect.value = statuses.includes(application.status)
        ? application.status
        : "Interested";
    
    statusSelect.addEventListener("change", saveApplications);
    
    const deleteButton = document.createElement("button");
    deleteButton.textContent = "Delete";
    deleteButton.type = "button";

    deleteButton.addEventListener("click", function () {
        applicationCard.remove();
        applicationCounter.textContent = "Total applications: " + applicationList.children.length;
        saveApplications();
    });

    applicationCard.append(positionHeading, companyParagraph);
    
    if (application.jobLink) {
        applicationCard.append(linkElement);
    }
    applicationCard.append(dateParagraph, statusSelect, deleteButton);
    applicationList.append(applicationCard);

}

// Validates the form, adds a new application and saves the data
applicationForm.addEventListener("submit", function (event) {
    event.preventDefault();

    const application = {
        position: position.value.trim(),
        company: company.value.trim(),
        jobLink: jobLink.value.trim(),
        applicationDeadline: applicationDeadline.value,
        status: "Interested"
    };

    if (application.position === "" || application.company === "" || application.jobLink === "") {
        alert("Please enter a position, company and job link!");
        return;
    }

    createApplicationCard(application);

    applicationCounter.textContent = "Total applications: " + applicationList.children.length;

    saveApplications();
    applicationForm.reset();
});

// Loads saved applications from local storage when the page opens
function loadApplications() {
    const savedApplications = localStorage.getItem("applications");
    if (savedApplications === null) {
        return;
    }

    const applications = JSON.parse(savedApplications);
    applications.forEach(function (application) {
        createApplicationCard(application);
    });
    applicationCounter.textContent = "Total applications: " + applicationList.children.length;
}

loadApplications();
