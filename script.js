// main landing page's javascript code


document.addEventListener("DOMContentLoaded", function () {
    // Function to handle page navigation with a delay
    function navigateToPage(url) {
        setTimeout(() => {
            window.location.href = url;
        }, 500); // Delay navigation by 500ms
    }

    // Attach event listener to menu button
    document.getElementById("menu-btn").addEventListener("click", function () {
        this.classList.toggle("active");
        navigateToPage("./menu"); // Change as needed
    });

    // Attach event listener to 'anda' section
    document.getElementById("anda").addEventListener("click", function () {
        navigateToPage("./work");
    });

    // Add smooth scroll effect
    const lenis = new Lenis({
        autoRaf: true,
    });
});

