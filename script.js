var mykey = config.MY_KEY;
var secretkey = config.SECRET_KEY;
var templateid = config.TEMPLATE_ID;

document.addEventListener('DOMContentLoaded', function () {
    // Quantum Canvas Animation
    const canvas = document.getElementById('quantumCanvas');
    if (!canvas) return;

    const ctx = canvas.getContext('2d');

    function resizeCanvas() {
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;
    }

    window.addEventListener('resize', resizeCanvas);
    resizeCanvas();

    // Quantum Circuit Class
    class QuantumGate {
        constructor(x, y) {
            this.x = x;
            this.y = y;
            this.size = 20;
            this.rotation = 0;
            this.type = Math.random() > 0.5 ? 'H' : 'X'; // Hadamard or Pauli-X gate
        }

        draw() {
            ctx.save();
            ctx.translate(this.x, this.y);
            ctx.rotate(this.rotation);
            
            // Draw gate
            ctx.beginPath();
            ctx.rect(-this.size/2, -this.size/2, this.size, this.size);
            ctx.strokeStyle = 'rgba(100, 150, 255, 0.6)';
            ctx.lineWidth = 2;
            ctx.stroke();
            
            // Draw gate symbol
            ctx.fillStyle = 'rgba(100, 150, 255, 0.8)';
            ctx.font = '14px Arial';
            ctx.textAlign = 'center';
            ctx.textBaseline = 'middle';
            ctx.fillText(this.type, 0, 0);
            
            ctx.restore();
        }

        update() {
            this.rotation += 0.02;
        }
    }

    // Binary Signal Class
    class BinarySignal {
        constructor(x, y) {
            this.x = x;
            this.y = y;
            this.value = 0;
            this.width = 30;
            this.height = 20;
            this.timer = 0;
        }

        draw() {
            ctx.fillStyle = this.value ? 'rgba(100, 255, 100, 0.6)' : 'rgba(255, 100, 100, 0.6)';
            ctx.fillRect(this.x, this.y, this.width, this.height);
            
            // Draw binary value
            ctx.fillStyle = 'white';
            ctx.font = '14px Arial';
            ctx.textAlign = 'center';
            ctx.textBaseline = 'middle';
            ctx.fillText(this.value.toString(), this.x + this.width/2, this.y + this.height/2);
        }

        update() {
            this.timer++;
            if (this.timer > 60) {
                this.value = Math.random() > 0.5 ? 1 : 0;
                this.timer = 0;
            }
        }
    }

    // Wave Interference Class
    class Wave {
        constructor(x, y, amplitude, frequency, phase) {
            this.x = x;
            this.y = y;
            this.amplitude = amplitude;
            this.frequency = frequency;
            this.phase = phase;
            this.points = [];
        }

        draw() {
            ctx.beginPath();
            ctx.moveTo(0, this.y);
            
            for (let x = 0; x < canvas.width; x += 2) {
                const y = this.y + Math.sin(x * this.frequency + this.phase) * this.amplitude;
                ctx.lineTo(x, y);
            }
            
            ctx.strokeStyle = 'rgba(255, 150, 100, 0.3)';
            ctx.lineWidth = 2;
            ctx.stroke();
        }

        update() {
            this.phase += 0.02;
        }
    }

    // Modified Particle class for quantum effects
    class Particle {
        constructor() {
            this.reset();
            this.y = Math.random() * canvas.height;
            this.quantumState = Math.random() * Math.PI * 2;
        }

        reset() {
            this.x = Math.random() * canvas.width;
            this.y = -20;
            this.size = Math.random() * 1 + 0.5;
            this.speed = Math.random() * 0.8 + 0.3;
            this.opacity = Math.random() * 0.1 + 0.02;
            this.color = `rgba(100, 150, 255, ${this.opacity})`;
        }

        update() {
            this.y += this.speed;
            this.quantumState += 0.05;
            this.x += Math.sin(this.quantumState) * 0.5;
            if (this.y > canvas.height + 20) this.reset();
        }

        draw() {
            ctx.beginPath();
            ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
            ctx.fillStyle = this.color;
            ctx.fill();
        }
    }

    // Create instances
    const particles = Array.from({ length: 40 }, () => new Particle());
    const quantumGates = Array.from({ length: 5 }, () => 
        new QuantumGate(Math.random() * canvas.width, Math.random() * canvas.height));
    const binarySignals = Array.from({ length: 3 }, () => 
        new BinarySignal(Math.random() * (canvas.width - 30), Math.random() * (canvas.height - 20)));
    const waves = [
        new Wave(0, canvas.height/2, 30, 0.02, 0),
        new Wave(0, canvas.height/2, 20, 0.03, Math.PI/2)
    ];

    function animate() {
        ctx.fillStyle = 'rgba(255, 255, 255, 0.03)';
        ctx.fillRect(0, 0, canvas.width, canvas.height);

        // Draw and update all animations
        particles.forEach(p => {
            p.update();
            p.draw();
        });

        quantumGates.forEach(gate => {
            gate.update();
            gate.draw();
        });

        binarySignals.forEach(signal => {
            signal.update();
            signal.draw();
        });

        waves.forEach(wave => {
            wave.update();
            wave.draw();
        });

        requestAnimationFrame(animate);
    }

    animate();

    // Smooth scroll
    document.querySelectorAll('nav a').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const targetId = this.getAttribute('href');
            const targetElement = document.querySelector(targetId);
            if (targetElement) {
                window.scrollTo({
                    top: targetElement.offsetTop - 80,
                    behavior: 'smooth'
                });
            }
        });
    });

    // Card hover effects (already partly handled in CSS)
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

    // EmailJS form handler
    const form = document.querySelector('.contact-form');
    form.addEventListener('submit', function (e) {
        e.preventDefault();

        const submitBtn = this.querySelector('button[type="submit"]');
        submitBtn.disabled = true;
        submitBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Sending...';

        const name = this.querySelector('input[placeholder="Your Name"]').value;
        const email = this.querySelector('input[placeholder="Your Email"]').value;
        const message = this.querySelector('textarea[placeholder="Your Message"]').value;
        emailjs.init(config.MY_KEY);
        emailjs.send(config.SERVICE_ID, config.TEMPLATE_ID, {
            name,
            email,
            message
        });
            name,
            email,
            message
        }).then(() => {
            alert('Message sent!');
            this.reset();
        }).catch((error) => {
            alert('Error: ' + error.text);
        }).finally(() => {
            submitBtn.disabled = false;
            submitBtn.innerHTML = 'Send Message';
        });
    });
