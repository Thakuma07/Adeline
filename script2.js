// nagivation menu's script code
// page router to landing-page#review section (index.html)
// page roter to work-page (index3.html)


function navigateAndScroll(event, sectionId) {
    event.preventDefault();  // Prevent the default navigation

    setTimeout(() =>{
      window.location.href = sectionId}, 1000);
    }

function navigateAndOpen(event, page){

  setTimeout(() => {
    window.location.href = page}, 1000); 
  
}

document.addEventListener("DOMContentLoaded", function () {
    let previous = document.querySelector(".strikethrough.active"); // Start with "Click me 1"
  
    document.querySelectorAll(".strikethrough").forEach((el) => {
      el.addEventListener("click", function () {
        // Remove strikethrough from previous element
        if (previous && previous !== this) {
          previous.classList.remove("active");
          previous.classList.add("reverse");
        }
  
        // Apply strikethrough to clicked element
        this.classList.remove("reverse");
        this.classList.add("active");
  
        // Update previous reference
        previous = this;
      });
    });
  });
  

// JavaScript
document.getElementById('close-btn').addEventListener('click', function(e) {
    e.preventDefault();
    
    // Trigger animation
    this.classList.add('clicked');
    
    // Navigate back after animation completes
    setTimeout(() => {
        window.history.back();
    }, 300); // Match transition duration (0.3s)
});