/*
  This script handles:
  1. Table of Contents generation on index.html.
  2. Logo carousel functionality on index.html.
  3. Previous/Next navigation on day pages.
  To add a new day:
    - Create day3.html using the content page template.
    - Add to the 'days' array below.
  To add a new logo:
    - Add an <img> tag in index.html's .carousel-track.
*/

// Array of bootcamp days
const days = [
    { file: 'day1.html', title: '1. Introduction to Data Science' },
    { file: 'day2.html', title: '2. Analytics Lifecycle' },
    { file: 'day3.html', title: '3. Basic Python' },
    { file: 'day4.html', title: '4. Creating Portfolio' },
    { file: 'day5.html', title: '5. Basic Analytic Case Study with SQL' },
    { file: 'day6.html', title: '6. Basic SQL' },
    { file: 'day7.html', title: '7. Basic SQL Case Study' },
    { file: 'day8.html', title: '8. Machine Learning' },
    { file: 'day9.html', title: '9. Explanatory Model Analysis: Model Dependent' },
    { file: 'day10.html', title: '10. Explanatory Model Analysis: Model Agnostics' },
    { file: 'day11.html', title: '11. Time Series Analysis' },
    { file: 'day12.html', title: '12. Causal Analysis I' },
    { file: 'day13.html', title: '13. Causal Analysis II' },
    { file: 'day14.html', title: '14. Case Study 1 Customer Segmentation' },
    { file: 'day15.html', title: '15. Case Study 2 Customer Churn Modelling' },
    { file: 'day16.html', title: '16. Customer Lifetime Value' },
    { file: 'day17.html', title: '17. Market Channel Optimization' },
    { file: 'day18.html', title: '18. A/B Testing' },
    { file: 'day19.html', title: '19. Uplift Modelling' },
    { file: 'day20.html', title: '20. Descriptive Statistics' },
    { file: 'day21.html', title: '21. Hypothesis Testing' },
    { file: 'day22.html', title: '22. Data Cleaning' },
    { file: 'day23.html', title: '23. Data Manipulation' },
    { file: 'day24.html', title: '24. Data Visualisation' },
    { file: 'day25.html', title: '25. Web Dashboard' },
    { file: 'day26.html', title: '26. Exploratory Data Analysis' },
    { file: 'day27.html', title: '27. Linear Regression' },
    { file: 'day28.html', title: '28. Regularised Regression' },
    { file: 'day29.html', title: '29. Supervised Machine Learning Models' },
    { file: 'day30.html', title: '30. Unsupervised Machine Learning Models' },
    { file: 'day31.html', title: '31. Hyperparameter Tuning' },
    // Add new days here, e.g., { file: 'day3.html', title: 'Day 3: JavaScript Basics' }
  ];
  
  // Generate Table of Contents (for index.html)
  function generateTOC() {
    const tocList = document.getElementById('toc-list');
    if (tocList) {
      days.forEach(day => {
        const li = document.createElement('li');
        const a = document.createElement('a');
        a.href = day.file;
        a.textContent = day.title;
        li.appendChild(a);
        tocList.appendChild(li);
      });
    }
  }
  
  // Logo Carousel Functionality (for index.html)
  function initCarousel() {
    const track = document.querySelector('.carousel-track');
    if (track) {
      const logos = document.querySelectorAll('.carousel-track img');
      const prevBtn = document.querySelector('.carousel-btn.prev');
      const nextBtn = document.querySelector('.carousel-btn.next');
      let currentIndex = 0;
      const logoWidth = 200; // Approximate width per logo
      const autoScrollInterval = 3000; // 3 seconds
  
      // Clone logos for infinite scroll
      logos.forEach(logo => {
        const clone = logo.cloneNode(true);
        track.appendChild(clone);
      });
  
      // Move to next logo
      function moveNext() {
        currentIndex++;
        if (currentIndex >= logos.length) {
          currentIndex = 0;
          track.style.transition = 'none';
          track.style.transform = `translateX(0)`;
          setTimeout(() => {
            track.style.transition = 'transform 0.5s ease';
          }, 50);
        } else {
          track.style.transform = `translateX(-${currentIndex * logoWidth}px)`;
        }
      }
  
      // Move to previous logo
      function movePrev() {
        currentIndex--;
        if (currentIndex < 0) {
          currentIndex = logos.length - 1;
          track.style.transition = 'none';
          track.style.transform = `translateX(-${currentIndex * logoWidth}px)`;
          setTimeout(() => {
            track.style.transition = 'transform 0.5s ease';
          }, 50);
        } else {
          track.style.transform = `translateX(-${currentIndex * logoWidth}px)`;
        }
      }
  
      // Auto-scroll
      let autoScroll = setInterval(moveNext, autoScrollInterval);
  
      // Pause on hover
      track.addEventListener('mouseenter', () => clearInterval(autoScroll));
      track.addEventListener('mouseleave', () => {
        autoScroll = setInterval(moveNext, autoScrollInterval);
      });
  
      // Button navigation
      nextBtn.addEventListener('click', () => {
        clearInterval(autoScroll);
        moveNext();
        autoScroll = setInterval(moveNext, autoScrollInterval);
      });
  
      prevBtn.addEventListener('click', () => {
        clearInterval(autoScroll);
        movePrev();
        autoScroll = setInterval(moveNext, autoScrollInterval);
      });
    }
  }
  
  // Previous/Next Navigation (for day pages)
  function initDayNavigation() {
    const prevLink = document.getElementById('prev-link');
    const nextLink = document.getElementById('next-link');
    if (prevLink && nextLink) {
      // Get current page filename
      const currentPage = window.location.pathname.split('/').pop();
      const currentIndex = days.findIndex(day => day.file === currentPage);
  
      // Set Previous link
      if (currentIndex > 0) {
        prevLink.href = days[currentIndex - 1].file;
      } else {
        prevLink.classList.add('disabled');
      }
  
      // Set Next link
      if (currentIndex < days.length - 1) {
        nextLink.href = days[currentIndex + 1].file;
      } else {
        nextLink.classList.add('disabled');
      }
    }
  }
  
  // Run when page loads
  document.addEventListener('DOMContentLoaded', () => {
    generateTOC();
    initCarousel();
    initDayNavigation();
  });