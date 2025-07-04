// Get elements
const messageInput = document.getElementById('card-message');
const widthInput = document.getElementById('card-width');
const heightInput = document.getElementById('card-height');
const bgSelect = document.getElementById('background-select');
const preview = document.getElementById('card-preview');
const previewMessage = document.getElementById('preview-message');
const uploadInput = document.getElementById('background-upload');
const downloadBtn = document.getElementById('download-btn');
const uploadLabel = document.querySelector('.upload-icon-label');
let uploadedBgUrl = null;

function updatePreview() {
    // Update message
    previewMessage.textContent = messageInput.value;
    // Use uploaded background if available, else use selected
    if (uploadedBgUrl) {
        preview.style.backgroundImage = `url('${uploadedBgUrl}')`;
    } else {
        preview.style.backgroundImage = `url('${bgSelect.value}')`;
    }
    // Update dimensions
    preview.style.width = widthInput.value + 'px';
    preview.style.height = heightInput.value + 'px';
}

// Event listeners
messageInput.addEventListener('input', updatePreview);
widthInput.addEventListener('input', updatePreview);
heightInput.addEventListener('input', updatePreview);
bgSelect.addEventListener('change', updatePreview);
uploadInput.addEventListener('change', function(e) {
    const file = e.target.files[0];
    if (file) {
        const reader = new FileReader();
        reader.onload = function(evt) {
            uploadedBgUrl = evt.target.result;
            updatePreview();
        };
        reader.readAsDataURL(file);
    }
});

// Initial preview
updatePreview();

// Download functionality using html2canvas
// You need to include html2canvas via CDN in index.html
if (downloadBtn) {
    downloadBtn.addEventListener('click', function() {
        html2canvas(preview, {backgroundColor: null}).then(canvas => {
            const link = document.createElement('a');
            link.download = 'greeting-card.png';
            link.href = canvas.toDataURL('image/png');
            link.click();
        });
    });
}

if (uploadLabel && uploadInput) {
    uploadLabel.addEventListener('click', () => uploadInput.click());
} 