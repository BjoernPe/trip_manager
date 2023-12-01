        // Zeige oder verstecke den "Nach oben scrollen"-Button basierend auf der Scroll-Position
        document.addEventListener("scroll", function() {
            var scrollButton = document.querySelector(".scroll-to-top");
            if (window.scrollY > 100) {
                scrollButton.style.display = "block";
            } else {
                scrollButton.style.display = "none";
            }
        });

        // Füge das Scrollen nach oben hinzu, wenn der Button geklickt wird
        document.querySelector(".scroll-to-top").addEventListener("click", function() {
            window.scrollTo({ top: 0, behavior: 'smooth' });
        });