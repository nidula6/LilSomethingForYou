// ===== CUSTOMIZATION VARIABLES =====
const CUSTOMIZATION = {
    girlfriendName: 'Anjalee',
    songPath: 'music/song.mp3',  // Music folder path
    songTitle: 'Maname',
    songArtist: 'Sarah Black / Sathyan Ilanko',
    specialNote: "Just wanted to say that I really care about you and I really LOVE YOU !!!.",
    reasonsILoveYou: [
        "You light up my world in ways words can't describe",
        "Your kindness inspires me every single day",
        "The way you laugh makes everything feel right",
        "You're my greatest adventure and my safe haven",
        "Your belief in me makes me stronger",
        "Because loving you feels like home"
    ]
};

// ===== UTILITY FUNCTIONS =====

function formatTime(seconds) {
    if (!seconds || isNaN(seconds)) return '0:00';
    const minutes = Math.floor(seconds / 60);
    const secs = Math.floor(seconds % 60);
    return `${minutes}:${secs.toString().padStart(2, '0')}`;
}

// ===== CREATE STARFIELD ===== 

function createStarfield() {
    const starfield = document.getElementById('starfield');
    const starCount = Math.floor(window.innerWidth / 30);
    
    for (let i = 0; i < starCount; i++) {
        const star = document.createElement('div');
        star.className = 'star';
        star.style.left = Math.random() * 100 + '%';
        star.style.top = Math.random() * 100 + '%';
        star.style.animationDuration = (Math.random() * 3 + 2) + 's';
        star.style.animationDelay = Math.random() * 2 + 's';
        starfield.appendChild(star);
    }
}

// ===== CREATE FIREFLIES =====

function createFireflies() {
    const firefliesContainer = document.getElementById('fireflies');
    const fireflyCount = Math.floor(window.innerWidth / 50);
    
    for (let i = 0; i < fireflyCount; i++) {
        const firefly = document.createElement('div');
        firefly.className = 'firefly';
        firefly.style.left = Math.random() * 100 + '%';
        firefly.style.top = Math.random() * 100 + '%';
        firefly.style.animationDuration = (Math.random() * 6 + 8) + 's';
        firefly.style.animationDelay = Math.random() * 3 + 's';
        firefliesContainer.appendChild(firefly);
    }
}

// ===== CREATE FLOWER PETALS =====

function createFlowerPetals() {
    const petalsContainer = document.getElementById('flowerPetals');
    const petalCount = Math.floor(window.innerWidth / 80);
    const petals = ['🌼', '🌸', '💛'];
    
    for (let i = 0; i < petalCount; i++) {
        const petal = document.createElement('div');
        petal.className = 'petal';
        petal.textContent = petals[Math.floor(Math.random() * petals.length)];
        petal.style.left = Math.random() * 100 + '%';
        petal.style.animationDuration = (Math.random() * 8 + 10) + 's';
        petal.style.animationDelay = Math.random() * 5 + 's';
        petalsContainer.appendChild(petal);
    }
}

// ===== MUSIC PLAYER SETUP =====

let audioPlayer = null;
let isPlaying = false;

