// Quantum circuit animation
const canvas = document.getElementById('quantumCanvas');
const ctx = canvas.getContext('2d');

function resizeCanvas() {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
}

window.addEventListener('resize', resizeCanvas);
resizeCanvas();

class Qubit {
    constructor() {
        this.x = Math.random() * canvas.width;
        this.y = Math.random() * canvas.height;
        this.size = Math.random() * 3 + 1;
        this.speedX = (Math.random() - 0.5) * 0.5;
        this.speedY = (Math.random() - 0.5) * 0.5;
        this.color = `rgba(15, 240, 252, ${Math.random() * 0.5 + 0.1})`;
        this.phase = Math.random() * Math.PI * 2;
    }
    
    update() {
        this.x += this.speedX;
        this.y += this.speedY;
        this.phase += 0.01;
        
        if (this.x < 0 || this.x > canvas.width) this.speedX *= -1;
        if (this.y < 0 || this.y > canvas.height) this.speedY *= -1;
    }
    
    draw() {
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.size * (1 + Math.sin(this.phase) * 0.3), 0, Math.PI * 2);
        ctx.fillStyle = this.color;
        ctx.fill();
        
        // Draw entanglement lines
        qubits.forEach(q => {
            if (q !== this && Math.random() < 0.002) {
                const dx = this.x - q.x;
                const dy = this.y - q.y;
                const dist = Math.sqrt(dx * dx + dy * dy);
                
                if (dist < 200) {
                    ctx.beginPath();
                    ctx.moveTo(this.x, this.y);
                    ctx.lineTo(q.x, q.y);
                    ctx.strokeStyle = `rgba(157, 78, 221, ${1 - dist/200})`;
                    ctx.lineWidth = 0.5;
                    ctx.stroke();
                }
            }
        });
    }
}

const qubits = [];
for (let i = 0; i < 100; i++) {
    qubits.push(new Qubit());
}

function animate() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    
    // Draw quantum gates background
    ctx.strokeStyle = 'rgba(157, 78, 221, 0.05)';
    ctx.lineWidth = 1;
    
    // Hadamard gates
    for (let x = 0; x < canvas.width; x += 120) {
        for (let y = 0; y < canvas.height; y += 120) {
            ctx.beginPath();
            ctx.moveTo(x - 10, y);
            ctx.lineTo(x + 10, y);
            ctx.moveTo(x, y - 10);
            ctx.lineTo(x, y + 10);
            ctx.stroke();
            
            ctx.beginPath();
            ctx.arc(x, y, 15, 0, Math.PI * 2);
            ctx.stroke();
        }
    }
    
    qubits.forEach(qubit => {
        qubit.update();
        qubit.draw();
    });
    
    requestAnimationFrame(animate);
}

animate();