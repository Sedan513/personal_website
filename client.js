// Declare canvas and ctx globally
let canvas;
let ctx;
// Quantum Circuit Classes
// Declare EmailJS config globally (make sure this exists, or replace manually)
// Quantum Circuit Classes
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
        ctx.beginPath();
        ctx.rect(-this.size / 2, -this.size / 2, this.size, this.size);
        ctx.strokeStyle = 'rgba(100, 150, 255, 0.6)';
        ctx.lineWidth = 2;
        ctx.stroke();
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
        ctx.fillStyle = 'white';
        ctx.font = '14px Arial';
        ctx.textAlign = 'center';
        ctx.textBaseline = 'middle';
        ctx.fillText(this.value.toString(), this.x + this.width / 2, this.y + this.height / 2);
    }

    update() {
        this.timer++;
        if (this.timer > 60) {
            this.value = Math.random() > 0.5 ? 1 : 0;
            this.timer = 0;
        }
    }
}

class Wave {
    constructor(x, y, amplitude, frequency, phase) {
        this.x = x;
        this.y = y;
        this.amplitude = amplitude;
        this.frequency = frequency;
        this.phase = phase;
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

class Particle {
    constructor() {
        this.reset();
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

let particles, quantumGates, binarySignals, waves;

function initializeAnimations() {
    // Create animation elements
    particles = Array.from({ length: 40 }, () => new Particle());
    quantumGates = Array.from({ length: 5 }, () => new QuantumGate(Math.random() * canvas.width, Math.random() * canvas.height));
    binarySignals = Array.from({ length: 3 }, () => new BinarySignal(Math.random() * (canvas.width - 30), Math.random() * (canvas.height - 20)));
    waves = [
        new Wave(0, canvas.height / 2, 30, 0.02, 0),
        new Wave(0, canvas.height / 2, 20, 0.03, Math.PI / 2)
    ];
}

function animate() {
    ctx.fillStyle = 'rgba(255, 255, 255, 0.03)';
    ctx.fillRect(0, 0, canvas.width, canvas.height);

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

document.addEventListener('DOMContentLoaded', function () {
    // Setup canvas
    canvas = document.getElementById('quantumCanvas');
    if (!canvas) {
        console.error('Canvas element not found!');
        return;
    }
    ctx = canvas.getContext('2d');
    if (!ctx) {
        console.error('Could not get canvas context!');
        return;
    }

    function resizeCanvas() {
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;
        initializeAnimations(); // Reinitialize animations on resize
    }

    window.addEventListener('resize', resizeCanvas);
    resizeCanvas();

    // Start animation
    animate();
});

// Smooth scrolling
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

// Contact Form Submission
document.addEventListener('DOMContentLoaded', function () {
    let emailJsConfig;

    // Fetch the configuration from the server
    fetch('/api/config')
        .then(response => response.json())
        .then(config => {
            emailJsConfig = config;
            // Initialize EmailJS with the public key from the server
            emailjs.init(emailJsConfig.publicKey);
        })
        .catch(error => {
            console.error('Failed to fetch EmailJS config:', error);
            alert('Could not load contact form configuration. Please try again later.');
        });

    const contactForm = document.getElementById('contact-form');
    if (contactForm) {
        contactForm.addEventListener('submit', function (e) {
            e.preventDefault();

            if (!emailJsConfig) {
                alert('Contact form is not ready. Please wait a moment and try again.');
                return;
            }

            const templateParams = {
                from_name: document.getElementById('from_name').value,
                from_email: document.getElementById('from_email').value,
                message: document.getElementById('message').value,
            };

            emailjs.send(emailJsConfig.serviceId, emailJsConfig.templateId, templateParams)
                .then(function(response) {
                   console.log('SUCCESS!', response.status, response.text);
                   alert('Message sent successfully!');
                   contactForm.reset(); // Clear the form
                }, function(error) {
                   console.log('FAILED...', error);
                   alert('Failed to send message. Please try again.');
                });
        });
    }
});
