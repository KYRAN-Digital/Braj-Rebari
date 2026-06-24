document.addEventListener("DOMContentLoaded", () => {
  // 1. Mark body as JS active to enable scroll animation starting states safely
  document.body.classList.add("js-active");

  // 2. IntersectionObserver for scroll-reveal sections
  const revealItems = document.querySelectorAll(".scroll-reveal");
  
  if ("IntersectionObserver" in window) {
    const revealObserver = new IntersectionObserver(
      (entries, observer) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("visible");
            observer.unobserve(entry.target); // Animates once and stays visible
          }
        });
      },
      {
        threshold: 0.12, // Trigger when 12% of the element is visible
        rootMargin: "0px 0px -40px 0px" // Slight offset from viewport bottom
      }
    );

    revealItems.forEach((item) => {
      revealObserver.observe(item);
    });
  } else {
    // Fallback if IntersectionObserver is not supported
    revealItems.forEach((item) => {
      item.classList.add("visible");
    });
  }

  // 3. Sticky Bottom Action Bar Scroll Controller
  const stickyBar = document.getElementById("sticky-bar");
  
  const handleScroll = () => {
    // Show sticky bar after scrolling past 350px
    if (window.scrollY > 350) {
      stickyBar.classList.add("visible");
    } else {
      stickyBar.classList.remove("visible");
    }
  };

  // Run on initial load and on scroll
  handleScroll();
  window.addEventListener("scroll", handleScroll, { passive: true });

  // 4. Carousel Dot Indicator Sync
  const carousel = document.getElementById("poster-carousel");
  const indicators = document.querySelectorAll(".carousel-indicators .indicator");

  if (carousel && indicators.length > 0) {
    const updateIndicators = () => {
      const scrollWidth = carousel.scrollWidth - carousel.clientWidth;
      if (scrollWidth <= 0) return;
      
      // Calculate current active slide index
      const slideWidth = carousel.querySelector(".carousel-slide").clientWidth + 16; // width + gap
      const activeIndex = Math.min(
        indicators.length - 1,
        Math.round(carousel.scrollLeft / slideWidth)
      );

      indicators.forEach((indicator, index) => {
        if (index === activeIndex) {
          indicator.classList.add("active");
        } else {
          indicator.classList.remove("active");
        }
      });
    };

    carousel.addEventListener("scroll", updateIndicators, { passive: true });
    
    // Tap on indicator to scroll to slide (Bonus interaction)
    indicators.forEach((indicator, index) => {
      indicator.addEventListener("click", () => {
        const slideWidth = carousel.querySelector(".carousel-slide").clientWidth + 16;
        carousel.scrollTo({
          left: index * slideWidth,
          behavior: "smooth"
        });
      });
    });
  }
});