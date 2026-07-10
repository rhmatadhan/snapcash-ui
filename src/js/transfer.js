/**
 * Transfer Page — Interactive Logic
 * Handles dynamic tabs, adaptive inputs, bottom sheet selectors, recent contact autofill, validation, and confirmation flow.
 */
document.addEventListener("DOMContentLoaded", () => {
  // DOM Elements
  const tabs = document.querySelectorAll(".tab-btn");
  const formSnapcash = document.getElementById("form-snapcash");
  const formBank = document.getElementById("form-bank");
  const formEwallet = document.getElementById("form-ewallet");

  const inputSnapcashId = document.getElementById("input-snapcash-id");
  const inputBankAcc = document.getElementById("input-bank-acc");
  const inputEwalletPhone = document.getElementById("input-ewallet-phone");

  const selectBankTrigger = document.getElementById("select-bank-trigger");
  const selectedBankName = document.getElementById("selected-bank-name");
  const selectedBankIcon = document.getElementById("selected-bank-icon");

  const selectEwalletTrigger = document.getElementById("select-ewallet-trigger");
  const selectedEwalletName = document.getElementById("selected-ewallet-name");
  const selectedEwalletIcon = document.getElementById("selected-ewallet-icon");

  // Recent Contacts
  const recentItems = document.querySelectorAll(".recent-contact-item");

  // Sticky Bottom Button
  const btnCekNomor = document.getElementById("btn-cek-nomor");
  const btnText = document.getElementById("btn-text");
  const btnSpinner = document.getElementById("btn-spinner");
  const btnIcon = document.getElementById("btn-icon");

  // Bottom Sheet
  const bottomSheetBackdrop = document.getElementById("bottom-sheet-backdrop");
  const bottomSheet = document.getElementById("bottom-sheet");
  const sheetTitle = document.getElementById("sheet-title");
  const closeSheetBtn = document.getElementById("close-sheet-btn");
  const sheetListContainer = document.getElementById("sheet-list-container");

  // Confirmation Modal
  const confirmModalBackdrop = document.getElementById("confirm-modal-backdrop");
  const confirmModal = document.getElementById("confirm-modal");
  const confirmRecipientName = document.getElementById("confirm-recipient-name");
  const confirmRecipientType = document.getElementById("confirm-recipient-type");
  const confirmRecipientNumber = document.getElementById("confirm-recipient-number");
  const confirmModalCancel = document.getElementById("confirm-modal-cancel");
  const confirmModalNext = document.getElementById("confirm-modal-next");

  // Data Lists
  const banks = [
    { name: "Bank Central Asia (BCA)", shortName: "BCA", code: "bca", color: "bg-blue-600" },
    { name: "Bank Mandiri", shortName: "Mandiri", code: "mandiri", color: "bg-yellow-500" },
    { name: "Bank Negara Indonesia (BNI)", shortName: "BNI", code: "bni", color: "bg-orange-600" },
    { name: "Bank Rakyat Indonesia (BRI)", shortName: "BRI", code: "bri", color: "bg-blue-800" },
    { name: "Bank Jago", shortName: "Jago", code: "jago", color: "bg-amber-500" }
  ];

  const ewallets = [
    { name: "GoPay", shortName: "GoPay", code: "gopay", color: "bg-teal-500" },
    { name: "OVO", shortName: "OVO", code: "ovo", color: "bg-purple-600" },
    { name: "DANA", shortName: "DANA", code: "dana", color: "bg-sky-500" },
    { name: "ShopeePay", shortName: "ShopeePay", code: "shopeepay", color: "bg-orange-500" }
  ];

  // State
  let activeTab = "snapcash"; // snapcash, bank, ewallet
  let selectedBank = null;
  let selectedEwallet = null;

  // Active Tab Switcher
  function switchTab(tabId) {
    activeTab = tabId;

    // Toggle active styles on tabs
    tabs.forEach(btn => {
      const dataTab = btn.getAttribute("data-tab");
      if (dataTab === tabId) {
        btn.className = "tab-btn flex-shrink-0 snap-start px-5 py-2.5 rounded-full font-label-md text-label-md font-bold transition-all duration-200 active:scale-95 shadow-sm bg-secondary-fixed text-on-secondary-fixed";
      } else {
        btn.className = "tab-btn flex-shrink-0 snap-start px-5 py-2.5 rounded-full font-body-sm text-body-sm font-medium transition-all duration-200 active:scale-95 bg-surface-container hover:bg-surface-container-high text-on-surface-variant hover:text-on-surface";
      }
    });

    // Toggle form fields
    formSnapcash.classList.add("hidden");
    formBank.classList.add("hidden");
    formEwallet.classList.add("hidden");

    if (tabId === "snapcash") {
      formSnapcash.classList.remove("hidden");
    } else if (tabId === "bank") {
      formBank.classList.remove("hidden");
    } else if (tabId === "ewallet") {
      formEwallet.classList.remove("hidden");
    }

    validateForm();
  }

  tabs.forEach(btn => {
    btn.addEventListener("click", () => {
      switchTab(btn.getAttribute("data-tab"));
    });
  });

  // Validation Logic
  function validateForm() {
    let isValid = false;

    if (activeTab === "snapcash") {
      const value = inputSnapcashId.value.trim();
      // SnapCash ID can be phone number (9-13 digits) or username (alphanumeric/underscore, min length 3)
      const isPhone = /^[0-9]{9,13}$/.test(value);
      const isUsername = /^[a-zA-Z0-9_]{3,20}$/.test(value);
      isValid = isPhone || isUsername;
    } else if (activeTab === "bank") {
      const accValue = inputBankAcc.value.trim();
      const isAccValid = /^[0-9]{8,18}$/.test(accValue);
      isValid = selectedBank !== null && isAccValid;
    } else if (activeTab === "ewallet") {
      const phoneValue = inputEwalletPhone.value.trim();
      const isPhoneValid = /^[0-9]{9,13}$/.test(phoneValue);
      isValid = selectedEwallet !== null && isPhoneValid;
    }

    btnCekNomor.disabled = !isValid;
  }

  // Bind validation to inputs
  [inputSnapcashId, inputBankAcc, inputEwalletPhone].forEach(input => {
    input.addEventListener("input", validateForm);
  });

  // Bottom Sheet Control
  function openBottomSheet(type) {
    sheetListContainer.innerHTML = "";
    
    if (type === "bank") {
      sheetTitle.textContent = "Pilih Bank Tujuan";
      banks.forEach(bank => {
        const item = document.createElement("button");
        item.type = "button";
        item.className = "w-full flex items-center gap-3 p-4 hover:bg-surface-container rounded-2xl transition-all text-left active:scale-[0.99]";
        item.innerHTML = `
          <div class="w-10 h-10 rounded-full bg-blue-50 text-blue-600 flex items-center justify-center font-bold text-sm">
            ${bank.shortName.substring(0, 3)}
          </div>
          <span class="font-body-md text-body-md text-primary font-medium">${bank.name}</span>
        `;
        item.addEventListener("click", () => {
          selectBank(bank);
          closeBottomSheet();
        });
        sheetListContainer.appendChild(item);
      });
    } else if (type === "ewallet") {
      sheetTitle.textContent = "Pilih Provider E-Wallet";
      ewallets.forEach(wallet => {
        const item = document.createElement("button");
        item.type = "button";
        item.className = "w-full flex items-center gap-3 p-4 hover:bg-surface-container rounded-2xl transition-all text-left active:scale-[0.99]";
        item.innerHTML = `
          <div class="w-10 h-10 rounded-full bg-teal-50 text-teal-600 flex items-center justify-center font-bold text-sm">
            ${wallet.shortName.substring(0, 2)}
          </div>
          <span class="font-body-md text-body-md text-primary font-medium">${wallet.name}</span>
        `;
        item.addEventListener("click", () => {
          selectEwallet(wallet);
          closeBottomSheet();
        });
        sheetListContainer.appendChild(item);
      });
    }

    bottomSheetBackdrop.classList.remove("pointer-events-none", "opacity-0");
    bottomSheet.classList.remove("translate-y-full");
  }

  function closeBottomSheet() {
    bottomSheetBackdrop.classList.add("pointer-events-none", "opacity-0");
    bottomSheet.classList.add("translate-y-full");
  }

  selectBankTrigger.addEventListener("click", () => openBottomSheet("bank"));
  selectEwalletTrigger.addEventListener("click", () => openBottomSheet("ewallet"));
  closeSheetBtn.addEventListener("click", closeBottomSheet);
  bottomSheetBackdrop.addEventListener("click", (e) => {
    if (e.target === bottomSheetBackdrop) closeBottomSheet();
  });

  // Select item functions
  function selectBank(bank) {
    selectedBank = bank;
    selectedBankName.textContent = bank.name;
    selectedBankName.classList.remove("text-text-muted");
    selectedBankName.classList.add("text-primary", "font-medium");
    selectedBankIcon.textContent = "account_balance";
    selectedBankIcon.className = "material-symbols-outlined text-primary";
    validateForm();
  }

  function selectEwallet(wallet) {
    selectedEwallet = wallet;
    selectedEwalletName.textContent = wallet.name;
    selectedEwalletName.classList.remove("text-text-muted");
    selectedEwalletName.classList.add("text-primary", "font-medium");
    selectedEwalletIcon.textContent = "account_balance_wallet";
    selectedEwalletIcon.className = "material-symbols-outlined text-primary";
    validateForm();
  }

  // Recent Contacts Autofill Flow
  recentItems.forEach(item => {
    item.addEventListener("click", () => {
      const type = item.getAttribute("data-type");
      const name = item.getAttribute("data-name");
      const detail = item.getAttribute("data-detail");

      switchTab(type);

      if (type === "snapcash") {
        inputSnapcashId.value = detail;
      } else if (type === "bank") {
        const bankShort = item.getAttribute("data-bank");
        const bankObj = banks.find(b => b.shortName === bankShort) || banks[0];
        selectBank(bankObj);
        inputBankAcc.value = detail;
      } else if (type === "ewallet") {
        const walletShort = item.getAttribute("data-ewallet");
        const walletObj = ewallets.find(w => w.shortName === walletShort) || ewallets[0];
        selectEwallet(walletObj);
        inputEwalletPhone.value = detail;
      }

      validateForm();

      // Trigger automatic checking for premium experience
      setTimeout(() => {
        handleCekNomor();
      }, 300);
    });
  });

  // Action flow (Cek Nomor)
  function handleCekNomor() {
    // Show loading
    btnCekNomor.disabled = true;
    btnText.textContent = "Memverifikasi...";
    btnIcon.classList.add("hidden");
    btnSpinner.classList.remove("hidden");

    // Mock API Check
    setTimeout(() => {
      let recName = "Rudi Hermawan";
      let recType = "SnapCash";
      let recNumber = "";

      if (activeTab === "snapcash") {
        const val = inputSnapcashId.value.trim();
        recName = val.includes("0812") || val === "Andi S." || val === "08123456789" ? "Andi Saputra" : "Rudi Hermawan";
        recType = "SnapCash";
        recNumber = val;
      } else if (activeTab === "bank") {
        recName = inputBankAcc.value.trim() === "1234567890" ? "Budi Kusuma" : "Hendra Wijaya";
        recType = selectedBank ? selectedBank.name : "Bank Lain";
        recNumber = inputBankAcc.value;
      } else if (activeTab === "ewallet") {
        recName = inputEwalletPhone.value.trim() === "08776655443" ? "Siska Amelia" : "Dewi Lestari";
        recType = selectedEwallet ? selectedEwallet.name : "E-Wallet";
        recNumber = inputEwalletPhone.value;
      }

      // Populate Modal
      confirmRecipientName.textContent = recName;
      confirmRecipientType.textContent = recType;
      confirmRecipientNumber.textContent = recNumber;

      // Reset Button State
      btnText.textContent = "Lanjut";
      btnIcon.classList.remove("hidden");
      btnSpinner.classList.add("hidden");
      btnCekNomor.disabled = false;

      // Open Modal
      openConfirmModal();
    }, 1200);
  }

  btnCekNomor.addEventListener("click", handleCekNomor);

  // Confirm Modal Control
  function openConfirmModal() {
    confirmModalBackdrop.classList.remove("pointer-events-none", "opacity-0");
    confirmModal.classList.remove("scale-95", "opacity-0");
  }

  function closeConfirmModal() {
    confirmModalBackdrop.classList.add("pointer-events-none", "opacity-0");
    confirmModal.classList.add("scale-95", "opacity-0");
  }

  confirmModalCancel.addEventListener("click", closeConfirmModal);
  confirmModalBackdrop.addEventListener("click", (e) => {
    if (e.target === confirmModalBackdrop) closeConfirmModal();
  });

  confirmModalNext.addEventListener("click", () => {
    // Save details to localStorage and redirect to next mock step
    const transferDetail = {
      name: confirmRecipientName.textContent,
      type: confirmRecipientType.textContent,
      number: confirmRecipientNumber.textContent,
      activeTab: activeTab,
      timestamp: Date.now()
    };
    localStorage.setItem("pendingTransfer", JSON.stringify(transferDetail));
    closeConfirmModal();
    window.location.href = "transfer-amount.html";
  });
});
