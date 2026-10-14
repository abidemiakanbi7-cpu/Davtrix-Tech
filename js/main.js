const menuButton = document.querySelector(".menu-toggle");
const primaryNav = document.querySelector("#primary-nav");

if (menuButton && primaryNav) {
  menuButton.addEventListener("click", () => {
    const isOpen = menuButton.getAttribute("aria-expanded") === "true";
    menuButton.setAttribute("aria-expanded", String(!isOpen));
    menuButton.setAttribute("aria-label", isOpen ? "Open navigation" : "Close navigation");
    primaryNav.classList.toggle("is-open", !isOpen);
  });

  primaryNav.querySelectorAll("a").forEach((link) => {
    link.addEventListener("click", () => {
      menuButton.setAttribute("aria-expanded", "false");
      menuButton.setAttribute("aria-label", "Open navigation");
      primaryNav.classList.remove("is-open");
    });
  });

  document.addEventListener("keydown", (event) => {
    if (event.key === "Escape") {
      menuButton.setAttribute("aria-expanded", "false");
      menuButton.setAttribute("aria-label", "Open navigation");
      primaryNav.classList.remove("is-open");
      menuButton.focus();
    }
  });
}

const year = document.querySelector("#year");
if (year) year.textContent = new Date().getFullYear();

/*
 * Front-end-only enquiry form.
 * It opens the visitor's default email app and does not store form data.
 * Before launch, replace the address below with an email you have created
 * and tested. For a server-backed form, connect a trusted form service/backend.
 */
const enquiryForm = document.querySelector("#contact-form");
const formNote = document.querySelector("#form-note");
const businessEmail = "REPLACE_WITH_YOUR_REAL_EMAIL@example.com";

if (enquiryForm) {
  enquiryForm.addEventListener("submit", (event) => {
    event.preventDefault();
    if (!enquiryForm.reportValidity()) return;

    if (businessEmail.startsWith("REPLACE_")) {
      formNote.textContent = "The form is ready, but the business email has not been configured yet. Open js/main.js and replace the placeholder with your real email before using this form.";
      formNote.setAttribute("role", "status");
      return;
    }

    const formData = new FormData(enquiryForm);
    const subject = encodeURIComponent(`DAVTRIX project enquiry — ${formData.get("service")}`);
    const body = encodeURIComponent(
      `Name: ${formData.get("name")}\nEmail: ${formData.get("email")}\nService: ${formData.get("service")}\n\nProject details:\n${formData.get("message")}`
    );
    window.location.href = `mailto:${businessEmail}?subject=${subject}&body=${body}`;
    formNote.textContent = "Your email app should open with the enquiry drafted. Review it and press Send.";
    formNote.setAttribute("role", "status");
  });
}
