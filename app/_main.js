import './styles.scss';
import './main.scss';

import Navigo from './utilities/navigo.js';

import HomeScene from './scenes/home.js';

let router;

document.addEventListener('DOMContentLoaded', initRouter);

function initRouter() {
    if (router) {
        document.removeEventListener('DOMContentLoaded', initRouter);
        return;
    }

    const root = "http://localhost:8000/";
    console.log(root);
    router = new Navigo(root);
    router.on({
        /*'foo/:id': params => {
            loadScene(new FooScene(), params)
        },*/
        '': () => loadScene(new HomeScene(router)),
        '*': () => router.navigate('')
    }).resolve();
}

// We use the load and render methods instead of the constructor
// Because this way we can hijack the render to execute after the load
function loadScene(scene, params) {
    if(scene.ABORT) return router.navigate('/');
    scene.onRender = () => {
        const entry = document.getElementById("yield");
        entry.innerHTML = "";
        entry.appendChild(scene.render());
        scene.postRender();
    };
    scene.load(params);
}





