const applicationForm = document.querySelector("#applicationForm");
const position = document.querySelector("#position");
const company = document.querySelector("#company");
const jobLink = document.querySelector("#jobLink");
const applicationDeadline = document.querySelector("#applicationDeadline");
const status = document.querySelector("#status");

const applicationList = document.querySelector("#applicationList");
const applicationCounter = document.querySelector("#applicationCounter");

applicationForm.addEventListener("submit", function (event) {
    event.preventDefault();

    const positionValue = position.value;
    const companyValue = company.value;
    const jobLinkValue = jobLink.value;
    const applicationDeadlineValue = applicationDeadline.value;
    const statusValue = status.value;

    if (positionValue === "" || companyValue === "") {
        alert("Please enter a position and company!");
        return;
    }

    const applicationCard = document.createElement("div");
    applicationCard.classList.add("application-card");

    const positionHeading = document.createElement("h3");
    positionHeading.textContent = positionValue;

    const companyParagraph = document.createElement("p");
    companyParagraph.textContent = companyValue;

    const linkElement = document.createElement("a");
    linkElement.href = jobLinkValue;
    linkElement.textContent = "View job advertisement";
    linkElement.target = "_blank";
    linkElement.rel = "noopener noreferrer";

    const dateParagraph = document.createElement("p");
    dateParagraph.textContent = "Application deadline: " + applicationDeadlineValue;

    const statusParagraph = document.createElement("p");
    statusParagraph.textContent = statusValue;

    const deleteButton = document.createElement("button");
    deleteButton.textContent = "Delete";
    deleteButton.type = "button";

    deleteButton.addEventListener("click", function () {
        applicationCard.remove();
        applicationCounter.textContent = "Total applications: " + applicationList.children.length;
    });

    applicationCard.append(positionHeading, companyParagraph, linkElement, dateParagraph, statusParagraph, deleteButton);
    applicationList.append(applicationCard);
    applicationCounter.textContent = "Total applications: " + applicationList.children.length;
    applicationForm.reset();

});


    //console.log(positionValue);
    //console.log(companyValue);
    //console.log(jobLinkValue);
    //console.log(applicationDeadlineValue);
    //console.log(statusValue);
    //console.log("Form submitted!");