gsap.from("#name", {duration: 1, opacity: 0, delay: 0.2});
gsap.from("#blue-beam", {duration: 1, scaleX: 0, ease: "power2.out", delay: 0});
gsap.from(".link-button:nth-of-type(1)", {
  duration: 1,
  x: "-50%",
  opacity: 0,
  ease: "power2.out",
  delay: 0.5
});

gsap.from(".link-button:nth-of-type(2)", {
  duration: 1,
  y: "50%",
  opacity: 0,
  ease: "power2.out",
  delay: 0.5
});

gsap.from(".link-button:nth-of-type(3)", {
  duration: 1,
  x: "50%",
  opacity: 0,
  ease: "power2.out",
  delay: 0.5
});

gsap.from("#down-arrow", {
  duration: 1,
  opacity: 0,
  y: "-50%",
  ease: "power2.out",
  delay: 0.5
});