const reveals = document.querySelectorAll(".reveal");

const observer = new IntersectionObserver(entries => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add("active");
    }
  });
}, { threshold: 0.15 });

reveals.forEach(el => observer.observe(el));

window.addEventListener("scroll", () => {
  reveals.forEach(el => {
    const top = el.getBoundingClientRect().top;
    if (top < window.innerHeight - 100) {
      el.classList.add("active");
    }
  });
});

const text = "Demian Dunov";
const typingElement = document.getElementById("typing-name");

const typingSpeed = 120;
const deletingSpeed = 120;
const pauseAfterTyping = 1000;   // jeda setelah selesai ngetik
const pauseAfterDeleting = 1000;  // jeda setelah selesai hapus

let index = 0;
let isDeleting = false;

function typeEffect() {
  if (!isDeleting) {
    // MODE NGETIK
    typingElement.textContent = text.substring(0, index + 1);
    index++;

    if (index === text.length) {
      // selesai ngetik → DIEM DULU
      setTimeout(() => (isDeleting = true), pauseAfterTyping);
    }
  } else {
    // MODE HAPUS
    typingElement.textContent = text.substring(0, index - 1);
    index--;

    if (index === 0) {
      // selesai hapus → DIEM DULU
      setTimeout(() => (isDeleting = false), pauseAfterDeleting);
    }
  }

  setTimeout(
    typeEffect,
    isDeleting ? deletingSpeed : typingSpeed
  );
}

typeEffect();
