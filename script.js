document.addEventListener('DOMContentLoaded', function() {
    // DOM Elements
    const pixelCanvas = document.getElementById('pixelCanvas');
    const colorPicker = document.getElementById('colorPicker');
    const clearBtn = document.getElementById('clearBtn');
    const saveBtn = document.getElementById('saveBtn');
    const downloadBtn = document.getElementById('downloadBtn');
    const canvasSizeSelect = document.getElementById('canvasSize');
    const artGallery = document.getElementById('artGallery');
    
    // Variables
    let isDrawing = false;
    let currentColor = '#000000';
    let currentSize = 32;
    
    // Initialize
    createCanvas(currentSize);
    loadSavedArt();
    
    // Event Listeners
    colorPicker.addEventListener('change', function() {
        currentColor = this.value;
    });
    
    clearBtn.addEventListener('click', clearCanvas);
    
    saveBtn.addEventListener('click', saveArt);
    
    downloadBtn.addEventListener('click', downloadArt);
    
    canvasSizeSelect.addEventListener('change', function() {
        currentSize = parseInt(this.value);
        createCanvas(currentSize);
    });
    
    document.addEventListener('mouseup', function() {
        isDrawing = false;
    });
    
    document.addEventListener('mouseleave', function() {
        isDrawing = false;
    });
    
    // Functions
    function createCanvas(size) {
        // Clear existing canvas
        pixelCanvas.innerHTML = '';
        
        // Set grid template
        pixelCanvas.style.gridTemplateColumns = `repeat(${size}, 1fr)`;
        
        // Calculate pixel size (responsive)
        const pixelSize = Math.min(Math.floor(500 / size), 20);
        
        // Create pixels
        for (let i = 0; i < size * size; i++) {
            const pixel = document.createElement('div');
            pixel.className = 'pixel';
            pixel.style.width = `${pixelSize}px`;
            pixel.style.height = `${pixelSize}px`;
            
            // Drawing functionality
            pixel.addEventListener('mousedown', function(e) {
                isDrawing = true;
                this.style.backgroundColor = currentColor;
                // Prevent dragging behavior
                e.preventDefault();
            });
            
            pixel.addEventListener('mouseover', function() {
                if (isDrawing) {
                    this.style.backgroundColor = currentColor;
                }
            });
            
            // Touch support
            pixel.addEventListener('touchstart', function(e) {
                isDrawing = true;
                this.style.backgroundColor = currentColor;
                e.preventDefault();
            });
            
            pixel.addEventListener('touchmove', function(e) {
                const touch = e.touches[0];
                const pixelUnderTouch = document.elementFromPoint(touch.clientX, touch.clientY);
                if (pixelUnderTouch && pixelUnderTouch.className === 'pixel') {
                    pixelUnderTouch.style.backgroundColor = currentColor;
                }
                e.preventDefault();
            });
            
            pixelCanvas.appendChild(pixel);
        }
    }
    
    function clearCanvas() {
        const pixels = document.querySelectorAll('.pixel');
        pixels.forEach(pixel => {
            pixel.style.backgroundColor = 'white';
        });
    }
    
    function saveArt() {
        html2canvas(pixelCanvas).then(canvas => {
            // Create container for saved art
            const savedArt = document.createElement('div');
            savedArt.className = 'saved-art';
            
            // Add delete button
            const deleteBtn = document.createElement('button');
            deleteBtn.className = 'delete-btn';
            deleteBtn.textContent = '×';
            deleteBtn.addEventListener('click', function() {
                // Remove from DOM
                artGallery.removeChild(savedArt);
                
                // Remove from localStorage
                const savedArts = JSON.parse(localStorage.getItem('pixelArts') || '[]');
                const index = savedArts.indexOf(canvas.toDataURL());
                if (index > -1) {
                    savedArts.splice(index, 1);
                    localStorage.setItem('pixelArts', JSON.stringify(savedArts));
                }
            });
            
            // Add the canvas and delete button to saved art container
            savedArt.appendChild(canvas);
            savedArt.appendChild(deleteBtn);
            
            // Add to gallery
            artGallery.appendChild(savedArt);
            
            // Save to localStorage
            const dataURL = canvas.toDataURL();
            const savedArts = JSON.parse(localStorage.getItem('pixelArts') || '[]');
            savedArts.push(dataURL);
            localStorage.setItem('pixelArts', JSON.stringify(savedArts));
        });
    }
    
    function downloadArt() {
        html2canvas(pixelCanvas).then(canvas => {
            const link = document.createElement('a');
            link.download = 'pixel-art.png';
            link.href = canvas.toDataURL();
            link.click();
        });
    }
    
    function loadSavedArt() {
        const savedArts = JSON.parse(localStorage.getItem('pixelArts') || '[]');
        
        savedArts.forEach(dataURL => {
            const img = new Image();
            img.src = dataURL;
            
            img.onload = function() {
                const canvas = document.createElement('canvas');
                const ctx = canvas.getContext('2d');
                canvas.width = img.width;
                canvas.height = img.height;
                ctx.drawImage(img, 0, 0);
                
                // Create container for saved art
                const savedArt = document.createElement('div');
                savedArt.className = 'saved-art';
                
                // Add delete button
                const deleteBtn = document.createElement('button');
                deleteBtn.className = 'delete-btn';
                deleteBtn.textContent = '×';
                deleteBtn.addEventListener('click', function() {
                    // Remove from DOM
                    artGallery.removeChild(savedArt);
                    
                    // Remove from localStorage
                    const savedArts = JSON.parse(localStorage.getItem('pixelArts') || '[]');
                    const index = savedArts.indexOf(dataURL);
                    if (index > -1) {
                        savedArts.splice(index, 1);
                        localStorage.setItem('pixelArts', JSON.stringify(savedArts));
                    }
                });
                
                // Add the canvas and delete button to saved art container
                savedArt.appendChild(canvas);
                savedArt.appendChild(deleteBtn);
                
                // Add to gallery
                artGallery.appendChild(savedArt);
            };
        });
    }
});
