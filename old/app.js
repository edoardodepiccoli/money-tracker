const accounts = [
  {
    accountName: "revolut",
    accountInitialAmount: 653,
  },
  {
    accountName: "tradeRepublic",
    accountInitialAmount: 722,
  },
  {
    accountName: "cash",
    accountInitialAmount: 1410,
  },
];

const expenses = [
  {
    amount: 200,
    account: "revolut",
  },
  {
    amount: 49,
    account: "tradeRepublic",
  },
];

const totalPortfolioValueText = document.querySelector(
  ".total-portfolio-value"
);
const updateTotalPortfolioValue = function () {
  let totalAmount = 0;
  for (let account of accounts) {
    totalAmount += account.accountInitialAmount;
    totalPortfolioValueText.textContent = totalAmount;
  }
};

const addMoney = function (account, amount) {
  console.log(`adding ${amount} to ${account}`);
  for (let account2 of accounts) {
    if (account2.accountName === account) {
      account2.accountInitialAmount -= Number(amount);
      updateTotalPortfolioValue();
      populateAccountsList();
      console.log(accounts);
    }
  }
};

const subtractMoney = function (account, amount) {
  console.log(`adding ${amount} to ${account}`);
  for (let account2 of accounts) {
    if (account2.accountName === account) {
      account2.accountInitialAmount += Number(amount);
      updateTotalPortfolioValue();
      populateAccountsList();
      console.log(accounts);
    }
  }
};

// populate expenses and update values
const expenseList = document.querySelector(".expense-list");
const populateExpenseList = function () {
  for (let expense of expenses) {
    const newExpenseLi = document.createElement("li");
    newExpenseLi.classList.add(`${expense.account}`);
    newExpenseLi.textContent = `${expense.account}: ${expense.amount}`;
    expenseList.appendChild(newExpenseLi);
  }
};
populateExpenseList();

// populate ul
const accountsList = document.querySelector(".accounts-list");
const populateAccountsList = function () {
  accountsList.innerHTML = "";
  for (let account of accounts) {
    const newAccountLi = document.createElement("li");
    newAccountLi.classList.add(`${account.accountName}`);
    newAccountLi.textContent = `${account.accountName}: ${account.accountInitialAmount}`;
    accountsList.appendChild(newAccountLi);
  }
};
populateAccountsList();

// populate select
const accountSelectExpense = document.querySelector("#account-select-expense");
const accountSelectIncome = document.querySelector("#account-select-income");
for (let account of accounts) {
  const newOptionExpense = document.createElement("option");
  newOptionExpense.value = account.accountName;
  newOptionExpense.textContent = account.accountName;
  accountSelectExpense.appendChild(newOptionExpense);
  const newOptionIncome = document.createElement("option");
  newOptionIncome.value = account.accountName;
  newOptionIncome.textContent = account.accountName;
  accountSelectIncome.appendChild(newOptionIncome);
}

//add expense logic
const submitExpense = document.querySelector(".submit-expense");
const expenseAmount = document.querySelector("#expense-amount");
const expenseAccountSelector = document.querySelector(
  "#account-select-expense"
);

submitExpense.addEventListener("click", () => {
  addMoney(expenseAccountSelector.value, expenseAmount.value);
});

// add income logic
const submitIncome = document.querySelector(".submit-income");
const incomeAmount = document.querySelector("#income-amount");
const incomeAccountSelector = document.querySelector("#account-select-income");

submitIncome.addEventListener("click", () => {
  subtractMoney(incomeAccountSelector.value, incomeAmount.value);
});

// add expense tracking logic
