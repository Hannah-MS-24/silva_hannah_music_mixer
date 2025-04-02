/* Variables */

const dropBoxes = document.querySelectorAll(".drop-box");
const images = document.querySelectorAll(".gallery img");
const resetButton = document.getElementById("resetButton");
const gallery = document.querySelector(".gallery");

const musicPaths = {
    "drop-box1": "img1",
    "drop-box2": "img2",
    "drop-box3": "img3",
    "drop-box4": "img4",
    "drop-box5": "img5",
    "drop-box6": "img6"
};

const audioPaths = {
    "drop-box1": "audio1",
    "drop-box2": "audio2",
    "drop-box3": "audio3",
    "drop-box4": "audio4",
    "drop-box5": "audio5",
    "drop-box6": "audio6"
};

let currentAudio = null; // Variable to control the audio being played

// Save initial positions of images
const initialPositions = Array.from(images).map(img => ({
    id: img.id,
    parent: img.parentElement // Save the parent (container) of each image
}));

// Function to allow dragging over boxes
function allowDrop(event) {
    event.preventDefault();
}

// Function that stores the image ID when starting the drag
function drag(event) {
    event.dataTransfer.setData("text", event.target.id);
}

// Function that executes when dropping the image inside a box
function drop(event) {
    event.preventDefault();
    let data = event.dataTransfer.getData("text");
    let draggedImage = document.getElementById(data);

    // Check if the image belongs to this specific drop-box
    let targetBox = event.target.closest(".drop-box"); // Ensure it's a valid drop-box
    if (targetBox && musicPaths[targetBox.id] === draggedImage.id) {
        // Remove previous image (if any) and return it to gallery
        let existingImage = targetBox.querySelector("img");
        if (existingImage) {
            gallery.appendChild(existingImage);
        }
        
        targetBox.appendChild(draggedImage);
        playMusic(targetBox.id);
    }
}

// Function that plays a specific song depending on the box
function playMusic(boxId) {
    if (currentAudio) {
        currentAudio.pause();
        currentAudio.currentTime = 0;
    }

    let audioId = audioPaths[boxId];
    if (audioId) {
        currentAudio = document.getElementById(audioId);
        currentAudio.loop = true; // Ensures the music plays on loop
        currentAudio.play();
    }
}

// Function to reset images and stop music
function reset() {
    // Reinserts images into their initial positions
    initialPositions.forEach(position => {
        const img = document.getElementById(position.id);
        position.parent.appendChild(img); // Reinserting image back to its original parent
    });

    // Remove only images inside drop boxes, keeping text
    dropBoxes.forEach(box => {
        let imgInside = box.querySelector("img");
        if (imgInside) {
            imgInside.remove();
        }
    });

    // Stop the music if there is any playing
    if (currentAudio) {
        currentAudio.pause();
        currentAudio.currentTime = 0;
        currentAudio = null;
    }
}

// Adding Drag and Drop Events to Boxes
dropBoxes.forEach(box => {
    box.addEventListener("dragover", allowDrop);
    box.addEventListener("drop", drop);
});

// Adding drag event for each image
images.forEach(img => {
    img.setAttribute("draggable", true);
    img.addEventListener("dragstart", drag);
});

// Adding event to reset button
resetButton.addEventListener("click", reset);
