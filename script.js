// Subtle quantum-inspired background animation
const canvas = document.getElementById('quantumCanvas');
const ctx = canvas.getContext('2d');

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
        
        // Occasionally draw connection lines
        if (Math.random() < 0.002) {
            const targetX = this.x + (Math.random() - 0.5) * 100;
            const targetY = this.y + (Math.random() - 0.5) * 100;
            
            ctx.beginPath();
            ctx.moveTo(this.x, this.y);
            ctx.lineTo(targetX, targetY);
            ctx.strokeStyle = `rgba(131, 56, 236, ${this.opacity * 0.5})`;
            ctx.lineWidth = 0.3;
            ctx.stroke();
        }
    }
}

const particles = [];
for (let i = 0; i < 80; i++) {
    particles.push(new Particle());
}

function animate() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    
    // Draw faint grid
    ctx.strokeStyle = 'rgba(0, 0, 0, 0.03)';
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
    });
    
    requestAnimationFrame(animate);
}

animate();