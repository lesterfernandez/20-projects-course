const balance = document.getElementById("balance");
const money_plus = document.getElementById("money-plus");
const money_minus = document.getElementById("money-minus");
const list = document.getElementById("list");
const form = document.getElementById("form");
const text = document.getElementById("text");
const amount = document.getElementById("amount");

const dummyTransactions = [
  { id: 1, text: "Flower", amount: -20 },
  { id: 2, text: "Salary", amount: 300 },
  { id: 3, text: "Book", amount: -10 },
  { id: 4, text: "Camera", amount: 250 },
];

let transactions = dummyTransactions;

function addTransactionsDOM(transaction) {
  const sign = transaction.amount < 0 ? "-" : "+";

  const item = document.createElement("li");

  item.classList.add(transaction.amount < 0 ? "minus" : "plus");
  item.innerHTML = `
    ${transaction.text} <span>${sign}${Math.abs(transaction.amount)}</span>
    <button class="delete-btn">x</button>
  `;

  list.appendChild(item);
}

// update the balance, income and expense
function updateValues() {
  const amounts = transactions.map(transaction => transaction.amount);

  const total = amounts.reduce((prev, curr) => (prev += curr), 0).toFixed(2);

  const income = amounts
    .filter(item => item > 0)
    .reduce((prev, curr) => (prev += curr), 0)
    .toFixed(2);

  const expense = (
    amounts.filter(item => item < 0).reduce((prev, curr) => (prev += curr), 0) * -1
  ).toFixed(2);

  balance.innerText = `$${total}`;
  money_plus.innerText = `$${income}`;
  money_minus.innerText = `$${expense}`;
}

// init app
function init() {
  list.innerHTML = "";

  transactions.forEach(addTransactionsDOM);
  updateValues();
}

init();
