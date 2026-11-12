// auto scroll
document.addEventListener("DOMContentLoaded", () => {
  const carContainers = document.querySelectorAll(".car-container");
  const inquirySection = document.getElementById("inquiry");
  const selectElement = document.getElementById("model-interest");

  carContainers.forEach((container) => {
    container.addEventListener("click", () => {
      const carNameText = container
        .querySelector(".car-name")
        .textContent.trim();

      if (selectElement) {
        if (carNameText.includes("190")) {
          selectElement.value = "190-sl";
        } else if (carNameText.includes("280")) {
          selectElement.value = "280-sl";
        } else if (carNameText.includes("560")) {
          selectElement.value = "560-sl";
        }
      }

      if (inquirySection) {
        inquirySection.scrollIntoView({ behavior: "smooth" });
      }
    });
  });
});

// database config
const SUPABASE_URL = window.ENV?.SUPABASE_URL;
const SUPABASE_ANON_KEY = window.ENV?.SUPABASE_ANON_KEY;

const _supabase = supabase.createClient(SUPABASE_URL, SUPABASE_ANON_KEY);

document.addEventListener("DOMContentLoaded", () => {
  const modal = document.getElementById("custom-modal");
  const modalTitle = document.getElementById("modal-title");
  const modalMessage = document.getElementById("modal-message");
  const modalCloseBtn = document.getElementById("modal-close-btn");

  function showModal(title, message) {
    if (modalTitle) modalTitle.textContent = title;
    if (modalMessage) modalMessage.textContent = message;
    if (modal) modal.classList.add("active");
  }

  function hideModal() {
    if (modal) modal.classList.remove("active");
  }

  if (modalCloseBtn) {
    modalCloseBtn.addEventListener("click", hideModal);
  }

  if (modal) {
    modal.addEventListener("click", (e) => {
      if (e.target === modal) hideModal();
    });
  }

  // car collection scroll
  const carContainers = document.querySelectorAll(".car-container");
  const inquirySection = document.getElementById("inquiry");
  const selectElement = document.getElementById("model-interest");

  carContainers.forEach((container) => {
    container.addEventListener("click", () => {
      const carNameText = container
        .querySelector(".car-name")
        .textContent.trim();
      if (selectElement) {
        if (carNameText.includes("190")) selectElement.value = "190-sl";
        else if (carNameText.includes("280")) selectElement.value = "280-sl";
        else if (carNameText.includes("560")) selectElement.value = "560-sl";
      }
      if (inquirySection) {
        inquirySection.scrollIntoView({ behavior: "smooth" });
      }
    });
  });

  // submit inquiry
  const inquiryForm = document.querySelector(".form-grid");
  if (inquiryForm) {
    inquiryForm.addEventListener("submit", async (e) => {
      e.preventDefault();

      const submitBtn = inquiryForm.querySelector(".submit-btn");
      const originalBtnText = submitBtn.innerHTML;

      submitBtn.disabled = true;
      submitBtn.textContent = "Sending...";

      const formData = {
        first_name: document.getElementById("first-name").value,
        last_name: document.getElementById("last-name").value,
        email: document.getElementById("email").value,
        phone: document.getElementById("phone").value,
        model_interest: document.getElementById("model-interest").value,
        message: document.getElementById("message").value,
      };

      try {
        const { error } = await _supabase.from("inquiries").insert([formData]);

        if (error) throw error;

        showModal(
          "Thank You",
          "Your inquiry has been submitted. A Mercedes-Benz representative will be in touch with you shortly.",
        );
        inquiryForm.reset();
      } catch (err) {
        console.error("Error submitting form:", err.message);

        showModal(
          "Submission Error",
          "We were unable to process your request at this time. Please check your connection and try again.",
        );
      } finally {
        submitBtn.disabled = false;
        submitBtn.innerHTML = originalBtnText;
      }
    });
  }
});
