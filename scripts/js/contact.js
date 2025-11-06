document.addEventListener("DOMContentLoaded", function () {
  const contactForm = document.querySelector("form");
  const submitButton = contactForm.querySelector(
    'button[type="submit"]'
  );

  contactForm.addEventListener("submit", function (e) {
    e.preventDefault();

    // Change button state
    submitButton.disabled = true;
    submitButton.innerHTML =
      '<i class="fas fa-spinner fa-spin mr-2"></i> Sending...';

    // Get form data
    const name = contactForm.querySelector(
      'input[type="text"]'
    ).value;
    const email = contactForm.querySelector(
      'input[type="email"]'
    ).value;
    const message = contactForm.querySelector("textarea").value;

    // Send email using EmailJS
    emailjs
      .send("service_khjna8b", "template_u5mb26w", {
        from_name: name,
        from_email: email,
        message: message,
        to_name: "Saba",
        to_email: "fitwisaba@gmail.com",
      })
      .then(
        function () {
          // Success
          submitButton.innerHTML =
            '<i class="fas fa-check mr-2"></i> Sent Successfully!';
          submitButton.classList.add("bg-green-500");
          contactForm.reset();
          setTimeout(() => {
            submitButton.disabled = false;
            submitButton.innerHTML =
              '<i class="fas fa-paper-plane mr-2"></i> Send Message';
            submitButton.classList.remove("bg-green-500");
          }, 3000);
        },
        function (error) {
          // Detailed error logging
          console.error("Failed to send email. Error details:", {
            error: error,
            serviceId: "service_jnvrhbj",
            templateId: "template_2bckd5m",
            publicKey: document
              .querySelector('script[type="text/javascript"]')
              .textContent.match(/init\("([^"]+)"\)/)[1],
          });
          submitButton.innerHTML =
            '<i class="fas fa-exclamation-circle mr-2"></i> Failed to Send';
          submitButton.classList.add("bg-red-500");
          setTimeout(() => {
            submitButton.disabled = false;
            submitButton.innerHTML =
              '<i class="fas fa-paper-plane mr-2"></i> Send Message';
            submitButton.classList.remove("bg-red-500");
          }, 3000);
        }
      );
  });
});
