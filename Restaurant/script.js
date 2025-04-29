// Menu items data
const menuItems = [
  {
    id: 1,
    name: 'Hyderabadi Dum Biryani',
    description: 'Aromatic basmati rice layered with tender meat, herbs, and signature spices',
    price: 18.99,
    category: 'biryani',
    image_url: 'https://images.pexels.com/photos/7394819/pexels-photo-7394819.jpeg',
    special: true,
    rating: 5
  },
  {
    id: 2,
    name: 'Butter Chicken',
    description: 'Creamy tomato curry with tender chicken pieces and aromatic spices',
    price: 16.99,
    category: 'curry',
    image_url: 'https://images.pexels.com/photos/7394827/pexels-photo-7394827.jpeg',
    rating: 4.8
  },
  {
    id: 3,
    name: 'Paneer Tikka',
    description: 'Grilled cottage cheese marinated in spiced yogurt',
    price: 12.99,
    category: 'starters',
    image_url: 'https://images.pexels.com/photos/9609838/pexels-photo-9609838.jpeg',
    rating: 4.7
  },
  {
    id: 4,
    name: 'Gulab Jamun',
    description: 'Sweet milk dumplings soaked in rose-scented syrup',
    price: 6.99,
    category: 'desserts',
    image_url: 'https://images.pexels.com/photos/14467427/pexels-photo-14467427.jpeg',
    rating: 4.9
  }
];

// Background video rotation with fade effect
const videos = [
  'https://cdn.pixabay.com/video/2023/10/10/vid_20231010_135736_394.mp4',
  'https://cdn.pixabay.com/video/2024/1/17/vid_20240117_133131_491.mp4',
  'https://cdn.pixabay.com/video/2023/12/28/vid_20231228_133619_491.mp4'
];

let currentVideoIndex = 0;
const backgroundVideo = document.querySelector('.back-video source');
const videoElement = backgroundVideo.parentElement;

function fadeOut(element) {
  element.style.opacity = 1;
  let opacity = 1;
  const timer = setInterval(() => {
    if (opacity <= 0.1) {
      clearInterval(timer);
      element.style.opacity = 0;
    }
    opacity -= 0.1;
    element.style.opacity = opacity;
  }, 50);
}

function fadeIn(element) {
  element.style.opacity = 0;
  let opacity = 0;
  const timer = setInterval(() => {
    if (opacity >= 1) {
      clearInterval(timer);
    }
    opacity += 0.1;
    element.style.opacity = opacity;
  }, 50);
}

function rotateBackgroundVideo() {
  fadeOut(videoElement);
  setTimeout(() => {
    currentVideoIndex = (currentVideoIndex + 1) % videos.length;
    backgroundVideo.src = videos[currentVideoIndex];
    videoElement.load();
    fadeIn(videoElement);
  }, 500);
}

setInterval(rotateBackgroundVideo, 30000);

// Navbar scroll effect
window.addEventListener('scroll', () => {
  const nav = document.querySelector('nav');
  if (window.scrollY > 50) {
    nav.classList.add('scrolled');
  } else {
    nav.classList.remove('scrolled');
  }
});

// Handle orders with enhanced UI feedback
window.placeOrder = function(menuItemId) {
  const item = menuItems.find(item => item.id === menuItemId);
  if (item) {
    const notification = document.createElement('div');
    notification.className = 'order-notification';
    notification.innerHTML = `
      <div class="notification-content">
        <h4>Order Placed Successfully!</h4>
        <p>Thank you for ordering ${item.name}</p>
      </div>
    `;
    document.body.appendChild(notification);
    
    setTimeout(() => {
      notification.classList.add('show');
    }, 100);
    
    setTimeout(() => {
      notification.classList.remove('show');
      setTimeout(() => {
        notification.remove();
      }, 300);
    }, 3000);
  }
}

// Add smooth scrolling for navigation
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener('click', function (e) {
    e.preventDefault();
    const target = document.querySelector(this.getAttribute('href'));
    if (target) {
      target.scrollIntoView({
        behavior: 'smooth',
        block: 'start'
      });
    }
  });
});

// Real-time date and time display with animation
function updateDateTime() {
  const now = new Date();
  const options = { 
    weekday: 'long', 
    year: 'numeric', 
    month: 'long', 
    day: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
    second: '2-digit'
  };
  const timeElement = document.querySelector('.feature:nth-child(2) p');
  if (timeElement) {
    const newTime = now.toLocaleDateString('en-US', options);
    if (timeElement.textContent !== newTime) {
      timeElement.style.opacity = 0;
      setTimeout(() => {
        timeElement.textContent = newTime;
        timeElement.style.opacity = 1;
      }, 200);
    }
  }
}

updateDateTime();
setInterval(updateDateTime, 1000);

// Add loading animation
window.addEventListener('load', () => {
  document.body.classList.add('loaded');
});