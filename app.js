"use strict";

// Load accounts from local storage, or use an empty array if no data exists
const accounts = JSON.parse(localStorage.getItem("accounts")) || [];
// Load transactions from local storage, or use an empty array if no data exists
const transactions = JSON.parse(localStorage.getItem("transactions")) || [];
console.log(accounts);
console.log(transactions);

const accountSelect = document.querySelector(".account-select");
const accountsList = document.querySelector(".accounts-list");
const portfolioValue = document.querySelector(".portfolio-value");
const transactionsList = document.querySelector(".transactions-list");
const submitButton = document.querySelector(".submit-button");
const transactionType = document.querySelector("#transaction-type");
const transactionAmount = document.querySelector(".transaction-amount");
const transactionDescription = document.querySelector(
  ".transaction-description"
);
const createAccountButton = document.querySelector(".create-account-button");
const newAccountName = document.querySelector(".new-account-name");
const newAccountAmount = document.querySelector(".new-account-amount");

const updateLocalStorage = () => {
  // Save accounts and transactions arrays to local storage
  localStorage.setItem("accounts", JSON.stringify(accounts));
  localStorage.setItem("transactions", JSON.stringify(transactions));
};

const updateAccountSelect = () => {
  accountSelect.innerHTML = "";
  for (const account of accounts) {
    const newAccountOption = new Option(account.name, account.name);
    accountSelect.add(newAccountOption);
  }
};

const deleteAccount = (name) => {
  const filteredAccounts = accounts.filter((acc) => acc.name !== name);
  const filteredTransactions = transactions.filter(
    (transaction) => transaction.account !== name
  );
  accounts.splice(0, accounts.length, ...filteredAccounts); // Replace accounts array with filtered array
  transactions.splice(0, transactions.length, ...filteredTransactions); // Replace transactions array with filtered array
  updateLocalStorage();
  updateAccountLi();
  updateAccountSelect();
  updateTransactions();
};

const editAccount = (name, newAmount) => {
  for (let account of accounts) {
    if (account.name === name) {
      const newTransaction = Number(newAmount) - Number(account.amount);
      console.log(account.amount);
      account.amount = Number(newAmount);
      console.log(account.amount);
      updateAccountLi();
      addTransaction(
        account.name,
        newTransaction,
        newTransaction < 0 ? "expense" : "income",
        "edited account amount"
      );
    }
  }
};

const updateAccountLi = () => {
  accountsList.innerHTML = "";
  let totalAmount = 0;
  for (const account of accounts) {
    const newAccountLi = document.createElement("li");
    newAccountLi.textContent = `${account.name}: ${account.amount}`;
    const deleteAccountButton = document.createElement("button");
    deleteAccountButton.textContent = "delete";
    deleteAccountButton.classList.add("delete-account-button");
    deleteAccountButton.addEventListener("click", () => {
      deleteAccount(account.name);
    });

    const editAccountInput = document.createElement("input");
    editAccountInput.type = "number";
    const editAccountButton = document.createElement("button");
    editAccountButton.textContent = "edit";
    editAccountButton.addEventListener("click", () => {
      editAccount(account.name, editAccountInput.value);
    });

    newAccountLi.appendChild(deleteAccountButton);
    newAccountLi.appendChild(editAccountInput);
    newAccountLi.appendChild(editAccountButton);
    accountsList.appendChild(newAccountLi);
    totalAmount += account.amount;
  }
  portfolioValue.textContent = totalAmount;
};

const addTransaction = (account, amount, type, description) => {
  const accountItem = accounts.find((acc) => acc.name === account);
  if (!accountItem) return;

  const date = new Date().toLocaleDateString("it-IT");
  const id = Date.now();
  transactions.push({ id, account, amount, date, description, type });
  accountItem.amount += type === "expense" ? -amount : +amount;
  updateLocalStorage();
  updateAccountLi();
  updateTransactions();
};

submitButton.addEventListener("click", () => {
  addTransaction(
    accountSelect.value,
    transactionAmount.value,
    transactionType.value,
    transactionDescription.value
  );
  transactionAmount.value = "";
  transactionDescription.value = "";
});

const deleteTransaction = (id) => {
  const index = transactions.findIndex((transaction) => transaction.id === id);
  if (index === -1) return;

  const deletedTransaction = transactions.splice(index, 1)[0];
  const accountItem = accounts.find(
    (acc) => acc.name === deletedTransaction.account
  );
  if (!accountItem) {
    console.log("account not found");
    updateAccountLi();
    updateTransactions();
    return;
  }

  accountItem.amount +=
    deletedTransaction.type === "expense"
      ? +deletedTransaction.amount
      : -deletedTransaction.amount;
  updateLocalStorage();
  updateAccountLi();
  updateTransactions();
};

const updateTransactions = () => {
  transactionsList.innerHTML = "";
  for (const transaction of transactions) {
    const newTransactionLi = document.createElement("li");
    newTransactionLi.textContent = `${transaction.type} --> ${transaction.account}: ${transaction.amount}; ${transaction.date}, ${transaction.description}`;
    const deleteTransactionButton = document.createElement("button");
    deleteTransactionButton.textContent = "delete";
    deleteTransactionButton.addEventListener("click", () => {
      deleteTransaction(transaction.id);
    });
    newTransactionLi.appendChild(deleteTransactionButton);
    transactionsList.appendChild(newTransactionLi);
  }
};

updateAccountSelect();
updateAccountLi();
updateTransactions();

document.addEventListener("keypress", (e) => {
  if (e.key === "Enter") {
    addTransaction(
      accountSelect.value,
      transactionAmount.value,
      transactionType.value,
      transactionDescription.value
    );
    transactionAmount.value = "";
    transactionDescription.value = "";
  }
});

createAccountButton.addEventListener("click", function () {
  accounts.push({
    name: newAccountName.value,
    amount: Number(newAccountAmount.value),
  });
  updateLocalStorage();
  updateAccountLi();
  updateAccountSelect();
});
