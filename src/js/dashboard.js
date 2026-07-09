/**
 * Dashboard Page — Interactive Logic
 * Handles balance visibility toggle on the main dashboard.
 */
document.addEventListener("DOMContentLoaded", () => {
  const toggleBtn = document.getElementById("toggleBalanceBtn");
  const balanceText = document.getElementById("balanceText");
  const toggleIcon = document.getElementById("toggleBalanceIcon");
  let isVisible = true;
  const actualBalance = "Rp 12.450.000";
  const hiddenBalance = "Rp •••••••••";

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
