// © 2025 Guangsen Yan <guangsen.yan@outlook.com>

document.addEventListener(
  "mouseenter",
  (event) => {
    // Ensure the target is an element and find the closest anchor
    if (event.target.nodeType !== Node.ELEMENT_NODE) return;
    const target = event.target.closest("a");
    if (!target) return; // Exit if no anchor is found

    const handleKeyDown = (e) => {
      if (e.shiftKey && !target.dataset.disabled) {
        e.preventDefault();

        // Save original values using dataset
        target.dataset.originalHref = target.getAttribute("href");
        target.dataset.originalColor = target.style.color;
        target.dataset.originalTransition = target.style.transition;

        // Mark link as disabled and remove the href
        target.dataset.disabled = "true";
        target.removeAttribute("href");
        target.style.pointerEvents = "none";

        // Set transition and new styles for animation
        target.style.transition = "color 0.5s ease, background-color 0.5s ease";
        target.style.color = "#8d8d8d";
        target.style.backgroundColor = "#ff9999";

        // Force a reflow to ensure the transition is triggered
        void target.offsetWidth;

        // After 0.5s, remove the temporary background color.
        setTimeout(() => {
          target.style.backgroundColor = "";
        }, 500);

        // After 5 seconds, animate re-enabling the link
        setTimeout(() => {
          // Animate the text color back to the original
          target.style.transition = "color 0.5s ease";
          target.style.color = target.dataset.originalColor;

          // Restore the href and pointer events
          setTimeout(() => {
            target.setAttribute("href", target.dataset.originalHref);
            target.style.pointerEvents = "auto";
            target.style.transition = target.dataset.originalTransition || "";
            delete target.dataset.disabled;
          }, 500);
        }, 5000);
      }
    };

    document.addEventListener("keydown", handleKeyDown);

    target.addEventListener(
      "mouseleave",
      () => {
        document.removeEventListener("keydown", handleKeyDown);
      },
      { once: true }
    );
  },
  true
);
