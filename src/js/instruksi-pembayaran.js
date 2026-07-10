/**
 * Instruksi Pembayaran Page — Interactive Logic
 * Handles countdown, code copying, dynamic accordions, and transaction simulation.
 */
document.addEventListener("DOMContentLoaded", () => {
  // DOM Elements
  const amountEl = document.getElementById("payment-amount");
  const countdownEl = document.getElementById("countdown-timer");
  const deadlineEl = document.getElementById("payment-deadline");
  const methodNameEl = document.getElementById("method-name");
  const methodIconEl = document.getElementById("method-icon");
  const methodIconContainer = document.getElementById("method-icon-container");
  const paymentCodeEl = document.getElementById("payment-code");
  const copyBtn = document.getElementById("copy-code-btn");
  const copyText = document.getElementById("copy-text");
  const copyIcon = document.getElementById("copy-icon");
  const accordionContainer = document.getElementById("accordion-container");
  const verifyBtn = document.getElementById("verify-payment-btn");
  const verifyIcon = document.getElementById("verify-icon");

  // 1. Load pending transaction from localStorage
  const pendingTxRaw = localStorage.getItem("pendingTransaction");
  let pendingTx = {
    amount: 100000,
    method: "bca",
    methodName: "BCA Virtual Account",
    timestamp: Date.now()
  };

  if (pendingTxRaw) {
    try {
      pendingTx = JSON.parse(pendingTxRaw);
    } catch (e) {
      console.error("Failed to parse pending transaction", e);
    }
  }

  // Setup initial values
  if (amountEl) {
    amountEl.textContent = formatCurrency(pendingTx.amount);
  }
  if (methodNameEl) {
    methodNameEl.textContent = pendingTx.methodName;
  }

  // Set method specific icons and codes
  let paymentCode = "8077 0812 3456 7890";
  let iconSymbol = "account_balance";

  if (pendingTx.method === "minimarket") {
    paymentCode = "9923 0812 3456 7890";
    iconSymbol = "storefront";
  } else if (pendingTx.method === "gopay") {
    paymentCode = "GP-081234567890";
    iconSymbol = "account_balance_wallet";
  } else if (pendingTx.method === "mandiri") {
    paymentCode = "8921 0812 3456 7890";
    iconSymbol = "account_balance";
  }

  if (paymentCodeEl) paymentCodeEl.textContent = paymentCode;
  if (methodIconEl) methodIconEl.textContent = iconSymbol;

  // Formatting helpers
  function formatNumber(num) {
    return num.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".");
  }

  function formatCurrency(num) {
    return "Rp " + formatNumber(num);
  }

  // 2. Expiration Date and Countdown Timer (24 Hours)
  const expirationTime = pendingTx.timestamp + 24 * 60 * 60 * 1000;
  
  // Display deadline date
  if (deadlineEl) {
    const deadlineDate = new Date(expirationTime);
    const options = { day: "numeric", month: "long", year: "numeric", hour: "2-digit", minute: "2-digit" };
    deadlineEl.textContent = `Sebelum ${deadlineDate.toLocaleDateString("id-ID", options)} WIB`;
  }

  // Ticking countdown timer
  function updateTimer() {
    const now = Date.now();
    const timeDiff = expirationTime - now;

    if (timeDiff <= 0) {
      if (countdownEl) countdownEl.textContent = "00:00:00";
      clearInterval(timerInterval);
      return;
    }

    const hours = Math.floor(timeDiff / (1000 * 60 * 60));
    const minutes = Math.floor((timeDiff % (1000 * 60 * 60)) / (1000 * 60));
    const seconds = Math.floor((timeDiff % (1000 * 60)) / 1000);

    const pad = (n) => (n < 10 ? "0" + n : n);
    if (countdownEl) {
      countdownEl.textContent = `${pad(hours)}:${pad(minutes)}:${pad(seconds)}`;
    }
  }

  updateTimer();
  const timerInterval = setInterval(updateTimer, 1000);

  // 3. Copy Code Action
  if (copyBtn && paymentCodeEl) {
    copyBtn.addEventListener("click", () => {
      const textToCopy = paymentCodeEl.textContent.trim();
      navigator.clipboard.writeText(textToCopy).then(() => {
        // Update to Success state
        if (copyText) copyText.textContent = "Tersalin!";
        if (copyIcon) copyIcon.textContent = "check";
        copyBtn.className = "bg-success-green/10 border border-success-green/30 px-3 py-1.5 rounded-lg font-label-sm text-label-sm text-success-green transition-all duration-200 active:scale-95 flex items-center gap-1 shadow-sm";
        
        // Revert back after 2 seconds
        setTimeout(() => {
          if (copyText) copyText.textContent = "Salin";
          if (copyIcon) copyIcon.textContent = "content_copy";
          copyBtn.className = "bg-surface hover:bg-surface-container-high border border-surface-variant px-3 py-1.5 rounded-lg font-label-sm text-label-sm text-text-muted hover:text-primary transition-all duration-200 active:scale-95 flex items-center gap-1 shadow-sm";
        }, 2000);
      }).catch(err => {
        console.error("Failed to copy text", err);
      });
    });
  }

  // 4. Generate Accordion Panduan dynamically
  const instructionsMap = {
    bca: [
      {
        title: "m-BCA (BCA mobile)",
        steps: [
          "Login ke aplikasi BCA mobile.",
          "Pilih menu <strong>m-Transfer</strong>, lalu pilih <strong>BCA Virtual Account</strong>.",
          `Masukkan nomor Virtual Account: <strong>${paymentCode}</strong>.`,
          "Pastikan detail pembayaran benar, lalu masukkan PIN m-BCA Anda."
        ]
      },
      {
        title: "KlikBCA",
        steps: [
          "Login ke situs KlikBCA.",
          "Pilih menu <strong>Transfer Dana</strong> -> <strong>Transfer ke BCA Virtual Account</strong>.",
          `Masukkan nomor Virtual Account: <strong>${paymentCode}</strong>.`,
          "Ikuti instruksi token KeyBCA untuk menyelesaikan transaksi."
        ]
      },
      {
        title: "ATM BCA",
        steps: [
          "Masukkan Kartu ATM dan PIN BCA Anda.",
          "Pilih menu <strong>Transaksi Lainnya</strong> -> <strong>Transfer</strong> -> <strong>Ke Rek BCA Virtual Account</strong>.",
          `Masukkan nomor Virtual Account: <strong>${paymentCode}</strong>.`,
          "Periksa layar konfirmasi, masukkan nominal jika diminta, lalu pilih <strong>Ya</strong>."
        ]
      }
    ],
    minimarket: [
      {
        title: "Pembayaran di Alfamart / Alfamidi",
        steps: [
          "Datang ke gerai Alfamart atau Alfamidi terdekat.",
          "Katakan pada kasir ingin melakukan pembayaran 'SnapCash'.",
          `Tunjukkan kode pembayaran berikut ke kasir: <strong>${paymentCode}</strong>.`,
          "Bayar sesuai nominal tagihan yang disebutkan kasir dan minta struk pembayaran."
        ]
      },
      {
        title: "Pembayaran di Indomaret",
        steps: [
          "Datang ke gerai Indomaret terdekat.",
          "Sampaikan ke kasir ingin melakukan pembayaran tagihan merchant 'SnapCash'.",
          `Berikan kode bayar: <strong>${paymentCode}</strong> ke kasir.`,
          "Lakukan pembayaran menggunakan tunai atau kartu debit, lalu simpan struk pembayaran."
        ]
      }
    ],
    gopay: [
      {
        title: "Aplikasi GoPay",
        steps: [
          "Buka aplikasi Gojek atau GoPay.",
          "Pilih menu <strong>Bayar</strong> atau <strong>Kirim</strong>.",
          `Pilih transfer ke Rekening Bank atau Virtual Account, masukkan: <strong>${paymentCode}</strong>.`,
          "Masukkan nominal pembayaran yang sesuai, lalu ketik PIN GoPay Anda."
        ]
      }
    ],
    mandiri: [
      {
        title: "Livin' by Mandiri",
        steps: [
          "Buka aplikasi Livin' by Mandiri dan lakukan login.",
          "Pilih menu <strong>Bayar</strong> -> <strong>Multipayment</strong>.",
          "Cari penyedia jasa 'SnapCash' atau masukkan kode institusi.",
          `Masukkan nomor Virtual Account: <strong>${paymentCode}</strong>.`,
          "Konfirmasi nominal, lalu masukkan PIN transaksi Livin' Anda."
        ]
      },
      {
        title: "ATM Mandiri",
        steps: [
          "Masukkan kartu ATM Mandiri dan PIN Anda.",
          "Pilih menu <strong>Bayar/Beli</strong> -> <strong>Multipayment</strong>.",
          "Ketik kode perusahaan, lalu masukkan nomor Virtual Account: <strong>${paymentCode}</strong>.",
          "Pilih item pembayaran, periksa layar konfirmasi, lalu pilih <strong>Ya</strong>."
        ]
      }
    ]
  };

  const currentInstructions = instructionsMap[pendingTx.method] || instructionsMap.bca;

  function renderAccordions() {
    if (!accordionContainer) return;
    accordionContainer.innerHTML = "";

    currentInstructions.forEach((item, index) => {
      // Create accordion item element
      const accordionItem = document.createElement("div");
      accordionItem.className = "border border-border-subtle rounded-xl overflow-hidden bg-white shadow-2xs";

      // Header button
      const headerButton = document.createElement("button");
      headerButton.type = "button";
      headerButton.className = "w-full flex items-center justify-between p-4 font-headline-md text-headline-md text-primary font-medium hover:bg-surface transition-all select-none focus:outline-none";
      headerButton.innerHTML = `
        <span>${item.title}</span>
        <span class="chevron-icon material-symbols-outlined text-[20px] text-text-muted transition-transform duration-200">expand_more</span>
      `;

      // Content panel
      const contentPanel = document.createElement("div");
      contentPanel.className = "panel-content hidden bg-surface-container-low/40 p-5 border-t border-border-subtle";

      // Steps list
      const stepsList = document.createElement("ol");
      stepsList.className = "list-decimal list-inside space-y-3 font-body-sm text-body-sm text-on-surface-variant";
      item.steps.forEach(step => {
        const stepLi = document.createElement("li");
        stepLi.innerHTML = step;
        stepsList.appendChild(stepLi);
      });
      contentPanel.appendChild(stepsList);

      // Event listener to toggle
      headerButton.addEventListener("click", () => {
        const isHidden = contentPanel.classList.contains("hidden");
        const chevron = headerButton.querySelector(".chevron-icon");

        // Close all other panels
        document.querySelectorAll(".panel-content").forEach(p => p.classList.add("hidden"));
        document.querySelectorAll(".chevron-icon").forEach(c => c.classList.remove("rotate-180"));

        if (isHidden) {
          contentPanel.classList.remove("hidden");
          if (chevron) chevron.classList.add("rotate-180");
        }
      });

      // Expand the first panel by default
      if (index === 0) {
        contentPanel.classList.remove("hidden");
        const initialChevron = headerButton.querySelector(".chevron-icon");
        if (initialChevron) initialChevron.classList.add("rotate-180");
      }

      accordionItem.appendChild(headerButton);
      accordionItem.appendChild(contentPanel);
      accordionContainer.appendChild(accordionItem);
    });
  }

  renderAccordions();

  // 5. Cek Status Pembayaran (Mockup verification flow)
  if (verifyBtn) {
    verifyBtn.addEventListener("click", () => {
      // 1. Loading Visual State
      if (verifyIcon) verifyIcon.classList.add("animate-spin");
      verifyBtn.disabled = true;
      verifyBtn.textContent = "Memverifikasi Pembayaran...";

      // 2. Simulate server delay
      setTimeout(() => {
        // Fetch current balance, add amount, and save back
        let currentBalance = parseInt(localStorage.getItem("userBalance") || "12450000", 10);
        const newBalance = currentBalance + pendingTx.amount;
        localStorage.setItem("userBalance", newBalance);

        // Record successful transaction to history
        const txId = "TX-" + Math.floor(Math.random() * 900000000 + 100000000);
        const txDetails = {
          id: txId,
          type: "Top Up Saldo",
          amount: pendingTx.amount,
          method: pendingTx.methodName,
          date: new Date().toLocaleDateString("id-ID", {
            day: "numeric",
            month: "long",
            year: "numeric"
          }) + ", " + new Date().toLocaleTimeString("id-ID", { hour: '2-digit', minute: '2-digit' }) + " WIB"
        };
        
        try {
          let history = JSON.parse(localStorage.getItem("transactionHistory") || "[]");
          history.unshift(txDetails);
          localStorage.setItem("transactionHistory", JSON.stringify(history));
        } catch (e) {
          console.error("Failed to append transaction history", e);
        }

        // Clean up pending transaction
        localStorage.removeItem("pendingTransaction");

        // Redirect to success page
        window.location.href = `transaction-status.html?status=success`;
      }, 1500);
    });
  }
});
