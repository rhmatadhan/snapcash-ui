/**
 * Top Up Page — Interactive Logic
 * Handles currency formatting, quick select chips, payment methods, validation, and mockup flow.
 */
document.addEventListener("DOMContentLoaded", () => {
  // DOM Elements
  const balanceEl = document.getElementById("current-balance");
  const amountInput = document.getElementById("topup-amount");
  const inputWrapper = document.getElementById("input-wrapper");
  const validationMsg = document.getElementById("amount-validation-msg");
  const submitBtn = document.getElementById("submit-topup");
  const quickChips = document.querySelectorAll(".quick-chip");
  const paymentCards = document.querySelectorAll(".payment-method-card");
  const toggleMethodsBtn = document.getElementById("toggle-methods-btn");
  const toggleMethodsText = document.getElementById("toggle-methods-text");
  const toggleMethodsIcon = document.getElementById("toggle-methods-icon");

  // State
  let currentBalance = parseInt(localStorage.getItem("userBalance") || "12450000", 10);
  let selectedAmount = 100000; // default active is 100k
  let selectedMethod = "bca"; // default payment method
  let isMethodsExpanded = false;

  // Initialize UI
  if (balanceEl) {
    balanceEl.textContent = formatCurrency(currentBalance);
  }
  
  // Helpers
  function formatNumber(num) {
    return num.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".");
  }

  function parseNumber(str) {
    return parseInt(str.replace(/\./g, ""), 10) || 0;
  }

  function formatCurrency(num) {
    return "Rp " + formatNumber(num);
  }

  // Formatting input value on typing
  if (amountInput) {
    amountInput.addEventListener("input", (e) => {
      // Remove non-numeric characters
      let value = e.target.value.replace(/\D/g, "");
      
      // Update state
      selectedAmount = parseInt(value, 10) || 0;
      
      // Format display
      e.target.value = value ? formatNumber(selectedAmount) : "";
      
      // Sync quick chips active state
      syncChipsWithInput(selectedAmount);
      
      // Validate
      validateInput(selectedAmount);
    });

    amountInput.addEventListener("blur", (e) => {
      if (!e.target.value) {
        e.target.value = "0";
        validateInput(0);
      }
    });
  }

  // Validate Input Function
  function validateInput(amount) {
    if (!validationMsg || !inputWrapper || !submitBtn) return;

    if (amount < 10000) {
      validationMsg.textContent = "Minimal top up Rp 10.000";
      validationMsg.className = "font-2xs text-2xs text-error-red mt-1";
      inputWrapper.className = "flex items-center border-2 border-error-red rounded-2xl px-4 py-3 bg-surface-container-lowest transition-all duration-200 shadow-[0_0_0_4px_rgba(239,68,68,0.15)] mb-2";
      submitBtn.disabled = true;
    } else {
      validationMsg.textContent = "Minimal top up Rp 10.000";
      validationMsg.className = "font-2xs text-2xs text-on-primary-container mt-1";
      inputWrapper.className = "flex items-center border-2 border-surface-variant focus-within:border-secondary-fixed rounded-2xl px-4 py-3 bg-surface-container-lowest transition-all duration-200 focus-within:shadow-[0_0_0_4px_rgba(178,247,70,0.15)] mb-2";
      submitBtn.disabled = false;
    }
  }

  // Sync Quick Chips visually with the raw input amount
  function syncChipsWithInput(amount) {
    quickChips.forEach(chip => {
      const chipVal = parseInt(chip.getAttribute("data-amount"), 10);
      if (chipVal === amount) {
        setChipActive(chip);
      } else {
        setChipInactive(chip);
      }
    });
  }

  function setChipActive(chip) {
    chip.className = "quick-chip bg-secondary-fixed text-primary font-label-md text-label-md font-bold border-transparent py-2.5 rounded-xl text-center shadow-sm transition-all duration-200 active:scale-95";
  }

  function setChipInactive(chip) {
    chip.className = "quick-chip bg-surface hover:bg-surface-container-low text-text-muted font-body-sm text-body-sm font-medium border border-surface-variant py-2.5 rounded-xl text-center transition-all duration-200 active:scale-95";
  }

  // Quick Chips Click Events
  quickChips.forEach(chip => {
    chip.addEventListener("click", () => {
      const amount = parseInt(chip.getAttribute("data-amount"), 10);
      selectedAmount = amount;
      
      if (amountInput) {
        amountInput.value = formatNumber(amount);
      }
      
      // Update chip states
      quickChips.forEach(c => setChipInactive(c));
      setChipActive(chip);
      
      // Validate
      validateInput(amount);
    });
  });

  // Payment Methods Click Events
  paymentCards.forEach(card => {
    card.addEventListener("click", () => {
      selectedMethod = card.getAttribute("data-method");
      
      paymentCards.forEach(c => {
        const radioIcon = c.querySelector(".radio-icon");
        
        // Remove active state
        c.classList.remove("border-2", "border-secondary-fixed", "bg-secondary-fixed/5");
        c.classList.add("border", "border-surface-variant", "bg-surface-container-lowest", "hover:border-outline-variant");
        if (radioIcon) {
          radioIcon.textContent = "radio_button_unchecked";
          radioIcon.className = "radio-icon material-symbols-outlined text-outline-variant select-none";
        }
      });

      // Set active state to clicked card
      card.classList.remove("border", "border-surface-variant", "bg-surface-container-lowest", "hover:border-outline-variant");
      card.classList.add("border-2", "border-secondary-fixed", "bg-secondary-fixed/5");
      const activeRadioIcon = card.querySelector(".radio-icon");
      if (activeRadioIcon) {
        activeRadioIcon.textContent = "radio_button_checked";
        activeRadioIcon.className = "radio-icon material-symbols-outlined text-secondary-fixed select-none";
      }
    });
  });

  // Toggle Additional Payment Methods
  if (toggleMethodsBtn) {
    toggleMethodsBtn.addEventListener("click", () => {
      isMethodsExpanded = !isMethodsExpanded;
      
      const hiddenCards = document.querySelectorAll(".payment-method-card[data-method='gopay'], .payment-method-card[data-method='mandiri']");
      
      if (isMethodsExpanded) {
        hiddenCards.forEach(c => c.classList.remove("hidden"));
        if (toggleMethodsText) toggleMethodsText.textContent = "Sembunyikan Metode Lainnya";
        if (toggleMethodsIcon) toggleMethodsIcon.classList.add("rotate-180");
      } else {
        hiddenCards.forEach(c => c.classList.add("hidden"));
        if (toggleMethodsText) toggleMethodsText.textContent = "Lihat Metode Lainnya";
        if (toggleMethodsIcon) toggleMethodsIcon.classList.remove("rotate-180");
      }
    });
  }

  // Submit flow
  if (submitBtn) {
    submitBtn.addEventListener("click", () => {
      if (selectedAmount < 10000) return;
      
      const pendingTx = {
        amount: selectedAmount,
        method: selectedMethod,
        methodName: getMethodName(selectedMethod),
        timestamp: Date.now()
      };
      
      localStorage.setItem("pendingTransaction", JSON.stringify(pendingTx));
      window.location.href = `instruksi-pembayaran.html`;
    });
  }

  function getMethodName(code) {
    switch (code) {
      case "bca": return "BCA Virtual Account";
      case "minimarket": return "Minimarket (Alfamart/Indomaret)";
      case "gopay": return "GoPay";
      case "mandiri": return "Mandiri Virtual Account";
      default: return "Transfer Bank";
    }
  }

  // Pre-validate initial value (100.000)
  validateInput(selectedAmount);
});
