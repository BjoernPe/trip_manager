var amounts = [];

function fetchExchangeRates() {
  fetch('https://open.er-api.com/v6/latest/EUR')
    .then(response => response.json())
    .then(data => {
      console.log(data);
      updateExchangeRates(data.rates);
    })
    .catch(error => console.error('Error fetching exchange rates:', error));
}

function updateExchangeRates(rates) {
  window.exchangeRates = rates;
  loadFromLocalStorage();
}

function convertToEuro(amount, currency, exchangeRate) {
  var exchangeRate = window.exchangeRates[currency] || 1;
  return amount / exchangeRate;
}

function updateTotalAmount() {
  var totalAmount = amounts.reduce((sum, entry) => sum + convertToEuro(entry.amount, entry.currency), 0);
  document.getElementById('total-amount').innerHTML = `<strong>Total Amount:</strong> ${totalAmount.toFixed(2)} EUR`;
}

function updateStatsTable() {
  var statsTable = document.getElementById('stats-table');
  // Erstelle die Tabelle neu
  statsTable.innerHTML = `<table>
                            <tr>
                              <th>Object</th>
                              <th>Amount (Currency)</th>
                              <th>Converted Amount</th>
                              <th>Date</th>
                            </tr>
                          </table>`;
  var tableBody = statsTable.querySelector('table');

  // Füge Zeilen mit Daten hinzu
  for (var i = 0; i < amounts.length; i++) {
    var newRow = tableBody.insertRow(tableBody.rows.length);
    var objectCell = newRow.insertCell(0);
    var amountCell = newRow.insertCell(1);
    var convertedAmountCell = newRow.insertCell(2);
    var dateCell = newRow.insertCell(3); 

    objectCell.innerHTML = amounts[i].object;
    amountCell.innerHTML = `${amounts[i].amount.toFixed(2)} ${amounts[i].currency}`;
    
    // Umrechnung in Euro (Annahme: EUR, USD und GBP werden unterstützt)
    var convertedAmount = convertToEuro(amounts[i].amount, amounts[i].currency);
    convertedAmountCell.innerHTML = `${convertedAmount.toFixed(2)} EUR`;

    dateCell.innerHTML = amounts[i].date;
  }
}

function saveData() {
  var form = document.getElementById('trip-form');
  form.classList.add('was-validated');

  if (form.checkValidity()) {
    var currency = document.getElementById('currency').value;
    var amount = document.getElementById('amount').value;
    var object = document.getElementById('object').value;
    var date = new Date().toLocaleDateString();

    amounts.push({
      amount: parseFloat(amount),
      currency: currency.toUpperCase(),
      object: object,
      date: date
    });

    updateTotalAmount();
    updateStatsTable();
    saveToLocalStorage();

    document.getElementById('amount').value = '';
    document.getElementById('object').value = '';

    form.classList.remove('was-validated');
  }
}

function saveToLocalStorage() {
  if (typeof Storage !== 'undefined') {
    localStorage.setItem('tripData', JSON.stringify(amounts));
    console.log('Data saved successfully.');
  } else {
    console.error('localStorage is not supported in this browser.');
  }
}

function loadFromLocalStorage() {
  if (typeof Storage !== 'undefined') {
    var storedData = localStorage.getItem('tripData');
    if (storedData) {
      amounts = JSON.parse(storedData);
      updateTotalAmount();
      updateStatsTable();
      console.log('Data loaded successfully.');
    } else {
      console.log('No saved data found.');
    }
  } else {
    console.error('localStorage is not supported in this browser.');
  }
}

function clearData() {
  if (typeof Storage !== 'undefined') {
    localStorage.removeItem('tripData');
    console.log('Data cleared from localStorage.');
  } else {
    console.error('localStorage is not supported in this browser.');
  }

  amounts = [];
  updateTotalAmount();
  updateStatsTable();
}


// Führe die Wechselkurse abrufen-Funktion aus
fetchExchangeRates();

