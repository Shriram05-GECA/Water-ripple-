
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
  const ripple = { x, y, radius: 0, opacity: 1 };
  ripples.push(ripple);
}

// Function to animate ripples
function animateRipples() {
  // Set the background color
  ctx.fillStyle = "rgb(230, 234, 255)"; // Light purple background
  ctx.fillRect(0, 0, canvas.width, canvas.height);

  ripples = ripples.filter(ripple => ripple.opacity > 0); // Keep only visible ripples

  ripples.forEach(ripple => {
    ripple.radius += 2; // Ripple growth speed
    ripple.opacity -= 0.005; // Smooth fade-out over time

    ctx.beginPath();
    ctx.arc(ripple.x, ripple.y, ripple.radius, 0, 2 * Math.PI);
    ctx.strokeStyle = rgba(0, 0, 255, ${ripple.opacity}); // Blue ripple with fading opacity
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
