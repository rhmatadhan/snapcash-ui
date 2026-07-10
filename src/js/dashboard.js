/**
 * Dashboard Page — Interactive Logic
 * Handles balance visibility toggle on the main dashboard.
 */
document.addEventListener("DOMContentLoaded", () => {
  const toggleBtn = document.getElementById("toggleBalanceBtn");
  const balanceText = document.getElementById("balanceText");
  const toggleIcon = document.getElementById("toggleBalanceIcon");
  let isVisible = true;

  const rawBalance = localStorage.getItem("userBalance") || "12450000";
  const parsedBalance = parseInt(rawBalance, 10);
  const formattedBalance = "Rp " + parsedBalance.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".");

  const actualBalance = formattedBalance;
  const hiddenBalance = "Rp •••••••••";

  // Set initial text if balance text is present
  if (balanceText) {
    balanceText.textContent = actualBalance;
  }

  if (toggleBtn && balanceText && toggleIcon) {
    toggleBtn.addEventListener("click", () => {
      isVisible = !isVisible;
      if (isVisible) {
        balanceText.textContent = actualBalance;
        toggleIcon.textContent = "visibility";
      } else {
        balanceText.textContent = hiddenBalance;
        toggleIcon.textContent = "visibility_off";
      }
    });
  }
});
