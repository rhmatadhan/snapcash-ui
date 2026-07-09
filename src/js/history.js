/**
 * History Page — Interactive Logic
 * Handles filtering of transactions by category (All, In, Out, Pending).
 */
document.addEventListener("DOMContentLoaded", () => {
  const filterButtons = document.querySelectorAll(".filter-btn");
  const transactionGroups = document.querySelectorAll(".transaction-group");
  const emptyState = document.getElementById("empty-state");

  // Active & Inactive style classes for filter buttons
  const activeClasses = [
    "bg-secondary-container",
    "text-on-secondary-container",
    "font-semibold",
  ];
  const inactiveClasses = [
    "bg-surface-container-low",
    "text-on-surface-variant",
    "font-medium",
    "border",
    "border-outline-variant/30",
  ];

  if (filterButtons.length > 0) {
    filterButtons.forEach((btn) => {
      btn.addEventListener("click", () => {
        const filterValue = btn.getAttribute("data-filter");

        // 1. Update filter buttons UI
        filterButtons.forEach((b) => {
          b.classList.remove(...activeClasses);
          b.classList.add(...inactiveClasses);
        });
        btn.classList.remove(...inactiveClasses);
        btn.classList.add(...activeClasses);

        // 2. Filter transactions
        let totalVisible = 0;

        transactionGroups.forEach((group) => {
          const rows = group.querySelectorAll(".transaction-row");
          let groupVisibleCount = 0;

          rows.forEach((row) => {
            const type = row.getAttribute("data-type");
            const status = row.getAttribute("data-status");

            let shouldShow = false;

            if (filterValue === "all") {
              shouldShow = true;
            } else if (filterValue === "in" && type === "in") {
              shouldShow = true;
            } else if (filterValue === "out" && type === "out") {
              shouldShow = true;
            } else if (filterValue === "pending" && status === "pending") {
              shouldShow = true;
            }

            if (shouldShow) {
              row.style.display = "flex";
              groupVisibleCount++;
              totalVisible++;
            } else {
              row.style.display = "none";
            }
          });

          // Show or hide the whole date group based on visible rows inside it
          if (groupVisibleCount > 0) {
            group.style.display = "block";
          } else {
            group.style.display = "none";
          }
        });

        // 3. Handle Empty State
        if (totalVisible === 0) {
          emptyState.classList.remove("hidden");
          emptyState.classList.add("flex");
        } else {
          emptyState.classList.remove("flex");
          emptyState.classList.add("hidden");
        }
      });
    });
  }
});
