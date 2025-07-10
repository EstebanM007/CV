        // Crear partículas flotantes
        function createFloatingParticles() {
            const particlesContainer = document.querySelector('.floating-particles');
            const particleCount = 15;
            
            for (let i = 0; i < particleCount; i++) {
                const particle = document.createElement('div');
                particle.className = 'particle';
                particle.style.left = Math.random() * 100 + '%';
                particle.style.animationDelay = Math.random() * 20 + 's';
                particle.style.animationDuration = (Math.random() * 10 + 15) + 's';
                particlesContainer.appendChild(particle);
            }
        }
        // Efectos de intersección para animaciones
        function setupIntersectionObserver() {
            const observer = new IntersectionObserver((entries) => {
                entries.forEach(entry => {
                    if (entry.isIntersecting) {
                        entry.target.style.animationPlayState = 'running';
                    }
                });
            }, {
                threshold: 0.1
            });

            // Observar elementos con animaciones
            const animatedElements = document.querySelectorAll('.section, .experience-item, .education-item');
            animatedElements.forEach(el => observer.observe(el));
        }

        // Inicializar cuando se cargue la página
        window.addEventListener('load', function() {
            createFloatingParticles();
            setupIntersectionObserver();
        });

        // Efecto de escritura en el nombre
        function typewriterEffect() {
            const nameElement = document.querySelector('.name');
            const originalText = nameElement.textContent;
            nameElement.textContent = '';
            
            let i = 0;
            const timer = setInterval(() => {
                if (i < originalText.length) {
                    nameElement.textContent += originalText.charAt(i);
                    i++;
                } else {
                    clearInterval(timer);
                }
            }, 50);
        }

        // Activar efecto de escritura después de que se cargue la página
        setTimeout(typewriterEffect, 1000);