const resultPattern = ["SMALL", "BIG", "SMALL", "BIG", "SMALL", "SMALL", "BIG", "BIG", "SMALL", "SMALL", 
                       "BIG", "SMALL", "BIG", "SMALL", "SMALL", "BIG", "SMALL", "BIG", "SMALL", "BIG"];
let currentIndex = 0;

function updatePeriodAndTimer() {
    const periodElement = document.getElementById('period30s');
    const timerElement = document.getElementById('timer30s');
    const currentResultElement = document.getElementById('currentResult');
    const historyTable = document.getElementById('resultHistory').getElementsByTagName('tbody')[0];

    const now = new Date();
    const seconds = now.getSeconds();
    const remainingSeconds = 30 - (seconds % 30);
    const minutes = now.getMinutes();
    const totalMinutes = now.getHours() * 60 + minutes;

    // Update period number
    const periodNumber = `20241012-30${1 + totalMinutes * 2 + (seconds >= 30 ? 1 : 0)}`;
    periodElement.innerText = periodNumber;

    // Update timer in format "  x x  :  x x"
    const formattedTime = `  ${String(remainingSeconds).padStart(2, '0')} `;
    timerElement.innerText = formattedTime;

    // Update result when period changes
    if (seconds === 0 || seconds === 30) {
        const result = resultPattern[currentIndex % resultPattern.length];
        currentResultElement.innerText = result;

        // Add to result history
        const newRow = historyTable.insertRow(0);
        const periodCell = newRow.insertCell(0);
        const resultCell = newRow.insertCell(1);
        periodCell.innerText = periodNumber;
        resultCell.innerText = result;

        // Update current result index
        currentIndex++;
    }
}

// Start the 30-second interval timer
setInterval(updatePeriodAndTimer, 1000);
