const canvas = document.getElementById('rippleCanvas');
const ctx = canvas.getContext('2d');

// Set canvas size to full screen
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

let ripples = []; // Array to store ripple objects

canvas.addEventListener('touchstart', (e) => {
  const touch = e.touches[0];
  const x = touch.clientX;
  const y = touch.clientY;
  createRipple(x, y);
});

// Function to create a ripple effect
function createRipple(x, y) {
  const ripple = { x, y, radius: 0, opacity: 2 };
  ripples.push(ripple);
  
  setTimeout(() => {
    ripples = ripples.filter(r => r !== ripple); // Remove ripple after 3 seconds
  }, 3000);
}

// Function to animate ripples
function animateRipples() {
  ctx.fillStyle = "rgb(230,234,255)";
  ctx.clearRect(0, 0, canvas.width, canvas.height);

  ripples.forEach(ripple => {
    ripple.radius += 1; // Ripple growth speed
    ripple.opacity -= 0.0005; // Fade out over time

    ctx.beginPath();
    ctx.arc(ripple.x, ripple.y, ripple.radius, 0, 2 * Math.PI);
    ctx.strokeStyle = `rgba(74,78, 105, ${ripple.opacity})`; // Blue ripple with fading opacity
    ctx.lineWidth = 2;
    ctx.stroke();
  });

  requestAnimationFrame(animateRipples);
}

// Start the ripple animation
animateRipples();

// Adjust canvas size when window is resized
window.addEventListener('resize', () => {
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;
});