function initMusicPlayer() {
    audioPlayer = document.getElementById('audioPlayer');
    const playPauseBtn = document.getElementById('playPauseBtn');
    const progressBar = document.getElementById('progressBar');
    const progress = document.getElementById('progress');
    const currentTimeEl = document.getElementById('currentTime');
    const durationEl = document.getElementById('duration');
    const volumeSlider = document.getElementById('volumeSlider');
    const volumeBtn = document.getElementById('volumeBtn');
    const vinylRecord = document.getElementById('vinylRecord');
    
    // Set music source from music folder
    audioPlayer.src = CUSTOMIZATION.songPath;
    
    // Update song info
    document.getElementById('songNameDisplay').textContent = CUSTOMIZATION.songTitle;
    document.getElementById('songArtistDisplay').textContent = CUSTOMIZATION.songArtist;
    
    // Set special note before song
    document.getElementById('specialNoteText').textContent = CUSTOMIZATION.specialNote;
    
    // Play/Pause button
    playPauseBtn.addEventListener('click', () => {
        if (isPlaying) {
            audioPlayer.pause();
            isPlaying = false;
            playPauseBtn.innerHTML = '<i class="fas fa-play"></i>';
            vinylRecord.classList.remove('playing');
        } else {
            audioPlayer.play();
            isPlaying = true;
            playPauseBtn.innerHTML = '<i class="fas fa-pause"></i>';
            vinylRecord.classList.add('playing');
        }
    });
    
    // Update progress as music plays
    audioPlayer.addEventListener('timeupdate', () => {
        const percentage = (audioPlayer.currentTime / audioPlayer.duration) * 100;
        progress.style.width = percentage + '%';
        currentTimeEl.textContent = formatTime(audioPlayer.currentTime);
    });
    
    // Update duration
    audioPlayer.addEventListener('loadedmetadata', () => {
        durationEl.textContent = formatTime(audioPlayer.duration);
    });
    
    // Seek on progress bar click
    progressBar.addEventListener('click', (e) => {
        const clickX = e.clientX - progressBar.getBoundingClientRect().left;
        const percentage = clickX / progressBar.offsetWidth;
        audioPlayer.currentTime = percentage * audioPlayer.duration;
    });
    
    // Volume control
    volumeSlider.addEventListener('input', (e) => {
        audioPlayer.volume = e.target.value / 100;
        
        if (e.target.value == 0) {
            volumeBtn.innerHTML = '<i class="fas fa-volume-mute"></i>';
        } else if (e.target.value < 50) {
            volumeBtn.innerHTML = '<i class="fas fa-volume-down"></i>';
        } else {
            volumeBtn.innerHTML = '<i class="fas fa-volume-up"></i>';
        }
    });
    
    // Volume button mute
    volumeBtn.addEventListener('click', () => {
        if (audioPlayer.volume > 0) {
            audioPlayer.volume = 0;
            volumeSlider.value = 0;
            volumeBtn.innerHTML = '<i class="fas fa-volume-mute"></i>';
        } else {
            audioPlayer.volume = volumeSlider.value / 100;
            volumeBtn.innerHTML = '<i class="fas fa-volume-up"></i>';
        }
    });
    
    // Set initial volume
    audioPlayer.volume = volumeSlider.value / 100;
}

// ===== LETTER MODAL FUNCTIONALITY =====

function initLetterModal() {
    const letterEnvelope = document.getElementById('letterEnvelope');
    const letterModal = document.getElementById('letterModal');
    const closeLetterBtn = document.getElementById('closeLetterBtn');
    const modalLetterText = document.getElementById('modalLetterText');
    const letterDate = document.getElementById('letterDate');
    
    // Set letter date
    const today = new Date();
    const dateOptions = { year: 'numeric', month: 'long', day: 'numeric' };
    letterDate.textContent = today.toLocaleDateString('en-US', dateOptions);
    
    // Set letter text
    modalLetterText.textContent = CUSTOMIZATION.specialNote;
    
    // Open letter on envelope click
    letterEnvelope.addEventListener('click', () => {
        letterModal.classList.add('active');
        document.body.style.overflow = 'hidden';
    });
    
    // Close letter
    closeLetterBtn.addEventListener('click', () => {
        letterModal.classList.remove('active');
        document.body.style.overflow = 'auto';
    });
    
    // Close on background click
    letterModal.addEventListener('click', (e) => {
        if (e.target === letterModal) {
            letterModal.classList.remove('active');
            document.body.style.overflow = 'auto';
        }
    });
    
    // Close on Escape key
    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape' && letterModal.classList.contains('active')) {
            letterModal.classList.remove('active');
            document.body.style.overflow = 'auto';
        }
    });
}

// ===== GENERATE REASON CARDS =====
// (Removed - reason cards section no longer in HTML)

