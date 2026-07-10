/**
 * Transfer Amount Page — Interactive Logic
 * Handles loading recipient, dynamic currency input, validation, quick chips, and PIN validation modal.
 */
document.addEventListener("DOMContentLoaded", () => {
  // 1. Fetch recipient data from localStorage
  const pendingTransferRaw = localStorage.getItem("pendingTransfer");
  if (!pendingTransferRaw) {
    // If no pending transfer, redirect back to step 1
    window.location.href = "transfer.html";
    return;
  }

  let pendingTransfer = {};
  try {
    pendingTransfer = JSON.parse(pendingTransferRaw);
  } catch (e) {
    console.error("Failed to parse pending transfer data", e);
    window.location.href = "transfer.html";
    return;
  }

  // DOM Elements
  const recipientName = document.getElementById("recipient-name");
  const recipientDetail = document.getElementById("recipient-detail");
  const recipientAvatarImg = document.getElementById("recipient-avatar-img");
  const recipientAvatarFallback = document.getElementById("recipient-avatar-fallback");
  const recipientBadge = document.getElementById("recipient-badge");
  const recipientVerified = document.getElementById("recipient-verified");

  const inputNominal = document.getElementById("input-nominal");
  const nominalWarningMsg = document.getElementById("nominal-warning-msg");
  const quickChips = document.querySelectorAll(".quick-chip-btn");
  const inputNote = document.getElementById("input-note");

  const btnConfirmTransfer = document.getElementById("btn-confirm-transfer");
  const btnText = document.getElementById("btn-text");
  const btnSpinner = document.getElementById("btn-spinner");
  const btnIcon = document.getElementById("btn-icon");

  // PIN Modal Elements
  const pinModalBackdrop = document.getElementById("pin-modal-backdrop");
  const pinModal = document.getElementById("pin-modal");
  const pinModalClose = document.getElementById("pin-modal-close");
  const pinIndicators = document.querySelectorAll("#pin-indicators > div");
  const pinErrorMsg = document.getElementById("pin-error-msg");
  const keypadButtons = document.querySelectorAll(".keypad-btn");
  const keypadBackspace = document.getElementById("keypad-backspace");

  // Constant configurations
  const ACTIVE_BALANCE = 12450000; // Rp 12.450.000
  const adminFee = pendingTransfer.activeTab === "snapcash" ? 0 : 
                    pendingTransfer.activeTab === "ewallet" ? 1000 : 2500;

  // Mock avatar sources
  const avatars = {
    "Andi Saputra": "https://lh3.googleusercontent.com/aida-public/AB6AXuB4IsGFe789s2uRg1c1MGnamQKkrEK7EnnYIFiLo5CIZB37q_OPrnMV-Y-6HAnkRA0qh-cA8sWCJunxeOt_nelg2nlT9Q7GSaaV9AT4O7VuQWwP5OEj9iPqSML70OFJ0c6YdHcqz7huXKi4UMpBlqKwMKEsSHuEh9CbIs93rsm8Tq5d9T7D1qFiywoFoRkMugZ7iTiTfykQoZA1KxXTMUSX78CA8YeMTPv-4z29tzdxWiXq8407cb7T",
    "Andi S.": "https://lh3.googleusercontent.com/aida-public/AB6AXuB4IsGFe789s2uRg1c1MGnamQKkrEK7EnnYIFiLo5CIZB37q_OPrnMV-Y-6HAnkRA0qh-cA8sWCJunxeOt_nelg2nlT9Q7GSaaV9AT4O7VuQWwP5OEj9iPqSML70OFJ0c6YdHcqz7huXKi4UMpBlqKwMKEsSHuEh9CbIs93rsm8Tq5d9T7D1qFiywoFoRkMugZ7iTiTfykQoZA1KxXTMUSX78CA8YeMTPv-4z29tzdxWiXq8407cb7T",
    "Siska Amelia": "https://lh3.googleusercontent.com/aida-public/AB6AXuA_COaHrs5C8eUP9uk5miih2Jy_jzU8KLJVnQf4Syz2Vo5qUdE-9Ah04cBKj7a9k5GXcr6dYBkqkbPMoNw1_GfbouzFT7773iYjTRFXSbIih4-OFbmqPm83Ngf9ptlOYFBgu1zyvzLeUwk1CS3_QDyDB7KSIFaz1NlD8sAnFiNWTqcH5IcyQzXwh3TxhE_6OzhJenhNGFdZiK3dVB9NR1qUak5Oe89EVrz4PxBqmHIznnWzUWc5M1g7",
    "Siska": "https://lh3.googleusercontent.com/aida-public/AB6AXuA_COaHrs5C8eUP9uk5miih2Jy_jzU8KLJVnQf4Syz2Vo5qUdE-9Ah04cBKj7a9k5GXcr6dYBkqkbPMoNw1_GfbouzFT7773iYjTRFXSbIih4-OFbmqPm83Ngf9ptlOYFBgu1zyvzLeUwk1CS3_QDyDB7KSIFaz1NlD8sAnFiNWTqcH5IcyQzXwh3TxhE_6OzhJenhNGFdZiK3dVB9NR1qUak5Oe89EVrz4PxBqmHIznnWzUWc5M1g7"
  };

  // State
  let numericAmount = 0;
  let pinCode = "";
  let isVerifyingPin = false;

  // Initialize Recipient View
  function initRecipient() {
    recipientName.textContent = pendingTransfer.name || "Penerima";
    
    // Set Detail Text
    if (pendingTransfer.activeTab === "snapcash") {
      recipientDetail.textContent = `SnapCash • ${pendingTransfer.number}`;
      recipientBadge.textContent = "SC";
      recipientBadge.className = "absolute -bottom-1 -right-1 w-5 h-5 rounded-full flex items-center justify-center font-bold border-2 border-white shadow-sm text-[10px] text-on-secondary-fixed bg-secondary-fixed select-none";
      recipientVerified.classList.remove("hidden");
    } else if (pendingTransfer.activeTab === "bank") {
      recipientDetail.textContent = `${pendingTransfer.type} • ${pendingTransfer.number}`;
      // Extract short name
      const shortName = pendingTransfer.type.includes("BCA") ? "BCA" : 
                        pendingTransfer.type.includes("Mandiri") ? "MDR" : 
                        pendingTransfer.type.includes("BNI") ? "BNI" : 
                        pendingTransfer.type.includes("BRI") ? "BRI" : "Bank";
      recipientBadge.textContent = shortName;
      
      let badgeColor = "bg-blue-600";
      if (shortName === "MDR") badgeColor = "bg-yellow-500 text-primary";
      else if (shortName === "BNI") badgeColor = "bg-orange-600";
      else if (shortName === "BRI") badgeColor = "bg-blue-800";
      
      recipientBadge.className = `absolute -bottom-1 -right-1 w-7 h-5 rounded-full flex items-center justify-center font-bold border-2 border-white shadow-sm text-[8px] text-white select-none ${badgeColor}`;
    } else if (pendingTransfer.activeTab === "ewallet") {
      recipientDetail.textContent = `${pendingTransfer.type} • ${pendingTransfer.number}`;
      const shortName = pendingTransfer.type.includes("GoPay") ? "GP" : 
                        pendingTransfer.type.includes("OVO") ? "OVO" : 
                        pendingTransfer.type.includes("DANA") ? "DN" : "SP";
      recipientBadge.textContent = shortName;
      
      let badgeColor = "bg-teal-500";
      if (shortName === "OVO") badgeColor = "bg-purple-600";
      else if (shortName === "DN") badgeColor = "bg-sky-500";
      else if (shortName === "SP") badgeColor = "bg-orange-500";
      
      recipientBadge.className = `absolute -bottom-1 -right-1 w-6 h-5 rounded-full flex items-center justify-center font-bold border-2 border-white shadow-sm text-[8px] text-white select-none ${badgeColor}`;
    }

    // Set Avatar image or fallback initials
    const avUrl = avatars[pendingTransfer.name];
    if (avUrl) {
      recipientAvatarImg.src = avUrl;
      recipientAvatarImg.classList.remove("hidden");
      recipientAvatarFallback.classList.add("hidden");
    } else {
      // Create Initials
      const parts = pendingTransfer.name.split(" ");
      let initials = "";
      if (parts.length > 0) initials += parts[0].substring(0, 1).toUpperCase();
      if (parts.length > 1) initials += parts[1].substring(0, 1).toUpperCase();
      
      recipientAvatarFallback.textContent = initials || "P";
      recipientAvatarFallback.classList.remove("hidden");
      recipientAvatarImg.classList.add("hidden");
    }
  }

  // Formatting helpers
  function formatNumber(num) {
    return num.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".");
  }

  function cleanNumber(str) {
    return str.replace(/[^0-9]/g, "");
  }

  // Handle Input Changes
  function handleInput(e) {
    const rawVal = cleanNumber(inputNominal.value);
    
    if (!rawVal) {
      numericAmount = 0;
      inputNominal.value = "";
    } else {
      numericAmount = parseInt(rawVal, 10);
      inputNominal.value = formatNumber(numericAmount);
    }
    
    validateAmount();
  }

  // Validate Amount & Update Warning & Button
  function validateAmount() {
    let isValid = true;
    const totalAmount = numericAmount + adminFee;

    const summaryContainer = document.getElementById("transfer-summary");
    const summaryNominal = document.getElementById("summary-nominal");
    const summaryAdmin = document.getElementById("summary-admin");
    const summaryTotal = document.getElementById("summary-total");

    if (numericAmount > 0) {
      summaryNominal.textContent = `Rp ${formatNumber(numericAmount)}`;
      summaryAdmin.textContent = adminFee === 0 ? "Gratis" : `Rp ${formatNumber(adminFee)}`;
      summaryTotal.textContent = `Rp ${formatNumber(totalAmount)}`;
      summaryContainer.classList.remove("hidden");
    } else {
      summaryContainer.classList.add("hidden");
    }
    
    if (totalAmount > ACTIVE_BALANCE) {
      nominalWarningMsg.textContent = "Total bayar melebihi saldo aktif Anda";
      nominalWarningMsg.classList.remove("hidden");
      isValid = false;
    } else {
      nominalWarningMsg.classList.add("hidden");
    }

    if (numericAmount <= 0) {
      isValid = false;
    }

    btnConfirmTransfer.disabled = !isValid;
  }

  // Chip buttons click
  quickChips.forEach(chip => {
    chip.addEventListener("click", () => {
      const amt = parseInt(chip.getAttribute("data-amount"), 10);
      numericAmount = amt;
      inputNominal.value = formatNumber(amt);
      validateAmount();
    });
  });

  // PIN Modal Otorisasi
  function openPinModal() {
    pinCode = "";
    updatePinIndicators();
    pinErrorMsg.classList.add("hidden");
    
    pinModalBackdrop.classList.remove("pointer-events-none", "opacity-0");
    pinModal.classList.remove("translate-y-full", "sm:scale-95", "opacity-0");
  }

  function closePinModal() {
    if (isVerifyingPin) return; // Prevent closing while processing
    pinModalBackdrop.classList.add("pointer-events-none", "opacity-0");
    pinModal.classList.add("translate-y-full", "sm:scale-95", "opacity-0");
  }

  function updatePinIndicators() {
    pinIndicators.forEach((dot, index) => {
      if (index < pinCode.length) {
        dot.className = "w-3.5 h-3.5 rounded-full border-2 border-primary bg-primary transition-all duration-150 scale-110";
      } else {
        dot.className = "w-3.5 h-3.5 rounded-full border-2 border-outline transition-all duration-150";
      }
    });
  }

  function handleKeypadClick(val) {
    if (isVerifyingPin || pinCode.length >= 6) return;
    pinCode += val;
    updatePinIndicators();
    
    if (pinCode.length === 6) {
      executeTransfer();
    }
  }

  function handleBackspace() {
    if (isVerifyingPin || pinCode.length === 0) return;
    pinCode = pinCode.slice(0, -1);
    updatePinIndicators();
  }

  // Simulate loading, then save details and redirect
  function executeTransfer() {
    isVerifyingPin = true;
    
    // Add pulsing loading state to indicators
    pinIndicators.forEach(dot => {
      dot.classList.add("animate-pulse");
    });

    // Simulated network delay
    setTimeout(() => {
      // Save amount & notes to the localStorage transaction object
      const finalTransfer = {
        ...pendingTransfer,
        amount: numericAmount,
        adminFee: adminFee,
        totalAmount: numericAmount + adminFee,
        note: inputNote.value.trim(),
        referenceId: "INV-" + new Date().toISOString().slice(0, 10).replace(/-/g, "") + "-" + Math.floor(1000 + Math.random() * 9000),
        dateTime: new Date().toLocaleString("id-ID", { day: "numeric", month: "long", year: "numeric", hour: "2-digit", minute: "2-digit" }) + " WIB"
      };
      
      localStorage.setItem("pendingTransfer", JSON.stringify(finalTransfer));

      // Redirect to transaction success page
      window.location.href = "transaction-status.html?status=success";
    }, 1800);
  }

  // Event Listeners
  inputNominal.addEventListener("input", handleInput);
  btnConfirmTransfer.addEventListener("click", openPinModal);
  pinModalClose.addEventListener("click", closePinModal);
  pinModalBackdrop.addEventListener("click", (e) => {
    if (e.target === pinModalBackdrop) closePinModal();
  });

  // Keypad controls
  keypadButtons.forEach(btn => {
    btn.addEventListener("click", () => {
      handleKeypadClick(btn.textContent.trim());
    });
  });

  keypadBackspace.addEventListener("click", handleBackspace);

  // Initialize view
  initRecipient();
});
