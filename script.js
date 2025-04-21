document.addEventListener('DOMContentLoaded', function() {
    // Only proceed if canvas exists
    const canvas = document.getElementById('quantumCanvas');
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    
    // Make canvas full window size but behind content
    function resizeCanvas() {
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;
    }

    window.addEventListener('resize', resizeCanvas);
    resizeCanvas();

    class Particle {
        constructor() {
            this.reset();
            this.y = Math.random() * canvas.height;
        }
        
        reset() {
            this.x = Math.random() * canvas.width;
            this.y = -20;
            this.size = Math.random() * 1 + 0.5; // Smaller particles
            this.speed = Math.random() * 0.8 + 0.3; // Slower movement
            this.opacity = Math.random() * 0.1 + 0.02; // More transparent
            this.color = `rgba(100, 150, 255, ${this.opacity})`;
        }
        
        update() {
            this.y += this.speed;
            if (this.y > canvas.height + 20) this.reset();
        }
        
        draw() {
            ctx.beginPath();
            ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
            ctx.fillStyle = this.color;
            ctx.fill();
        }
    }

    // Fewer particles for subtle effect
    const particles = [];
    for (let i = 0; i < 40; i++) {
        particles.push(new Particle());
    }

    function animate() {
        // Clear with semi-transparent for trailing effect
        ctx.fillStyle = 'rgba(255, 255, 255, 0.03)';
        ctx.fillRect(0, 0, canvas.width, canvas.height);
        
        particles.forEach(p => {
            p.update();
            p.draw();
        });
        
        requestAnimationFrame(animate);
    }

    animate();

    // Rest of your animations (smooth scroll, card effects)...
    document.querySelectorAll('nav a').forEach(anchor => {
        anchor.addEventListener('click', smoothScroll);
    });

    function smoothScroll(e) {
        e.preventDefault();
        const targetId = this.getAttribute('href');
        const targetElement = document.querySelector(targetId);
        
        if (targetElement) {
            window.scrollTo({
                top: targetElement.offsetTop - 80,
                behavior: 'smooth'
            });
        }
    }

    // Card hover effects
    document.querySelectorAll('.card').forEach(card => {
        card.addEventListener('mouseenter', () => {
            card.style.transform = 'translateY(-5px)';
            card.style.boxShadow = '0 8px 25px rgba(0, 0, 0, 0.1)';
        });
        
        card.addEventListener('mouseleave', () => {
            card.style.transform = 'translateY(0)';
            card.style.boxShadow = '0 4px 12px rgba(0, 0, 0, 0.08)';
        });
    });
});