// ===== PARALLAX AND SCROLL EFFECTS =====

function initScrollAnimations() {
    const starfield = document.getElementById('starfield');
    const moon = document.querySelector('.moon');
    
    window.addEventListener('scroll', () => {
        const scrollY = window.scrollY;
        
        // Parallax effect for stars
        if (starfield) {
            starfield.style.transform = `translateY(${scrollY * 0.5}px)`;
        }
        
        // Parallax effect for moon
        if (moon) {
            moon.style.transform = `translateY(${scrollY * 0.3}px)`;
        }
    });
}

// ===== INTERSECTION OBSERVER FOR ANIMATIONS =====

function initIntersectionObserver() {
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.animation = 'fadeInUp 1s ease-out forwards';
            }
        });
    }, {
        threshold: 0.1
    });
    
    document.querySelectorAll('.closing-quote, .closing-note').forEach(el => {
        observer.observe(el);
    });
}

// ===== SMOOTH SCROLL =====

function initSmoothScroll() {
    const scrollHint = document.querySelector('.scroll-hint');
    
    if (scrollHint) {
        scrollHint.addEventListener('click', () => {
            const musicSection = document.getElementById('music');
            musicSection.scrollIntoView({ behavior: 'smooth' });
        });
    }
}

// ===== KEYBOARD SHORTCUTS =====

function initKeyboardShortcuts() {
    document.addEventListener('keydown', (e) => {
        if (document.activeElement.tagName === 'INPUT') return;
        
        if (e.code === 'Space') {
            e.preventDefault();
            document.getElementById('playPauseBtn').click();
        } else if (e.code === 'KeyM') {
            document.getElementById('volumeBtn').click();
        }
    });
}

// ===== MAIN INITIALIZATION =====

function init() {
    console.log('🎵 Initializing website for ' + CUSTOMIZATION.girlfriendName + ' ♥️');
    
    // Create background animations
    createStarfield();
    createFireflies();
    createFlowerPetals();
    
    // Initialize music player
    initMusicPlayer();
    
    // Initialize letter modal
    initLetterModal();
    
    // Initialize scroll and animations
    initScrollAnimations();
    initIntersectionObserver();
    initSmoothScroll();
    
    // Initialize keyboard shortcuts
    initKeyboardShortcuts();
    
    // Setup auto-play music
    setupAutoPlay();
    
    console.log('✨ Website loaded! Every time you hear this song, think of her.');
}

// Run when DOM is ready
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
} else {
    init();
}

// Handle window resize
let resizeTimeout;
window.addEventListener('resize', () => {
    clearTimeout(resizeTimeout);
    resizeTimeout = setTimeout(() => {
        // Recreate animations on resize for responsive behavior
    }, 250);
});

// ===== AUTO-PLAY SETUP =====

function setupAutoPlay() {
    const audioPlayer = document.getElementById('audioPlayer');
    const playPauseBtn = document.getElementById('playPauseBtn');
    const vinylRecord = document.getElementById('vinylRecord');
    
    // Try to auto-play immediately
    const playPromise = audioPlayer.play();
    if (playPromise !== undefined) {
        playPromise.then(() => {
            // Auto-play succeeded
            isPlaying = true;
            playPauseBtn.innerHTML = '<i class="fas fa-pause"></i>';
            vinylRecord.classList.add('playing');
            console.log('🎵 Music auto-playing...');
        }).catch(error => {
            // Auto-play blocked by browser - will play on first user interaction
            console.log('Auto-play blocked. Click anywhere to start music.');
            document.addEventListener('click', () => {
                if (!isPlaying) {
                    audioPlayer.play();
                    isPlaying = true;
                    playPauseBtn.innerHTML = '<i class="fas fa-pause"></i>';
                    vinylRecord.classList.add('playing');
                }
            }, { once: true });
        });
    }
}

// Initialize auto-play after a short delay to ensure everything is loaded
setTimeout(() => {
    setupAutoPlay();
}, 500);
