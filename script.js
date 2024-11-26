<script>
    // Variables principales
    const input = document.getElementById("fibo-input");
    const button = document.getElementById("start-button");
    const output = document.querySelector(".fibo-output");
    const fiboSound = document.getElementById("fibo-sound");
    const backgroundMusic = document.getElementById("background-music");
    const playButton = document.getElementById("play-button");
    const canvas = document.getElementById("math-canvas");
    const ctx = canvas.getContext("2d");

    // Ajuster la taille du canvas
    function resizeCanvas() {
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;
    }
    resizeCanvas();
    window.addEventListener("resize", resizeCanvas);

    // Génération de la suite de Fibonacci
    function generateFibonacci(n) {
        const fibo = [0, 1];
        for (let i = 2; i < n; i++) {
            fibo.push(fibo[i - 1] + fibo[i - 2]);
        }
        return fibo.slice(0, n);
    }

    // Affichage limité à 10 nombres par ligne
    function displayFibonacci(fibo) {
        output.innerHTML = "";
        let index = 0;

        const interval = setInterval(() => {
            if (index < fibo.length) {
                const numberElement = document.createElement("div");
                numberElement.textContent = fibo[index];
                numberElement.className = "fibo-number";
                output.appendChild(numberElement);
                fiboSound.currentTime = 0;
                fiboSound.play();
                index++;
            } else {
                clearInterval(interval);
            }
        }, 1000);
    }

    // Fonction pour jouer/pause la musique de fond
    function toggleMusic() {
        if (backgroundMusic.paused) {
            backgroundMusic.play();
            playButton.textContent = "Pause"; // Change le texte à "Pause" quand la musique joue
        } else {
            backgroundMusic.pause();
            playButton.textContent = "Play"; // Change le texte à "Play" quand la musique est en pause
        }
    }

    // Ajouter un événement au bouton play
    playButton.addEventListener("click", toggleMusic);

    // Effet de "neige" avec formules mathématiques
    function drawMathSnow() {
        const symbols = ["∑", "∫", "π", "√", "θ", "∆", "∞"];
        const particles = Array.from({ length: 100 }, () => ({
            x: Math.random() * canvas.width,
            y: Math.random() * canvas.height,
            symbol: symbols[Math.floor(Math.random() * symbols.length)],
            speed: Math.random() * 3 + 1,
            fontSize: Math.random() * 20 + 15
        }));

        function update() {
            ctx.clearRect(0, 0, canvas.width, canvas.height);
            particles.forEach(particle => {
                ctx.font = `${particle.fontSize}px Arial`;
                ctx.fillStyle = "rgba(255, 255, 255, 0.8)";
                ctx.fillText(particle.symbol, particle.x, particle.y);
                particle.y += particle.speed;
                if (particle.y > canvas.height) particle.y = -50;
            });
            requestAnimationFrame(update);
        }

        update();
    }

    // Démarrage de l'effet de neige
    drawMathSnow();

    // Bouton pour démarrer la suite de Fibonacci
    button.addEventListener("click", () => {
        const n = parseInt(input.value);
        if (n > 0 && n <= 100) {
            const fibo = generateFibonacci(n);
            displayFibonacci(fibo);
        } else {
            alert("Veuillez entrer un nombre entre 1 et 100.");
        }
    });
</script>
