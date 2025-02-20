// Navigation functionality
document.addEventListener('DOMContentLoaded', function() {
    // Get all navigation buttons and sections
    const navButtons = document.querySelectorAll('.nav-btn');
    const sections = document.querySelectorAll('.section');

    // Navigation handler
    function navigateTo(targetId) {
        // Remove active class from all sections and buttons
        sections.forEach(section => section.classList.remove('active'));
        navButtons.forEach(btn => btn.classList.remove('active'));

        // Add active class to target section and button
        document.getElementById(targetId + 'Section').classList.add('active');
        document.getElementById(targetId + 'Btn').classList.add('active');
    }

    // Add click handlers to navigation buttons
    navButtons.forEach(button => {
        button.addEventListener('click', function() {
            const targetId = this.id.replace('Btn', '').toLowerCase();
            navigateTo(targetId);
        });
    });

    // Authentication handling
    const authForm = document.getElementById('authForm');
    const ballot = document.querySelector('.ballot');

    if (authForm) {
        authForm.addEventListener('submit', function(e) {
            e.preventDefault();
            // Simulate authentication
            const voterId = authForm.querySelector('input[type="text"]').value;
            const password = authForm.querySelector('input[type="password"]').value;

            if (voterId && password) {
                // In a real application, you would verify credentials with a server
                simulateAuthentication(voterId, password);
            }
        });
    }

    function simulateAuthentication(voterId, password) {
        // Simulate server authentication delay
        showLoadingState();
        
        setTimeout(() => {
            // Show ballot after successful authentication
            document.querySelector('.authentication').style.display = 'none';
            ballot.style.display = 'block';
            
            // Load sample ballot data
            loadBallot();
            hideLoadingState();
        }, 1500);
    }

    // Ballot functionality
    function loadBallot() {
        const ballotForm = document.getElementById('ballotForm');
        if (!ballotForm) return;

        // Sample ballot data
        const candidates = [
            { id: 1, name: 'KENYATTA UHURU MWIGAI', party: 'National Super Alliance' },
            { id: 2, name: 'MUSALIA MUDAVADI', party: 'Democratic Party' },
            { id: 3, name: 'ODINGA RAILA ', party: 'Azimio La Umoja' }
        ];

        // Create ballot HTML
        const ballotHTML = candidates.map(candidate => `
            <div class="candidate-option">
                <input type="radio" name="vote" id="candidate${candidate.id}" value="${candidate.id}">
                <label for="candidate${candidate.id}">
                    <strong>${candidate.name}</strong>
                    <span>${candidate.party}</span>
                </label>
            </div>
        `).join('');

        ballotForm.innerHTML = ballotHTML + `
            <button type="submit" class="primary-btn">Cast Vote</button>
        `;

        // Add submit handler for ballot
        ballotForm.addEventListener('submit', function(e) {
            e.preventDefault();
            const selectedCandidate = ballotForm.querySelector('input[name="vote"]:checked');
            
            if (selectedCandidate) {
                submitVote(selectedCandidate.value);
            } else {
                alert('Please select a candidate before submitting your vote.');
            }
        });
    }

    function submitVote(candidateId) {
        showLoadingState();
        
        // Simulate vote submission
        setTimeout(() => {
            hideLoadingState();
            alert('Your vote has been successfully recorded!');
            navigateTo('home');
        }, 1500);
    }

    // Results functionality
    const resultType = document.getElementById('resultType');
    if (resultType) {
        resultType.addEventListener('change', loadResults);
    }

    function loadResults() {
        const resultsDisplay = document.querySelector('.results-display');
        if (!resultsDisplay) return;

        // Sample results data
        const results = {
            live: [
                { name: 'KENYATTA UHURU MWIGAI', votes: 1234, percentage: 45 },
                { name: 'MUSALIA MUDAVADI', votes: 982, percentage: 35 },
                { name: 'ODINGA RAILA', votes: 567, percentage: 20 }
            ],
            final: [
                { name: 'KENYATTA UHURU MWIGAI', votes: 5234, percentage: 48 },
                { name: 'MUSALIA MUDAVADI', votes: 4182, percentage: 38 },
                { name: 'ODINGA RAILA', votes: 1567, percentage: 14 }
            ]
        };

        const selectedType = resultType.value;
        const data = results[selectedType];

        // Create results HTML
        const resultsHTML = data.map(candidate => `
            <div class="result-bar">
                <div class="candidate-info">
                    <strong>${candidate.name}</strong>
                    <span>${candidate.votes.toLocaleString()} votes (${candidate.percentage}%)</span>
                </div>
                <div class="progress-bar">
                    <div class="progress" style="width: ${candidate.percentage}%"></div>
                </div>
            </div>
        `).join('');

        resultsDisplay.innerHTML = resultsHTML;
    }

    // Support form handling
    const supportForm = document.getElementById('supportForm');
    if (supportForm) {
        supportForm.addEventListener('submit', function(e) {
            e.preventDefault();
            // Simulate form submission
            alert('Your message has been sent to our support team.');
            this.reset();
        });
    }

    // Utility functions
    function showLoadingState() {
        // Add loading state logic here
        document.body.style.cursor = 'wait';
    }

    function hideLoadingState() {
        document.body.style.cursor = 'default';
    }

    // Initialize the application
    navigateTo('home');
    loadResults();
});