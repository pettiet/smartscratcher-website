// Smooth scrolling for navigation links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        }
    });
});

// Add scroll effect to navbar
const navbar = document.querySelector('.navbar');

window.addEventListener('scroll', () => {
    const currentScroll = window.pageYOffset;

    if (currentScroll > 100) {
        navbar.style.boxShadow = '0 2px 10px rgba(0,0,0,0.1)';
    } else {
        navbar.style.boxShadow = 'none';
    }
});

console.log('SmartScratcher website loaded successfully! 🎯');

// ==========================================
// Code Terminal Animation
// ==========================================

const terminalOutput = document.getElementById('terminal-output');
let currentScenarioIndex = 0;
let isAnimating = false;

// Define algorithm scenarios
const scenarios = [
    {
        name: 'Prize Pool Analysis',
        code: [
            { type: 'comment', text: '# Initializing Prize Pool Analysis...' },
            { type: 'code', text: 'function analyzePrizePool(state, gameId) {' },
            { type: 'code', text: '  const prizes = await fetchLotteryData(state);' },
            { type: 'code', text: '  const topPrizes = prizes.filter(p => p.value >= 100000);' },
            { type: 'code', text: '  return calculateDistribution(topPrizes);' },
            { type: 'code', text: '}' },
        ],
        execution: [
            { type: 'progress', text: 'Fetching Texas lottery data...', percent: 15 },
            { type: 'progress', text: 'Processing 47 active games...', percent: 38 },
            { type: 'progress', text: 'Analyzing prize distributions...', percent: 64 },
            { type: 'progress', text: 'Calculating value metrics...', percent: 89 },
            { type: 'progress', text: 'Finalizing analysis...', percent: 100 },
            { type: 'result', text: '✓ Found 12 games with unclaimed jackpots' },
            { type: 'result', text: '✓ Total available prizes: $47.2M' },
            { type: 'result', text: '✓ Best value game: #2156 ($20 Million Spectacular)' },
        ]
    },
    {
        name: 'Ticket Estimation Engine',
        code: [
            { type: 'comment', text: '# Starting Ticket Estimation Algorithm...' },
            { type: 'code', text: 'function estimateRemainingTickets(game) {' },
            { type: 'code', text: '  const initialOdds = game.publishedOdds;' },
            { type: 'code', text: '  const remainingPrizes = game.prizes.unclaimed;' },
            { type: 'code', text: '  const estimate = (remainingPrizes / initialOdds) * 1000;' },
            { type: 'code', text: '  return Math.round(estimate);' },
            { type: 'code', text: '}' },
        ],
        execution: [
            { type: 'progress', text: 'Loading game metadata...', percent: 22 },
            { type: 'progress', text: 'Parsing prize structures...', percent: 45 },
            { type: 'progress', text: 'Running statistical models...', percent: 71 },
            { type: 'progress', text: 'Validating estimates...', percent: 93 },
            { type: 'progress', text: 'Complete!', percent: 100 },
            { type: 'result', text: '✓ Game #2089: ~234,450 tickets remaining' },
            { type: 'result', text: '✓ Game #2156: ~145,230 tickets remaining' },
            { type: 'result', text: '✓ Confidence level: 94.7%' },
        ]
    },
    {
        name: 'Odds Calculator',
        code: [
            { type: 'comment', text: '# Computing Current Estimated Odds...' },
            { type: 'code', text: 'function calculateCurrentOdds(game) {' },
            { type: 'code', text: '  const tickets = estimateRemainingTickets(game);' },
            { type: 'code', text: '  const topPrizes = game.prizes.filter(p => p.tier === 1);' },
            { type: 'code', text: '  const odds = tickets / topPrizes.length;' },
            { type: 'code', text: '  return { ratio: odds, trend: analyzeTrend(game) };' },
            { type: 'code', text: '}' },
        ],
        execution: [
            { type: 'progress', text: 'Retrieving prize claim history...', percent: 18 },
            { type: 'progress', text: 'Calculating odds ratios...', percent: 42 },
            { type: 'progress', text: 'Comparing to initial odds...', percent: 67 },
            { type: 'progress', text: 'Detecting trends...', percent: 85 },
            { type: 'progress', text: 'Generating report...', percent: 100 },
            { type: 'result', text: '✓ Current odds: 1:67,442 (improving ↑)' },
            { type: 'result', text: '✓ Initial odds: 1:125,000 (48% better!)' },
            { type: 'result', text: '✓ Recommendation: Strong Buy' },
        ]
    },
    {
        name: 'Game Scoring System',
        code: [
            { type: 'comment', text: '# Executing SmartScratcher Scoring Algorithm...' },
            { type: 'code', text: 'function calculateGameScore(game) {' },
            { type: 'code', text: '  const oddsScore = evaluateOdds(game);' },
            { type: 'code', text: '  const valueScore = calculateEV(game);' },
            { type: 'code', text: '  const availScore = checkPrizeAvailability(game);' },
            { type: 'code', text: '  return (oddsScore * 0.4) + (valueScore * 0.35) + (availScore * 0.25);' },
            { type: 'code', text: '}' },
        ],
        execution: [
            { type: 'progress', text: 'Evaluating 47 active games...', percent: 12 },
            { type: 'progress', text: 'Computing expected values...', percent: 34 },
            { type: 'progress', text: 'Analyzing prize availability...', percent: 58 },
            { type: 'progress', text: 'Weighting score factors...', percent: 79 },
            { type: 'progress', text: 'Ranking games...', percent: 100 },
            { type: 'result', text: '✓ Top Score: 92.4 - $500 Million Blockbuster' },
            { type: 'result', text: '✓ Second: 87.3 - $20 Million Spectacular' },
            { type: 'result', text: '✓ Rankings updated successfully' },
        ]
    }
];

