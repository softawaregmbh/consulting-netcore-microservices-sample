import 'bootstrap';
import "./index.css";
import 'bootstrap/dist/css/bootstrap.css';

document.addEventListener('DOMContentLoaded', () => {
    const dom = {
        loadingIndicator: document.getElementById('loading-indicator'),
        loadedContent: document.getElementById('loaded-content'),
    };

    setTimeout(() => {
        dom.loadingIndicator.hidden = true;
        dom.loadedContent.hidden = false;
    }, 1000);
}, false);