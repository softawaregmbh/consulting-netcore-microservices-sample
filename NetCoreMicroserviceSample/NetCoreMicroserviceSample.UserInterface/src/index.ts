import 'bootstrap';
import "./index.css";
import 'bootstrap/dist/css/bootstrap.css';

declare const API_DOMAIN: string;

document.addEventListener('DOMContentLoaded', () => {
    console.log(API_DOMAIN);

    const dom = {
        loadingIndicator: document.getElementById('loading-indicator'),
        loadedContent: document.getElementById('loaded-content'),
    };

    setTimeout(() => {
        dom.loadingIndicator.hidden = true;
        dom.loadedContent.hidden = false;
    }, 1000);
}, false);