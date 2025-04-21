document.addEventListener('DOMContentLoaded', function() {
    // Quantum background animation
    const canvas = document.getElementById('quantumCanvas');
    if (!canvas) return; // Exit if canvas not found
    
    const ctx = canvas.getContext('2d');
    
    // Position canvas behind content
    canvas.style.position = 'fixed';
    canvas.style.top = '0';
    canvas.style.left = '0';
    canvas.style.zIndex = '-1';
    canvas.style.pointerEvents = 'none';
    
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
            this.size = Math.random() * 2 + 1;
            this.speed = Math.random() * 1 + 0.5;
            this.opacity = Math.random() * 0.2 + 0.05;
            this.color = `rgba(58, 134, 255, ${this.opacity})`;
            this.connections = [];
        }
        
        update() {
            this.y += this.speed;
            if (this.y > canvas.height + 20) this.reset();
            
            // Randomly reset connections
            if (Math.random() < 0.1) this.connections = [];
        }
        
        draw() {
            ctx.beginPath();
            ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
            ctx.fillStyle = this.color;
            ctx.fill();
        }
        
        drawConnections(particles) {
            // Draw lines to nearby particles
            particles.forEach(p => {
                if (p !== this && Math.random() < 0.005) {
                    const distance = Math.sqrt(
                        Math.pow(this.x - p.x, 2) + 
                        Math.pow(this.y - p.y, 2)
                    );
                    
                    if (distance < 150) {
                        ctx.beginPath();
                        ctx.moveTo(this.x, this.y);
                        ctx.lineTo(p.x, p.y);
                        ctx.strokeStyle = `rgba(131, 56, 236, ${this.opacity * 0.3})`;
                        ctx.lineWidth = 0.3;
                        ctx.stroke();
                        this.connections.push(p);
                    }
                }
            });
        }
    }

    const particles = [];
    for (let i = 0; i < 100; i++) {
        particles.push(new Particle());
    }

    function animate() {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        
        // Draw faint grid
        ctx.strokeStyle = 'rgba(100, 100, 255, 0.03)';
        ctx.lineWidth = 1;
        
        for (let x = 0; x < canvas.width; x += 60) {
            ctx.beginPath();
            ctx.moveTo(x, 0);
            ctx.lineTo(x, canvas.height);
            ctx.stroke();
        }
        
        for (let y = 0; y < canvas.height; y += 60) {
            ctx.beginPath();
            ctx.moveTo(0, y);
            ctx.lineTo(canvas.width, y);
            ctx.stroke();
        }
        
        particles.forEach(p => {
            p.update();
            p.draw();
            p.drawConnections(particles);
        });
        
        requestAnimationFrame(animate);
    }

    animate();

    // Add smooth scroll for navigation
    document.querySelectorAll('nav a').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            const targetId = this.getAttribute('href');
            const targetElement = document.querySelector(targetId);
            
            if (targetElement) {
                window.scrollTo({
                    top: targetElement.offsetTop - 20,
                    behavior: 'smooth'
                });
            }
        });
    });

    // Add card hover effects
    document.querySelectorAll('.card').forEach(card => {
        card.addEventListener('mouseenter', () => {
            card.style.transform = 'translateY(-5px)';
            card.style.boxShadow = '0 10px 20px rgba(0,0,0,0.1)';
        });
        
        card.addEventListener('mouseleave', () => {
            card.style.transform = 'translateY(0)';
            card.style.boxShadow = '0 5px 15px rgba(0,0,0,0.05)';
        });
    });
});