// Shared JavaScript for all portfolio pages

// Mobile navigation menu
const menuBtn = document.getElementById("menuBtn");
const navLinks = document.getElementById("navLinks");

if (menuBtn && navLinks) {
  menuBtn.addEventListener("click", () => {
    const isOpen = navLinks.classList.toggle("open");
    menuBtn.setAttribute("aria-expanded", String(isOpen));
    menuBtn.setAttribute("aria-label", isOpen ? "Close navigation" : "Open navigation");
    menuBtn.textContent = isOpen ? "✕" : "☰";
  });

  navLinks.querySelectorAll("a").forEach(link => {
    link.addEventListener("click", () => {
      navLinks.classList.remove("open");
      menuBtn.setAttribute("aria-expanded", "false");
      menuBtn.setAttribute("aria-label", "Open navigation");
      menuBtn.textContent = "☰";
    });
  });
}

// Dark/light theme: save preference so it stays consistent across pages
const themeBtn = document.getElementById("themeBtn");
const savedTheme = localStorage.getItem("lakshita-portfolio-theme");

if (savedTheme === "light") {
  document.body.classList.add("light-mode");
}

function updateThemeButton() {
  if (!themeBtn) return;
  const light = document.body.classList.contains("light-mode");
  themeBtn.textContent = light ? "🌙" : "☀️";
  themeBtn.setAttribute("aria-label", light ? "Switch to dark theme" : "Switch to light theme");
}

updateThemeButton();

if (themeBtn) {
  themeBtn.addEventListener("click", () => {
    document.body.classList.toggle("light-mode");
    localStorage.setItem(
      "lakshita-portfolio-theme",
      document.body.classList.contains("light-mode") ? "light" : "dark"
    );
    updateThemeButton();
  });
}

// Automatic copyright year
document.querySelectorAll(".current-year").forEach(element => {
  element.textContent = new Date().getFullYear();
});

// Contact form validation (front-end demo only; no message is sent)
const contactForm = document.getElementById("contactForm");

if (contactForm) {
  contactForm.addEventListener("submit", event => {
    event.preventDefault();

    const fields = {
      name: document.getElementById("name").value.trim(),
      email: document.getElementById("email").value.trim(),
      subject: document.getElementById("subject").value.trim(),
      message: document.getElementById("message").value.trim()
    };

    const errors = {
      name: document.getElementById("nameError"),
      email: document.getElementById("emailError"),
      subject: document.getElementById("subjectError"),
      message: document.getElementById("messageError")
    };

    Object.values(errors).forEach(error => error.textContent = "");
    const status = document.getElementById("formStatus");
    status.textContent = "";
    let valid = true;

    if (fields.name.length < 2) {
      errors.name.textContent = "Please enter a name with at least 2 characters.";
      valid = false;
    }

    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailPattern.test(fields.email)) {
      errors.email.textContent = "Please enter a valid email address.";
      valid = false;
    }

    if (fields.subject.length < 3) {
      errors.subject.textContent = "Please enter a subject (at least 3 characters).";
      valid = false;
    }

    if (fields.message.length < 10) {
      errors.message.textContent = "Please enter a message with at least 10 characters.";
      valid = false;
    }

    if (valid) {
      status.textContent = "All fields are valid! This demo form does not send the message.";
      contactForm.reset();
    }
  });
}
