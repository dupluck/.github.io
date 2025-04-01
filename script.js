document.addEventListener('DOMContentLoaded', function() {
    // Initialize all pixel art elements
    initPixelScene();
    initPixelPortrait();
    initProjectArt();
    initPixelMailbox();
    initPixelFooter();
    initPixelCharacter();
    
    // Add scroll animation detection
    window.addEventListener('scroll', handleScroll);
    
    // Add interactive button functionality
    document.getElementById('interactButton').addEventListener('click', sayHello);
    
    // Initialize nav link highlighting
    highlightNavOnScroll();
});

// Track scroll position
let lastScrollPosition = 0;
let ticking = false;

function handleScroll() {
    lastScrollPosition = window.scrollY;
    
    if (!ticking) {
        window.requestAnimationFrame(() => {
            // Update pixel art based on scroll position
            updatePixelScene(lastScrollPosition);
            animateCharacterOnScroll(lastScrollPosition);
            ticking = false;
        });
        
        ticking = true;
    }
}

// Pixel Scene in Hero Section
function initPixelScene() {
    const scene = document.getElementById('pixelScene');
    
    // Create a grid of mountains and sky
    const colors = ['#74b9ff', '#0984e3', '#a29bfe', '#6c5ce7', '#dfe6e9', '#b2bec3'];
    
    // Create sky
    for (let i = 0; i < 50; i++) {
        const cloud = document.createElement('div');
        cloud.className = 'pixel-cloud';
        const size = Math.floor(Math.random() * 5) + 3; // Random size between 3-7
        const x = Math.floor(Math.random() * 100); // Random x position
        const y = Math.floor(Math.random() * 30); // Random y position in upper part
        
        // Create cloud shape with multiple pixels
        for (let j = 0; j < size; j++) {
            const pixel = document.createElement('div');
            pixel.className = 'pixel';
            pixel.style.backgroundColor = '#fff';
            pixel.style.opacity = '0.8';
            pixel.style.left = `${j * 4}px`;
            pixel.style.top = '0';
            cloud.appendChild(pixel);
            
            // Add second row for fluffy effect
            if (j > 0 && j < size - 1) {
                const fluff = document.createElement('div');
                fluff.className = 'pixel';
                fluff.style.backgroundColor = '#fff';
                fluff.style.opacity = '0.8';
                fluff.style.left = `${j * 4}px`;
                fluff.style.top = '4px';
                cloud.appendChild(fluff);
            }
        }
        
        cloud.style.position = 'absolute';
        cloud.style.left = `${x}%`;
        cloud.style.top = `${y}%`;
        cloud.style.animation = `float ${5 + Math.random() * 5}s infinite ease-in-out`;
        cloud.style.animationDelay = `${Math.random() * 5}s`;
        scene.appendChild(cloud);
    }
    
    // Create mountains
    const mountainHeight = 30; // Height of mountains in pixels
    const width = Math.floor(scene.offsetWidth / 4) + 10; // Width based on container
    
    for (let x = 0; x < width; x++) {
        // Create mountain ranges with a sine wave pattern
        const y1 = Math.floor(Math.abs(Math.sin(x * 0.2) * mountainHeight) + 5);
        const y2 = Math.floor(Math.abs(Math.sin((x * 0.1) + 2) * mountainHeight) + 10);
        const y3 = Math.floor(Math.abs(Math.sin((x * 0.05) + 4) * mountainHeight) + 15);
        
        // Front mountains
        createMountainPixel(scene, x, y1, colors[3], 70);
        
        // Middle mountains
        createMountainPixel(scene, x, y2, colors[2], 80);
        
        // Background mountains
        createMountainPixel(scene, x, y3, colors[4], 90);
    }
    
    // Create stars
    for (let i = 0; i < 30; i++) {
        const star = document.createElement('div');
        star.className = 'pixel';
        star.style.backgroundColor = '#fff';
        star.style.opacity = '0.8';
        star.style.left = `${Math.random() * 100}%`;
        star.style.top = `${Math.random() * 50}%`;
        star.style.width = '2px';
        star.style.height = '2px';
        star.style.animation = 'fadeIn 3s infinite alternate';
        star.style.animationDelay = `${Math.random() * 3}s`;
        scene.appendChild(star);
    }
}

