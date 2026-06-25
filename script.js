// ==========================================================================
// 1. MOTEUR DE SIMULATION PHYSIQUE (FOND D'ÉCRAN INTERACTIF)
// ==========================================================================
const canvas = document.getElementById('bg-canvas');
const ctx = canvas.getContext('2d');

let particlesArray = [];
const numberOfParticles = 85; 

const mouse = {
    x: null,
    y: null,
    radius: 160 
};

window.addEventListener('mousemove', (event) => {
    mouse.x = event.x;
    mouse.y = event.y;
});

window.addEventListener('mouseout', () => {
    mouse.x = null;
    mouse.y = null;
});

window.addEventListener('resize', () => {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
    initParticles();
});

class Particle {
    constructor() {
        this.x = Math.random() * canvas.width;
        this.y = Math.random() * canvas.height;
        this.vx = (Math.random() - 0.5) * 0.5; 
        this.vy = (Math.random() - 0.5) * 0.5; 
        this.radius = Math.random() * 2 + 1;   
    }

    update() {
        this.x += this.vx;
        this.y += this.vy;

        if (this.x < 0 || this.x > canvas.width) this.vx = -this.vx;
        if (this.y < 0 || this.y > canvas.height) this.vy = -this.vy;

        if (mouse.x != null && mouse.y != null) {
            let dx = this.x - mouse.x;
            let dy = this.y - mouse.y;
            let distance = Math.sqrt(dx * dx + dy * dy);
            
            if (distance < mouse.radius) {
                let force = (mouse.radius - distance) / mouse.radius;
                let forceX = (dx / distance) * force * 1.6;
                let forceY = (dy / distance) * force * 1.6;
                
                this.x += forceX;
                this.y += forceY;
            }
        }
    }

    draw() {
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2);
        ctx.fillStyle = 'rgba(74, 222, 128, 0.35)'; 
        ctx.fill();
    }
}

function initParticles() {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
    particlesArray = [];
    for (let i = 0; i < numberOfParticles; i++) {
        particlesArray.push(new Particle());
    }
}

function connectParticles() {
    for (let i = 0; i < particlesArray.length; i++) {
        for (let j = i + 1; j < particlesArray.length; j++) {
            let dx = particlesArray[i].x - particlesArray[j].x;
            let dy = particlesArray[i].y - particlesArray[j].y;
            let distance = Math.sqrt(dx * dx + dy * dy);

            if (distance < 115) { 
                let opacity = 1 - (distance / 115);
                ctx.strokeStyle = `rgba(34, 211, 238, ${opacity * 0.13})`; 
                ctx.lineWidth = 1;
                ctx.beginPath();
                ctx.moveTo(particlesArray[i].x, particlesArray[i].y);
                ctx.lineTo(particlesArray[j].x, particlesArray[j].y);
                ctx.stroke();
            }
        }
    }
}

function animate() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    for (let i = 0; i < particlesArray.length; i++) {
        particlesArray[i].update();
        particlesArray[i].draw();
    }
    connectParticles();
    requestAnimationFrame(animate);
}

initParticles();
animate();

