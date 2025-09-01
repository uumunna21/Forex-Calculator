// Sample exchange rates (in place of real API)
const rates = {
  USD: { EUR: 0.92, GBP: 0.78, USD: 1 },
  EUR: { USD: 1.09, GBP: 0.85, EUR: 1 },
  GBP: { USD: 1.28, EUR: 1.17, GBP: 1 }
};

const fromSelect = document.getElementById('from-currency');
const toSelect = document.getElementById('to-currency');
const amountInput = document.getElementById('amount');
const resultDiv = document.getElementById('result');
const convertBtn = document.getElementById('convert-btn');

// Populate currency dropdowns
const currencies = Object.keys(rates);
currencies.forEach(cur => {
  const a = new Option(cur, cur);
  const b = new Option(cur, cur);
  fromSelect.add(a);
  toSelect.add(b);
});

// Add swap and reset buttons and exchange rate display
document.addEventListener('DOMContentLoaded', () => {
  // Add swap and reset buttons and exchange rate display if not present
  const calc = document.querySelector('.calculator');
  if (calc && !document.getElementById('swap-btn')) {
    // Swap button
    const swapBtn = document.createElement('button');
    swapBtn.id = 'swap-btn';
    swapBtn.type = 'button';
    swapBtn.textContent = 'Swap';
    swapBtn.style.margin = '8px 0 8px 0';
    swapBtn.style.width = '100%';
    swapBtn.style.background = '#f1f3f8';
    swapBtn.style.color = '#007bff';
    swapBtn.style.border = '1px solid #ced4da';
    swapBtn.style.borderRadius = '6px';
    swapBtn.style.fontWeight = '600';
    swapBtn.style.cursor = 'pointer';
    swapBtn.style.fontSize = '15px';
    swapBtn.style.padding = '8px 0';
    swapBtn.style.transition = 'background 0.2s';
    swapBtn.onmouseover = () => swapBtn.style.background = '#e5e7eb';
    swapBtn.onmouseout = () => swapBtn.style.background = '#f1f3f8';

    // Reset button
    const resetBtn = document.createElement('button');
    resetBtn.id = 'reset-btn';
    resetBtn.type = 'button';
    resetBtn.textContent = 'Reset';
    resetBtn.style.margin = '8px 0 0 0';
    resetBtn.style.width = '100%';
    resetBtn.style.background = '#fff';
    resetBtn.style.color = '#dc3545';
    resetBtn.style.border = '1px solid #ced4da';
    resetBtn.style.borderRadius = '6px';
    resetBtn.style.fontWeight = '600';
    resetBtn.style.cursor = 'pointer';
    resetBtn.style.fontSize = '15px';
    resetBtn.style.padding = '8px 0';
    resetBtn.style.transition = 'background 0.2s';
    resetBtn.onmouseover = () => resetBtn.style.background = '#f8d7da';
    resetBtn.onmouseout = () => resetBtn.style.background = '#fff';

    // Exchange rate display
    const rateDiv = document.createElement('div');
    rateDiv.id = 'exchange-rate';
    rateDiv.style.margin = '12px 0 0 0';
    rateDiv.style.textAlign = 'center';
    rateDiv.style.fontSize = '15px';
    rateDiv.style.color = '#007bff';
    rateDiv.style.fontWeight = '500';

    // Insert swap button after to-currency row
    const toRow = calc.querySelector('select#to-currency').parentElement;
    toRow.insertAdjacentElement('afterend', swapBtn);

    // Insert exchange rate display after convert button
    const convertBtnEl = calc.querySelector('#convert-btn');
    convertBtnEl.insertAdjacentElement('afterend', rateDiv);

    // Insert reset button after result
    const resultDivEl = calc.querySelector('#result');
    resultDivEl.insertAdjacentElement('afterend', resetBtn);

    // Swap functionality
    swapBtn.onclick = () => {
      const fromIdx = fromSelect.selectedIndex;
      const toIdx = toSelect.selectedIndex;
      fromSelect.selectedIndex = toIdx;
      toSelect.selectedIndex = fromIdx;
      updateExchangeRate();
      resultDiv.textContent = '';
      amountInput.classList.remove('input-error');
    };

    // Reset functionality
    resetBtn.onclick = () => {
      amountInput.value = '';
      fromSelect.selectedIndex = 0;
      toSelect.selectedIndex = 0;
      resultDiv.textContent = '';
      rateDiv.textContent = '';
      amountInput.classList.remove('input-error');
    };
  }

  // Show initial exchange rate
  updateExchangeRate();
});

// Show exchange rate info
function updateExchangeRate() {
  const from = fromSelect.value;
  const to = toSelect.value;
  const rate = rates[from]?.[to];
  const rateDiv = document.getElementById('exchange-rate');
  if (rateDiv) {
    if (rate) {
      rateDiv.textContent = `1 ${from} = ${rate} ${to}`;
    } else {
      rateDiv.textContent = 'Exchange rate not available';
    }
  }
}

// Update exchange rate when currency changes
fromSelect.addEventListener('change', () => {
  updateExchangeRate();
  resultDiv.textContent = '';
  amountInput.classList.remove('input-error');
});
toSelect.addEventListener('change', () => {
  updateExchangeRate();
  resultDiv.textContent = '';
  amountInput.classList.remove('input-error');
});

// Conversion logic with error highlighting
convertBtn.onclick = () => {
  const amount = parseFloat(amountInput.value);
  const from = fromSelect.value;
  const to = toSelect.value;

  amountInput.classList.remove('input-error');
  if (!amount || amount <= 0) {
    resultDiv.textContent = 'Enter a valid amount';
    amountInput.classList.add('input-error');
    return;
  }

  const rate = rates[from]?.[to];
  if (!rate) {
    resultDiv.textContent = 'Conversion not supported';
    return;
  }

  const converted = (amount * rate).toFixed(2);
  resultDiv.textContent = `${amount} ${from} = ${converted} ${to}`;
};
