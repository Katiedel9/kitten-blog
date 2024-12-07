const uploadForm = document.getElementById('upload-form');
const fileInput = document.getElementById('file-input');
const description = document.getElementById('description');
const mediaContainer = document.getElementById('media-container');

const createEndpoint = logicappkd;
const retrieveEndpoint = RAI;

uploadForm.addEventListener('submit', async (event) => {
    event.preventDefault();

    const file = fileInput.files[0];
    const description = descriptionInput.value;

    if (!file) {
        alert('Please select a file to upload.');
        return;
    }

    const formData = new FormData();
    formData.append('file', file);
    formData.append('description', description);

    try {
        const response = await fetch(createEndpoint, {
            method: 'POST',
            body: formData,
        });
        if (response.ok) {
            alert("File uploaded successfully!");
            loadMedia();
        } else {
            alert("Failed to upload file.");
        }
    } catch (error) {
        console.error("Error uploading file: ", error);
    }
});

async function loadMedia() {
    try { 
        const response = await fetch(retrieveEndpoint);
        if (response.ok) {
            const mediaList = await response.json();
            mediaContainer.innerHTML = "";
            mediaList.forEach(media => {
                const mediaElement = document.createElement("div");
                mediaElement.className = "media-item";
                mediaElement.innerHTML = ` 
                    ${media.fileType.startsWith("image/") ? `<img src="${media.mediaUrl}" alt="${media.description || "Image"}">` : ""}
                    ${media.fileType.startsWith("video/") ? `<video controls src="${media.mediaUrl}"></video>` : ""}
                    <p>${media.description || "No description"}</p>
                `;
                mediaContainer.appendChild(mediaElement);
            });
        } else {
            alert("Failed to retrieve media.");
        }
    } catch (error) {
        console.error("Error retrieving media: ", error);
    }
}

window.addEventListener("DOMContentLoaded", loadMedia);