// ==========================================================================
// 2. BASE DE DONNÉES DE LA TABLE DES MATIÈRES
// ==========================================================================
const projectData = {
    "mathematiques": {
        title: "Mathématiques pour les Sciences",
        symbol: "Ma",
        color: "#22d3ee",
        desc: "Analyse matricielle, algèbre linéaire pour les espaces d'états, équations différentielles couplées et transformations de Fourier pour l'analyse des systèmes."
    },
    "physique-numerique": {
        title: "Physique Numérique & Modélisation",
        symbol: "Pn",
        color: "#22d3ee",
        desc: "Développement de schémas numériques (Euler, Runge-Kutta) en Python pour résoudre les équations du mouvement et simuler les trajectoires de systèmes complexes."
    },
    "web-dev": {
        title: "Développement Web (From Scratch)",
        symbol: "Wd",
        color: "#22d3ee",
        desc: "Conception d'interfaces web fluides, sémantiques et hautement interactives avec HTML5, CSS3 avancée (Grid/Flexbox) et programmation JavaScript asynchrone."
    },
    "machine-learning": {
        title: "Machine Learning appliqué aux Sciences",
        symbol: "Ml",
        color: "#22d3ee",
        desc: "Exploitation de modèles prédictifs (Python, Scikit-Learn) pour analyser des bases de données expérimentales, classifier des phases ou prédire des propriétés moléculaires."
    },
    "mecanique-quantique": {
        title: "Mécanique Quantique",
        symbol: "Mq",
        color: "#c084fc",
        desc: "Modélisation des fonctions d'onde et résolution de l'équation de Schrödinger. Étude des puits de potentiel discrets et de l'effet tunnel."
    },
    "chimie-quantique": {
        title: "Chimie Quantique",
        symbol: "Cq",
        color: "#c084fc",
        desc: "Détermination des structures électroniques moléculaires, calculs d'orbitales atomiques et moléculaires (méthodes de Hartree-Fock / Hückel)."
    },
    "chimie-organique": {
        title: "Chimie Organique Structurelle",
        symbol: "Co",
        color: "#c084fc",
        desc: "Analyse des mécanismes réactionnels, stéréochimie, synthèse et modélisation géométrique tridimensionnelle des squelettes carbonés."
    },
    "physique-solide": {
        title: "Physique du Solide",
        symbol: "PhS",
        color: "#c084fc",
        desc: "Étude des structures cristallines (réseaux de Bravais), de la théorie des bandes d'énergie dans les semi-conducteurs et des propriétés thermiques des solides."
    },
    "dynamique-moleculaire": {
        title: "Dynamique Moléculaire",
        symbol: "Dm",
        color: "#c084fc",
        desc: "Simulations algorithmiques de trajectoires atomiques au cours du temps pour observer les phénomènes de diffusion ou d'organisation structurelle de la matière."
    },
    "electromagnetisme": {
        title: "Électromagnétisme",
        symbol: "Em",
        color: "#fb923c",
        desc: "Modélisation des équations de Maxwell, propagation des ondes électromagnétiques dans le vide et dans les milieux denses, et calculs de champs."
    },
    "ondes-vibrations": {
        title: "Ondes & Vibrations Mécaniques",
        symbol: "Ov",
        color: "#fb923c",
        desc: "Analyse des systèmes oscillants (harmoniques, amortis, forcés), étude de la propagation d'ondes élastiques et des phénomènes de résonance."
    },
    "optique-ondulatoire": {
        title: "Optique Ondulatoire",
        symbol: "Oo",
        color: "#fb923c",
        desc: "Simulations de figures d'interférence (Fentes de Young, interféromètre de Michelson) et calculs d'intensités lumineuses par diffraction."
    },
    "traitement-signal": {
        title: "Traitement du Signal",
        symbol: "Ts",
        color: "#fb923c",
        desc: "Filtrage numérique, échantillonnage de données physiques et application de la Transformée de Fourier Discrète pour l'analyse spectrale."
    },
    "thermo-physique": {
        title: "Thermodynamique Physique",
        symbol: "Tp",
        color: "#34d399",
        desc: "Étude des principes de la thermodynamique, des cycles moteurs, des transferts thermiques (conduction, convection) et des machines thermiques."
    },
    "thermo-chimique": {
        title: "Thermodynamique Chimique",
        symbol: "Tc",
        color: "#34d399",
        desc: "Calculs d'équilibres chimiques, d'enthalpies libres de réaction (lois de Hess), et étude de l'évolution spontanée des systèmes réactifs."
    },
    "physique-statistique": {
        title: "Physique Statistique",
        symbol: "Ps",
        color: "#34d399",
        desc: "Lien entre le microscopique et le macroscopique. Distributions de Maxwell-Boltzmann, fonctions de partition et calculs des grandeurs thermodynamiques."
    },
    "electrochimie": {
        title: "Électrochimie",
        symbol: "El",
        color: "#34d399",
        desc: "Étude des réactions d'oxydoréduction aux interfaces électrode-électrolyte, cinétique électrochimique (lois de Butler-Volmer) et piles."
    },
    "mecanique-fluides": {
        title: "Mécanique des Fluides Numérique",
        symbol: "Mfn",
        color: "#34d399",
        desc: "Équations de Navier-Stokes. Modélisation et simulation des écoulements laminaires et turbulents, pertes de charge et profils de vitesse."
    }
};

// ==========================================================================
// 3. GESTIONNAIRE DE L'INTERFACE MODALE INTERACTIVE
// ==========================================================================
const modal = document.getElementById('project-modal');
const modalTitle = document.getElementById('modal-title');
const modalSymbol = document.getElementById('modal-symbol');
const modalDesc = document.getElementById('modal-desc');
const closeButton = document.querySelector('.close-button');

document.querySelectorAll('.element').forEach(element => {
    element.addEventListener('click', () => {
        const matter = element.getAttribute('data-matter');
        const data = projectData[matter];

        if (data) {
            modalTitle.innerText = data.title;
            modalSymbol.innerText = data.symbol;
            modalSymbol.style.color = data.color;
            modalDesc.innerHTML = `<p>${data.desc}</p>`;
            modal.style.display = 'flex';
        }
    });
});

closeButton.addEventListener('click', () => { modal.style.display = 'none'; });
window.addEventListener('click', (e) => { if (e.target === modal) modal.style.display = 'none'; });