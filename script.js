// Array of fun facts with categories
const funFacts = [
    { fact: "I can solve a Rubik's cube in under 2 minutes!", category: "skills" },
    { fact: "I've visited 15 different countries across 4 continents.", category: "travel" },
    { fact: "I'm fluent in three languages: English, Spanish, and Python (the programming language!).", category: "skills" },
    { fact: "I once ate an entire large pizza by myself in one sitting.", category: "quirks" },
    { fact: "I have a collection of over 200 vinyl records.", category: "hobbies" },
    { fact: "I'm terrified of heights but love roller coasters - go figure!", category: "quirks" },
    { fact: "I can play 'Wonderwall' on guitar (like every other person who's ever picked up a guitar).", category: "skills" },
    { fact: "I'm a certified scuba diver but haven't been diving in 5 years.", category: "hobbies" },
    { fact: "I once met a celebrity but was too nervous to say anything and just walked away.", category: "quirks" },
    { fact: "I've read every Harry Potter book at least 3 times.", category: "hobbies" },
    { fact: "I have a weird talent where I can recognize most songs within the first 3 seconds.", category: "skills" },
    { fact: "I'm secretly really good at karaoke but pretend I'm terrible until the music starts.", category: "quirks" }
];

let factCount = 0;
let currentCategory = "all";

// Function to generate a random fact
function generateFact() {
    const filteredFacts = currentCategory === "all" 
        ? funFacts 
        : funFacts.filter(fact => fact.category === currentCategory);
    
    if (filteredFacts.length === 0) {
        document.getElementById('fact-display').textContent = "No facts available for this category!";
        return;
    }
    
    const randomIndex = Math.floor(Math.random() * filteredFacts.length);
    const selectedFact = filteredFacts[randomIndex].fact;
    const factDisplay = document.getElementById('fact-display');
    
    // Add fade animation
    factDisplay.classList.remove('fade-in');
    void factDisplay.offsetWidth; // Trigger reflow
    factDisplay.classList.add('fade-in');
    
    factDisplay.textContent = selectedFact;
    
    // Update counter
    factCount++;
    document.getElementById('counter').textContent = factCount;
}

// Function to filter facts by category
function filterFacts() {
    currentCategory = document.getElementById('category').value;
    generateFact(); // Show a new fact from the selected category
}

// Function to share the current fact
function shareFact() {
    const currentFact = document.getElementById('fact-display').textContent;
    if (navigator.share) {
        navigator.share({
            title: 'Fun Fact About Me',
            text: currentFact,
            url: window.location.href
        }).catch(err => {
            console.log('Error sharing:', err);
            copyToClipboard(currentFact);
        });
    } else {
        copyToClipboard(currentFact);
    }
}

// Fallback for browsers that don't support Web Share API
function copyToClipboard(text) {
    navigator.clipboard.writeText(text).then(() => {
        alert('Fact copied to clipboard!');
    }).catch(err => {
        console.error('Failed to copy:', err);
        // Fallback for older browsers
        const textarea = document.createElement('textarea');
        textarea.value = text;
        document.body.appendChild(textarea);
        textarea.select();
        document.execCommand('copy');
        document.body.removeChild(textarea);
        alert('Fact copied to clipboard!');
    });
}

// Initialize with a random fact
window.onload = generateFact;