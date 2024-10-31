const canvas = document.getElementById('rippleCanvas');
const ctx = canvas.getContext('2d');

// Set canvas size to full screen
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

let ripples = []; // Array to store ripple objects
let rippleTimeout; // Timeout variable to handle ripple creation
let lastMousePosition = { x: 0, y: 0 }; // Last known mouse position
const rippleDelay = 200; // Delay in milliseconds before creating a ripple

// Function to handle ripple creation
function handleRippleCreation(x, y) {
  createRipple(x, y);
}

// Mouse move event to track cursor position
canvas.addEventListener('mousemove', (e) => {
  lastMousePosition.x = e.clientX; // Get the X position of the mouse
  lastMousePosition.y = e.clientY; // Get the Y position of the mouse

  // Clear any existing ripple timeout
  clearTimeout(rippleTimeout);
  
  // Set a timeout to create a ripple if the mouse stops moving
  rippleTimeout = setTimeout(() => {
    handleRippleCreation(lastMousePosition.x, lastMousePosition.y);
  }, rippleDelay);
});

// Touch event to create a ripple immediately on touch
canvas.addEventListener('touchstart', (e) => {
  const touch = e.touches[0];
  const x = touch.clientX; // Get the X position of the touch
  const y = touch.clientY; // Get the Y position of the touch
  handleRippleCreation(x, y);
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