function createMountainPixel(container, x, height, color, bottom) {
    for (let y = 0; y < height; y++) {
        const pixel = document.createElement('div');
        pixel.className = 'pixel';
        pixel.style.backgroundColor = color;
        pixel.style.left = `${x * 4}px`;
        pixel.style.bottom = `${bottom - y}px`;
        pixel.style.opacity = 1 - (y / height * 0.5); // Gradient effect
        container.appendChild(pixel);
    }
}

function updatePixelScene(scrollPosition) {
    const scene = document.getElementById('pixelScene');
    
    // Parallax scrolling effect
    const clouds = scene.querySelectorAll('.pixel-cloud');
    clouds.forEach(cloud => {
        const speed = 0.2;
        cloud.style.transform = `translateX(${scrollPosition * speed}px)`;
    });
}

// Pixel Portrait in About Section
function initPixelPortrait() {
    const portrait = document.getElementById('pixelPortrait');
    
    // Define a simple pixel art portrait
    const portraitData = [
        '000000000000000000',
        '000111111111110000',
        '001222222222221000',
        '012222222222221100',
        '012333333333321100',
        '012344444444321100',
        '012345555553321100',
        '012345666553321100',
        '012345677553321100',
        '012345677553321100',
        '012345666553321100',
        '012345555553321100',
        '012344444444321100',
        '012333333333321100',
        '012222222222221100',
        '001222222222221000',
        '000111111111110000',
        '000000000000000000'
    ];
    
    const colors = [
        'transparent',  // 0
        '#2d3436',      // 1 - outline
        '#636e72',      // 2 - shadow
        '#fdcb6e',      // 3 - skin
        '#e17055',      // 4 - lips
        '#0984e3',      // 5 - eyes
        '#6c5ce7',      // 6 - hair
        '#2d3436'       // 7 - eyebrows
    ];
    
    // Draw portrait
    const pixelSize = 4;
    for (let y = 0; y < portraitData.length; y++) {
        for (let x = 0; x < portraitData[y].length; x++) {
            const colorIndex = parseInt(portraitData[y][x]);
            if (colorIndex > 0) {
                const pixel = document.createElement('div');
                pixel.className = 'pixel';
                pixel.style.left = `${x * pixelSize}px`;
                pixel.style.top = `${y * pixelSize}px`;
                pixel.style.backgroundColor = colors[colorIndex];
                portrait.appendChild(pixel);
            }
        }
    }
}

// Project Pixel Art
function initProjectArt() {
    createProjectPixelArt('project1Art', '#e84393', '#fd79a8');
    createProjectPixelArt('project2Art', '#00b894', '#55efc4');
    createProjectPixelArt('project3Art', '#fdcb6e', '#ffeaa7');
}

