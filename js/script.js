window.addEventListener("DOMContentLoaded", () => {
  const ticks = document.querySelectorAll(".tick");
  const allIcons = document.querySelectorAll(".person");

  // Track the first tick each person appears in
  const personFirstAppearance = {};
  ticks.forEach((tick, i) => {
    const peopleAttr = tick.dataset.person || tick.dataset.people;
    if (!peopleAttr) return;
    const people = peopleAttr.split(",").map(p => p.trim()).filter(Boolean);
    people.forEach(person => {
      if (!personFirstAppearance[person]) {
        personFirstAppearance[person] = i; // first tick index
      }
    });
  });

  let visiblePeople = new Set();

  ticks.forEach((tick, i) => {
    tick.addEventListener("click", () => {
      const peopleAttr = tick.dataset.person || tick.dataset.people;
      const action = tick.dataset.action;
      if (!peopleAttr || !action) return;

      const people = peopleAttr.split(",").map(p => p.trim()).filter(Boolean);

      if (action === "show") {
        people.forEach(person => visiblePeople.add(person));
      } else if (action === "hide") {
        people.forEach(person => visiblePeople.delete(person));
      }

      // Now show/hide all icons based on visibility rules
      allIcons.forEach(icon => {
        const personClass = [...icon.classList].find(c => c !== "person");
        if (!personClass) return;

        const firstAppearanceTick = personFirstAppearance[personClass];
        const isVisible = visiblePeople.has(personClass);

        if (firstAppearanceTick !== undefined && firstAppearanceTick <= i && isVisible) {
          icon.style.display = "block";
          icon.classList.remove("highlight");
          void icon.offsetWidth;
          icon.classList.add("highlight");
        } else {
          icon.style.display = "none";
        }
      });
    });
  });
});
document.addEventListener("DOMContentLoaded", () => {
  const startBtn = document.getElementById("startBtn");
  const introSection = document.querySelector(".intro");
  const introImage = document.querySelector(".intro-image");
  const mainContent = document.getElementById("mainContent");

  if (startBtn && introImage && mainContent && introSection) {
    startBtn.addEventListener("click", () => {
      introImage.classList.add("zoom-out");

      setTimeout(() => {
        introSection.style.display = "none";
        mainContent.classList.remove("hidden");
        mainContent.classList.add("fade-in");
      }, 1200);
    });
  }
});