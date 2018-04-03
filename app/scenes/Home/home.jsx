import API from '../utilities/apiservice.js';
const api = new API();

import {getCookie, setCookie} from '../utilities/cookiemonster.js';

export default class HomeScene {
    constructor(router) { this.router = router; }
    load() { this.onReady() }
    
    onReady() {
        

        this.onRender();
    }

    render() {

        return (
            <main>
                <header class="home-header">
                    <h1 class="text-center">Hi, I'm Jacob</h1>
                </header>
            </main>
        );
    }
    
    onRender() { console.log("Scene Improperly Loaded"); }
    postRender() { console.log("Render completed") }
}