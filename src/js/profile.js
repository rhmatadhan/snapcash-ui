document.addEventListener("DOMContentLoaded", () => {
  // Simple press feedback for touch devices
  document.querySelectorAll("button, a").forEach((el) => {
    el.addEventListener("touchstart", function () {
      this.classList.add("opacity-80");
    });
    el.addEventListener("touchend", function () {
      this.classList.remove("opacity-80");
    });
  });

  // Copy ID functionality
  const copyBtn = document.getElementById("copyIdBtn");
  if (copyBtn) {
    copyBtn.addEventListener("click", () => {
      const idText = "DOMPI-8829103";
      navigator.clipboard
        .writeText(idText)
        .then(() => {
          // Simple visual feedback
          const originalContent = copyBtn.innerHTML;
          copyBtn.innerHTML = `
            <span class="font-label-md text-label-md tracking-widest text-on-primary">Tersalin!</span>
            <span class="material-symbols-outlined text-[18px]">done</span>
          `;
          setTimeout(() => {
            copyBtn.innerHTML = originalContent;
          }, 2000);
        })
        .catch((err) => {
          console.error("Failed to copy text: ", err);
        });
    });
  }

  // Logout Modal functionality
  const logoutBtn = document.getElementById("logoutBtn");
  const logoutModal = document.getElementById("logoutModal");
  const cancelLogoutBtn = document.getElementById("cancelLogoutBtn");
  const confirmLogoutBtn = document.getElementById("confirmLogoutBtn");

  if (logoutBtn && logoutModal) {
    logoutBtn.addEventListener("click", () => {
      logoutModal.classList.remove("hidden");
    });
  }

  if (cancelLogoutBtn && logoutModal) {
    cancelLogoutBtn.addEventListener("click", () => {
      logoutModal.classList.add("hidden");
    });
  }

  // Hide modal on backdrop click
  if (logoutModal) {
    logoutModal.addEventListener("click", (e) => {
      if (e.target === logoutModal) {
        logoutModal.classList.add("hidden");
      }
    });
  }

  if (confirmLogoutBtn) {
    confirmLogoutBtn.addEventListener("click", () => {
      // Redirect to login page
      window.location.href = "auth/login.html";
    });
  }
});
