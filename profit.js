const entryInput = document.getElementById('entry-price');
const exitInput = document.getElementById('exit-price');
const lotInput = document.getElementById('lot-size');
const profitBtn = document.getElementById('profit-btn');
const profitResult = document.getElementById('profit-result');
const backBtn = document.getElementById('back-btn');

if (profitBtn) {
  profitBtn.onclick = () => {
    const entry = parseFloat(entryInput.value);
    const exit = parseFloat(exitInput.value);
    const lot = parseFloat(lotInput.value);

    if (
      isNaN(entry) || isNaN(exit) || isNaN(lot) ||
      entry <= 0 || exit <= 0 || lot <= 0
    ) {
      profitResult.textContent = 'Enter valid values';
      return;
    }

    const profit = ((exit - entry) * lot).toFixed(2);
    profitResult.textContent = `Profit: ${profit}`;
  };
}

if (backBtn) {
  backBtn.onclick = () => {
    window.location.href = 'index.html';
  };
}
