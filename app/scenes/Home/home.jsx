import API from '../utilities/apiservice.js';
const api = new API();

export default class HomeScene {
    constructor(router) { this.router = router; }
    load() { this.onReady() }
    
    onReady() {
        

        this.onRender();
    }

    render() {

        return (
            <main class="scene-home">

                <section class="modern-section darken img-hero">
                    <h1 class="text-center">Hi, I'm Jacob</h1>
                    <p class="text-center"> I'm a full stack systems engineer from Alberta </p>
                </section>

                <section class="modern-card">
                    <h1> Hexagon Game Platform </h1>
                    <p> Hexagon is a mobile game platform for card based games. The engine allows players to connect from their own devices -- or even share devices if they want to pass them around -- and play round after round of minigames. These minigames are coded as Hexagon Modules and once uploaded to the platform can be loaded as easily as drawing from a deck of cards.</p>
                </section>

                <section class="modern-card">
                    <h1> Assets System </h1>
                    <p> Assets is an enterprise grade inventory management system. Import libraries of items, sign them out to employees or customers, and print detailed reports tracking transactions and billables.</p>
                </section>

                <section class="modern-card">
                    <div class="modern-card-image-container img-firecup"></div>
                    <h1> Firecup Party Game </h1>
                    <p> Firecup is an online party game in the style of King's Cup with thousands of cards, challenges, traps, and actions. I am currently converting it to a Hexagon Module.</p>
                </section>

                <section class="modern-card">
                    <div class="modern-card-image-container img-magicfireball"></div>
                    <h1> Magic Fireball </h1>
                    <p> The Magic Fireball is like a Magic 8-Ball for drinking game rules and challenges. Shake the ball, get a rule.</p>
                    <footer>
                        <a class="cyan-text" href="https://www.magicfireball.com/">VISIT</a>
                    </footer>
                </section>

                <section class="modern-card">
                    <div class="modern-card-image-container img-masquerade"></div>
                    <h1> Masquerade </h1>
                    <p> Masquerade was an anonymous social network much like a combination of Yik Yak and Reddit. While initially popular, the community grew toxic and the site had to be shut down after only a few months. </p>
                </section>

                <section class="modern-card">
                    <div class="modern-card-image-container img-challengeaccepted"></div>
                    <h1> Challenge Accepted </h1>
                    <p> Challenge Accepted is a puzzle platformer flash game sponsored by AddictingGames with over 2 million views worldwide </p>
                </section> 

                <section class="modern-section">
                    <h1 class="text-center">I'm available for hire; get in touch</h1>
                    <ul class="social-links">
                        <li class="social-link">
                            <a href="mailto://web@jacobpariseau.com" class="img-email"></a>
                        </li>
                        <li class="social-link">
                            <a href="https://twitter.com/jacobpariseau" class="img-twitter"></a>
                        </li>
                        <li class="social-link">
                            <a href="https://snapchat.com/add/jacobpariseau" class="img-snapchat"></a>
                        </li>
                        <li class="social-link">
                            <a href="https://github.com/jacobpariseau" class="img-github"></a>
                        </li>
                    </ul>
                </section>

            </main>
        );
    }
    
    onRender() { console.log("Scene Improperly Loaded"); }
    postRender() { console.log("Render completed") }
}