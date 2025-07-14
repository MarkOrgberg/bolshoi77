document.addEventListener("DOMContentLoaded", () => {
  const ticks = document.querySelectorAll(".tick");
  const allPeopleIcons = document.querySelectorAll(".person");
  const resetButton = document.getElementById("resetTimeline");

  const shownPeople = new Set();

  ticks.forEach(tick => {
  tick.addEventListener("click", () => {
    const showAttr = tick.dataset.show;
    const hideAttr = tick.dataset.hide;
    const legacyPeopleAttr = tick.dataset.people || tick.dataset.person;
    const legacyAction = tick.dataset.action;

    // Handle new format
    if (showAttr) {
      const toShow = showAttr.split(",").map(p => p.trim());
      toShow.forEach(p => shownPeople.add(p));
    }

    if (hideAttr) {
      const toHide = hideAttr.split(",").map(p => p.trim());
      toHide.forEach(p => shownPeople.delete(p));
    }

    // Handle legacy format
    if (legacyPeopleAttr && legacyAction) {
      const people = legacyPeopleAttr.split(",").map(p => p.trim());
      if (legacyAction === "show") {
        people.forEach(p => shownPeople.add(p));
      } else if (legacyAction === "hide") {
        people.forEach(p => shownPeople.delete(p));
      }
    }

    updatePeopleDisplay();
  });
});

  function updatePeopleDisplay() {
    allPeopleIcons.forEach(icon => {
      const personClass = [...icon.classList].find(c => c !== "person");
      if (shownPeople.has(personClass)) {
        icon.style.display = "block";
        icon.classList.remove("highlight");
        void icon.offsetWidth; // force reflow
        icon.classList.add("highlight");
      } else {
        icon.style.display = "none";
      }
    });
  }

  if (resetButton) {
    resetButton.addEventListener("click", () => {
      shownPeople.clear();
      updatePeopleDisplay();

      // Optional: scroll timeline back to start
      const timeline = document.querySelector(".timeline-line");
      if (timeline) timeline.scrollTo({ left: 0, behavior: "smooth" });
    });
  }

  // Optional: ensure icons are hidden initially
  updatePeopleDisplay();
});