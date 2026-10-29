const loadDataBtn = document.getElementById("loadDataBtn");
const statusText = document.getElementById("status");
const apiData = document.getElementById("apiData");

const applicationForm = document.getElementById("applicationForm");
const formStatus = document.getElementById("formStatus");

// Fetch data from a public API
loadDataBtn.addEventListener("click", async () => {
    statusText.textContent = "Loading data...";
    apiData.replaceChildren();
    loadDataBtn.disabled = true;

    try {
        const response = await fetch(
            "https://jsonplaceholder.typicode.com/posts?_limit=5"
        );

        if (!response.ok) {
            throw new Error("Unable to fetch API data.");
        }

        const posts = await response.json();

        statusText.textContent = "API data loaded successfully!";

        posts.forEach((post) => {
            const article = document.createElement("article");
            const title = document.createElement("h3");
            const description = document.createElement("p");

            title.textContent = post.title;
            description.textContent = post.body;

            article.append(title, description);
            article.style.marginBottom = "16px";
            apiData.appendChild(article);
        });
    } catch (error) {
        statusText.textContent =
            "Failed to load data. Please check your internet and try again.";
        console.error("API error:", error);
    } finally {
        loadDataBtn.disabled = false;
    }
});

// Validate the application form
applicationForm.addEventListener("submit", async (event) => {
    event.preventDefault();
    formStatus.textContent = "";

    if (!applicationForm.checkValidity()) {
        applicationForm.reportValidity();
        return;
    }

    const name = document.getElementById("name").value.trim();
    const email = document.getElementById("email").value.trim();
    const message = document.getElementById("message").value.trim();

    if (
        name.length < 2 ||
        name.length > 80 ||
        email.length > 254 ||
        message.length < 10 ||
        message.length > 1000
    ) {
        formStatus.textContent = "Please check your form details.";
        return;
    }

    const submitButton = applicationForm.querySelector(
        'button[type="submit"]'
    );

    submitButton.disabled = true;
    formStatus.textContent = "Submitting application...";

    try {
        const response = await fetch("/api/applications", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({ name, email, message })
        });

        const result = await response.json();

        if (!response.ok) {
            throw new Error(result.error || "Submission failed.");
        }

        formStatus.textContent = result.message;
        applicationForm.reset();
    } catch (error) {
        formStatus.textContent =
            error.message || "Unable to submit. Please try again.";
    } finally {
        submitButton.disabled = false;
    }
});