function createProjectPixelArt(elementId, primaryColor, secondaryColor) {
    const container = document.getElementById(elementId);
    
    // Create random geometric pixel art for projects
    const size = 20; // Grid size
    
    for (let y = 0; y < size; y++) {
        for (let x = 0; x < size; x++) {
            // Create different patterns based on elementId
            let shouldDraw = false;
            let color;
            
            if (elementId === 'project1Art') {
                // Pattern for project 1: diagonal lines
                shouldDraw = (x + y) % 4 === 0;
                color = (x % 8 === 0 || y % 8 === 0) ? primaryColor : secondaryColor;
            } else if (elementId === 'project2Art') {
                // Pattern for project 2: circles
                const distance = Math.sqrt(Math.pow(x - size/2, 2) + Math.pow(y - size/2, 2));
                shouldDraw = distance < size/2 && distance % 3 < 1;
                color = distance < size/4 ? primaryColor : secondaryColor;
            } else {
                // Pattern for project 3: checkerboard
                shouldDraw = (x + y) % 2 === 0;
                color = ((x + y) % 4 === 0) ? primaryColor : secondaryColor;
            }
            
            if (shouldDraw) {
                const pixel = document.createElement('div');
                pixel.className = 'pixel';
                pixel.style.left = `${(x * container.offsetWidth/size)}px`;
                pixel.style.top = `${(y * container.offsetHeight/size)}px`;
                pixel.style.width = `${container.offsetWidth/size}px`;
                pixel.style.height = `${container.offsetHeight/size}px`;
                pixel.style.backgroundColor = color;
                container.appendChild(pixel);
            }
        }
    }
    
    // Add hover effect
    container.addEventListener('mouseover', function() {
        const pixels = this.querySelectorAll('.pixel');
        pixels.forEach((pixel, i) => {
            pixel.style.transition = 'transform 0.3s ease';
            pixel.style.transitionDelay = `${i % 10 * 0.02}s`;
            pixel.style.transform = 'scale(0.8)';
        });
    });
    
    container.addEventListener('mouseout', function() {
        const pixels = this.querySelectorAll('.pixel');
        pixels.forEach((pixel, i) => {
            pixel.style.transform = 'scale(1)';
        });
    });
}

// Pixel Mailbox in Contact Section
function initPixelMailbox() {
    const mailbox = document.getElementById('pixelMailbox');
    
    // Define a simple pixel art mailbox
    const mailboxData = [
        '00000000000000',
        '00011111111100',
        '00123333332100',
        '01234444443210',
        '01234444443210',
        '01233333333210',
        '01233333333210',
        '01233333333210',
        '01233333333210',
        '01233333333210',
        '01233533333210',
        '00122222222100',
        '00111111111100',
        '00111111111100',
        '00000000000000'
    ];
    
    const colors = [
        'transparent', // 0
        '#2d3436',     // 1 - outline
        '#636e72',     // 2 - shadow
        '#74b9ff',     // 3 - mailbox
        '#0984e3',     // 4 - mail slot
        '#e84393'      // 5 - flag
    ];
    
    // Draw mailbox
    const pixelSize = 4;
    for (let y = 0; y < mailboxData.length; y++) {
        for (let x = 0; x < mailboxData[y].length; x++) {
            const colorIndex = parseInt(mailboxData[y][x]);
            if (colorIndex > 0) {
                const pixel = document.createElement('div');
                pixel.className = 'pixel';
                pixel.style.left = `${x * pixelSize}px`;
                pixel.style.top = `${y * pixelSize}px`;
                pixel.style.backgroundColor = colors[colorIndex];
                mailbox.appendChild(pixel);
            }
        }
    }
    
    // Animate the mailbox flag on click
    mailbox.addEventListener('click', function() {
        const flag = mailbox.querySelector('.pixel:nth-child(42)'); // Targeting the flag pixel
        if (flag) {
            flag.style.transition = 'transform 0.5s ease';
            flag.style.transform = flag.style.transform === 'rotate(45deg)' ? 'rotate(0deg)' : 'rotate(45deg)';
        }
    });
}

// Pixel Footer
function initPixelFooter() {
    const footer = document.getElementById('pixelFooter');
    
    // Create a simple wave pattern
    const width = Math.floor(footer.offsetWidth / 4);
    const colors = ['#3498db', '#2980b9', '#0984e3', '#74b9ff'];
    
    for (let x = 0; x < width; x++) {
        // Create a sine wave pattern
        const height = Math.floor(Math.sin(x * 0.2) * 3) + 5;
        
        for (let y = 0; y < height; y++) {
            const pixel = document.createElement('div');
            pixel.className = 'pixel';
            pixel.style.left = `${x * 4}px`;
            pixel.style.bottom = `${y * 4}px`;
            pixel.style.backgroundColor = colors[y % colors.length];
            footer.appendChild(pixel);
        }
    }
}

