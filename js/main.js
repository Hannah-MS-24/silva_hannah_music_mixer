/* Variables */

const dropBoxes = document.querySelectorAll(".drop-box");
const images = document.querySelectorAll(".gallery img");
const resetButton = document.getElementById("resetButton");
const gallery = document.querySelector(".gallery");

const musicPaths = {
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

// Functions
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

    // Checks if the box already has an image, removing it before adding the new one
    if (event.target.classList.contains("drop-box")) {
        event.target.innerHTML = ""; // Remove any previous image
        event.target.appendChild(draggedImage);
        playMusic(event.target.id);
    }
}

// Function that plays a specific song depending on the box
function playMusic(boxId) {
    if (currentAudio) {
        currentAudio.pause();
        currentAudio.currentTime = 0;
    }

    let audioId = musicPaths[boxId];
    if (audioId) {
        currentAudio = document.getElementById(audioId);
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

    // Clear all drop boxes
    dropBoxes.forEach(box => box.innerHTML = "");

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
