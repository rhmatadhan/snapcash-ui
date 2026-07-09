/**
 * Transaction Status Page — State Management
 * Handles rendering different transaction states (success, failed, pending).
 */

// State Configuration Map
const states = {
  success: {
    title: "Transaksi Berhasil!",
    titleClass: "text-success-green",
    iconBg:
      "bg-success-green shadow-[0_8px_24px_rgba(22,163,74,0.25)] animate-[scaleIn_0.5s_cubic-bezier(0.175,0.885,0.32,1.275)]",
    iconSymbol: "check",
    headerTitle: "Detail Transaksi",
    showShare: true,
    showFailedRow: false,
    showPendingRow: false,
    primaryBtnText: "Lihat Riwayat Transaksi",
    primaryBtnIcon: "arrow_forward",
    primaryBtnClass:
      "bg-secondary-container hover:bg-secondary-fixed-dim text-primary-container shadow-[0_4px_14px_rgba(178,247,70,0.25)]",
    secondaryBtnText: "Kembali ke Beranda",
    secondaryBtnClass: "text-text-muted hover:text-primary-container",
    secondaryBtnAction: "window.location.href='index.html'",
  },
  failed: {
    title: "Transaksi Gagal",
    titleClass: "text-error-red",
    iconBg:
      "bg-red-100 shadow-[0_8px_24px_rgba(239,68,68,0.15)] animate-[scaleIn_0.5s_cubic-bezier(0.175,0.885,0.32,1.275)]",
    iconSymbol: "close",
    iconSymbolClass: "text-error-red font-bold",
    headerTitle: "Detail Transaksi",
    showShare: false,
    showFailedRow: true,
    showPendingRow: false,
    primaryBtnText: "Coba Lagi",
    primaryBtnIcon: "refresh",
    primaryBtnClass:
      "bg-error-red hover:bg-red-600 text-white shadow-[0_4px_14px_rgba(239,68,68,0.2)]",
    secondaryBtnText: "Butuh Bantuan? Hubungi CS SnapCash",
    secondaryBtnClass: "text-text-muted hover:text-primary-container",
    secondaryBtnAction: "window.location.href='index.html'",
  },
  pending: {
    title: "Menunggu Pembayaran...",
    titleClass: "text-amber-500",
    iconBg:
      "bg-amber-500 shadow-[0_8px_24px_rgba(245,158,11,0.25)] animate-[scaleIn_0.5s_cubic-bezier(0.175,0.885,0.32,1.275)]",
    iconSymbol: "hourglass_empty",
    headerTitle: "Detail Transaksi",
    showShare: true,
    showFailedRow: false,
    showPendingRow: true,
    primaryBtnText: "Cek Status Pembayaran",
    primaryBtnIcon: "refresh",
    primaryBtnClass:
      "bg-primary-container hover:bg-gray-800 text-white shadow-[0_4px_14px_rgba(31,41,55,0.2)]",
    secondaryBtnText: "Batalkan Transaksi",
    secondaryBtnClass: "text-error-red hover:text-red-700",
    secondaryBtnAction:
      "if(confirm('Batalkan transaksi ini?')) window.location.href='index.html'",
  },
};

/**
 * Updates the DOM based on selected transaction state.
 * @param {string} stateName - One of 'success', 'failed', or 'pending'
 */
function setPageState(stateName) {
  const config = states[stateName] || states.success;

  // 1. Update Title and Icon
  document.title = `${config.title} - SnapCash`;

  const titleEl = document.getElementById("status-title");
  titleEl.textContent = config.title;
  titleEl.className = `font-headline-lg text-headline-lg mb-1 transition-all duration-300 ${config.titleClass}`;

  const iconBgEl = document.getElementById("status-icon-bg");
  iconBgEl.className = `w-20 h-20 rounded-full flex items-center justify-center mb-4 transition-all duration-300 ${config.iconBg}`;

  const iconSymbolEl = document.getElementById("status-icon-symbol");
  iconSymbolEl.textContent = config.iconSymbol;
  if (config.iconSymbolClass) {
    iconSymbolEl.className = `material-symbols-outlined text-[40px] ${config.iconSymbolClass}`;
  } else {
    iconSymbolEl.className = `material-symbols-outlined text-white text-[40px]`;
  }

  // 2. Update Header
  const headerTitleEl = document.getElementById("header-title");
  headerTitleEl.textContent = config.headerTitle;

  const shareBtn = document.getElementById("header-share");
  const spacer = document.getElementById("header-spacer");
  if (config.showShare) {
    shareBtn.classList.remove("hidden");
    spacer.classList.add("hidden");
  } else {
    shareBtn.classList.add("hidden");
    spacer.classList.remove("hidden");
  }

  // 3. Update Custom Rows in Receipt Card
  const failedRow = document.getElementById("failed-reason-row");
  if (config.showFailedRow) {
    failedRow.classList.remove("hidden");
  } else {
    failedRow.classList.add("hidden");
  }

  const pendingRow = document.getElementById("pending-deadline-row");
  if (config.showPendingRow) {
    pendingRow.classList.remove("hidden");
  } else {
    pendingRow.classList.add("hidden");
  }

  // 4. Update Buttons
  const primaryBtn = document.getElementById("primary-btn");
  const primaryBtnText = document.getElementById("primary-btn-text");
  const primaryBtnIcon = document.getElementById("primary-btn-icon");

  primaryBtnText.textContent = config.primaryBtnText;
  primaryBtnIcon.textContent = config.primaryBtnIcon;
  primaryBtn.className = `w-full transition-all duration-300 font-headline-md text-headline-md py-4 rounded-xl flex items-center justify-center active:scale-[0.98] font-semibold ${config.primaryBtnClass}`;

  // Set action for primary button
  if (stateName === "success") {
    primaryBtn.onclick = () => { window.location.href = "history.html"; };
  } else if (stateName === "failed") {
    primaryBtn.onclick = () => { window.location.href = "index.html"; };
  } else if (stateName === "pending") {
    primaryBtn.onclick = () => { window.location.reload(); };
  }

  const secondaryBtn = document.getElementById("secondary-btn");
  secondaryBtn.textContent = config.secondaryBtnText;
  secondaryBtn.className = `w-full bg-transparent transition-colors font-headline-md text-headline-md py-3 rounded-xl active:scale-[0.98] text-center font-medium ${config.secondaryBtnClass}`;
  secondaryBtn.setAttribute(
    "onclick",
    config.secondaryBtnAction || "window.location.href='index.html'"
  );

  // Update URL query parameter without reloading
  const url = new URL(window.location);
  url.searchParams.set("status", stateName);
  window.history.pushState({}, "", url);
}

// Initialize state on page load
window.addEventListener("DOMContentLoaded", () => {
  const params = new URLSearchParams(window.location.search);
  const initialStatus = params.get("status") || "success";
  setPageState(initialStatus);
});