// Helper function to create a line element
function createLine(content, className = '') {
    const line = document.createElement('div');
    line.className = `code-line ${className}`;
    line.innerHTML = content;
    return line;
}

// Auto-scroll terminal to bottom
function scrollToBottom() {
    terminalOutput.scrollTop = terminalOutput.scrollHeight;
}

// Type out code with animation
async function typeCode(codeLines) {
    for (const line of codeLines) {
        const className = line.type === 'comment' ? 'comment' : '';
        let content = '';

        if (line.type === 'comment') {
            content = `<span class="comment">${line.text}</span>`;
        } else {
            content = formatCode(line.text);
        }

        const lineElement = createLine(content, className);
        terminalOutput.appendChild(lineElement);
        scrollToBottom();
        await sleep(150); // Delay between lines
    }
}

// Show execution with progress
async function showExecution(execSteps) {
    await sleep(300);

    for (const step of execSteps) {
        if (step.type === 'progress') {
            const progressLine = createLine(`
                <span class="keyword">[${step.percent}%]</span> ${step.text}
            `);
            terminalOutput.appendChild(progressLine);
            scrollToBottom();
            await sleep(400); // Progress updates faster
        } else if (step.type === 'result') {
            const resultLine = createLine(`<span class="success">${step.text}</span>`);
            terminalOutput.appendChild(resultLine);
            scrollToBottom();
            await sleep(300);
        }
    }
}

// Format code with syntax highlighting
function formatCode(code) {
    return code
        .replace(/\b(function|const|return|await|if|else|for|while)\b/g, '<span class="keyword">$1</span>')
        .replace(/\b(filter|map|reduce|forEach|find|some|every)\b/g, '<span class="method">$1</span>')
        .replace(/\b(true|false|null|undefined)\b/g, '<span class="boolean">$1</span>')
        .replace(/\b(\d+)\b/g, '<span class="number">$1</span>')
        .replace(/(['"].*?['"])/g, '<span class="string">$1</span>')
        .replace(/\b([a-z][a-zA-Z0-9]*)\s*\(/g, '<span class="function">$1</span>(')
        .replace(/\b([a-z][a-zA-Z0-9]*)\s*=/g, '<span class="variable">$1</span> =')
        .replace(/\.([a-z][a-zA-Z0-9]*)/g, '.<span class="property">$1</span>');
}

// Sleep utility
function sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}

// Run a complete scenario
async function runScenario(scenario) {
    if (isAnimating) return;
    isAnimating = true;

    // Clear terminal and scroll to top
    terminalOutput.innerHTML = '';
    terminalOutput.scrollTop = 0;

    // Add empty line
    terminalOutput.appendChild(createLine(''));

    // Type out code
    await typeCode(scenario.code);

    // Add separator
    await sleep(400);
    terminalOutput.appendChild(createLine(''));
    scrollToBottom();

    // Show execution
    await showExecution(scenario.execution);

    // Add final line
    await sleep(600);
    terminalOutput.appendChild(createLine(''));
    terminalOutput.appendChild(createLine('<span class="success">✓ Complete</span>'));
    scrollToBottom();

    // Wait before next scenario
    await sleep(3000);

    isAnimating = false;
}

// Cycle through scenarios
async function cycleScenarios() {
    while (true) {
        const scenario = scenarios[currentScenarioIndex];
        await runScenario(scenario);

        currentScenarioIndex = (currentScenarioIndex + 1) % scenarios.length;
    }
}

// Start animation when page loads
if (terminalOutput) {
    cycleScenarios();
}