// Pixel Character (follows cursor)
function initPixelCharacter() {
    const character = document.getElementById('pixelCharacter');
    
    // Define a simple pixel art character
    const characterData = [
        '00000000',
        '00111100',
        '01222210',
        '12333321',
        '12322321',
        '12233321',
        '01233210',
        '00122100',
        '00122100',
        '00122100',
        '00111100',
        '00122100',
        '01233210',
        '12333321',
        '12222221',
        '01111110'
    ];
    
    const colors = [
        'transparent', // 0
        '#2d3436',     // 1 - outline
        '#636e72',     // 2 - shadow
        '#fdcb6e'      // 3 - character
    ];
    
    // Draw character
    const pixelSize = 4;
    for (let y = 0; y < characterData.length; y++) {
        for (let x = 0; x < characterData[y].length; x++) {
            const colorIndex = parseInt(characterData[y][x]);
            if (colorIndex > 0) {
                const pixel = document.createElement('div');
                pixel.className = 'pixel';
                pixel.style.left = `${x * pixelSize}px`;
                pixel.style.top = `${y * pixelSize}px`;
                pixel.style.backgroundColor = colors[colorIndex];
                character.appendChild(pixel);
            }
        }
    }
    
    // Make character follow mouse
    document.addEventListener('mousemove', (e) => {
        const maxX = window.innerWidth - character.offsetWidth;
        const maxY = window.innerHeight - character.offsetHeight;
        
        // Add some delay for smooth following
        setTimeout(() => {
            character.style.left = Math.min(maxX, Math.max(0, e.clientX - character.offsetWidth / 2)) + 'px';
            character.style.top = Math.min(maxY, Math.max(0, e.clientY - character.offsetHeight / 2)) + 'px';
        }, 100);
    });
    
    // Add click interaction
    character.addEventListener('click', function() {
        this.style.animation = 'float 0.5s ease';
        setTimeout(() => {
            this.style.animation = '';
        }, 500);
    });
}

// Character animation on scroll
function animateCharacterOnScroll(scrollPosition) {
    const character = document.getElementById('pixelCharacter');
    
    // When scrolling down, character "walks" with the scroll
    if (scrollPosition > 100) {
        character.style.animation = 'walk 0.5s infinite alternate';
    } else {
        character.style.animation = '';
    }
}

// Say hello interaction
function sayHello() {
    const button = document.getElementById('interactButton');
    const character = document.getElementById('pixelCharacter');
    
    // Create a speech bubble
    const bubble = document.createElement('div');
    bubble.className = 'speech-bubble';
    bubble.textContent = 'Hello! Thanks for visiting!';
    bubble.style.position = 'absolute';
    bubble.style.left = character.style.left;
    bubble.style.top = (parseInt(character.style.top) - 40) + 'px';
    bubble.style.backgroundColor = 'white';
    bubble.style.padding = '10px';
    bubble.style.borderRadius = '10px';
    bubble.style.boxShadow = '0 2px 5px rgba(0,0,0,0.2)';
    bubble.style.zIndex = '1001';
    bubble.style.animation = 'fadeIn 0.5s ease-out';
    
    document.body.appendChild(bubble);
    
    // Remove the bubble after 3 seconds
    setTimeout(() => {
        bubble.style.animation = 'fadeIn 0.5s ease-out reverse';
        setTimeout(() => {
            document.body.removeChild(bubble);
        }, 500);
    }, 3000);
    
    // Animate the button
    button.classList.add('clicked');
    setTimeout(() => {
        button.classList.remove('clicked');
    }, 500);
}

// Highlight nav items based on scroll position
function highlightNavOnScroll() {
    const sections = document.querySelectorAll('section');
    const navLinks = document.querySelectorAll('.nav-link');
    
    window.addEventListener('scroll', () => {
        let current = '';
        
        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.clientHeight;
            
            if (window.scrollY >= sectionTop - 200) {
                current = section.getAttribute('id');
            }
        });
        
        navLinks.forEach(link => {
            link.classList.remove('active');
            if (link.getAttribute('href').slice(1) === current) {
                link.classList.add('active');
            }
        });
    });
}
