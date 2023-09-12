class BankAccount {
    constructor(accountHolder, accountType) {
        this.accountHolder = accountHolder;
        this.accountType = accountType;
        this.balance = 0;
    }

    deposit(amount) {
        if (amount <= 0 || isNaN(amount)) {
            throw new Error("Invalid deposit amount.");
        }
        this.balance += amount;
    }

    withdraw(amount) {
        if (amount <= 0 || isNaN(amount)) {
            throw new Error("Invalid withdrawal amount.");
        }
        if (amount > this.balance) {
            throw new Error("Insufficient funds.");
        }
        this.balance -= amount;
    }

    checkBalance() {
        return this.balance;
    }
}

let currentAccount;

function performTransaction() {
    const accountHolder = document.getElementById("accountHolder").value;
    const accountType = document.getElementById("accountType").value;
    const amount = parseFloat(document.getElementById("amount").value);
    const transactionType = document.getElementById("transactionType").value;
    const resultDiv = document.getElementById("result");

    try {
        if (!currentAccount) {
            currentAccount = new BankAccount(accountHolder, accountType);
        }

        switch (transactionType) {
            case "deposit":
                currentAccount.deposit(amount);
                resultDiv.textContent = `Account Holder Name:  ${accountHolder} ` + ` with the account type: ${accountType}` + ` Deposited $${amount}. New balance: $${currentAccount.checkBalance()}`;
                break;
            case "withdraw":
                currentAccount.withdraw(amount);
                resultDiv.textContent = `Account Holder Name:  ${accountHolder} ` + ` with the account type: ${accountType}` + `Withdrawn $${amount}. New balance: $${currentAccount.checkBalance()}`;
                break;
            case "checkBalance":
                resultDiv.textContent = `Account Holder Name:  ${accountHolder} ` + ` with the account type: ${accountType}` + `Account balance: $${currentAccount.checkBalance()}`;
                break;
        }
    } catch (error) {
        resultDiv.textContent = `Error: ${error.message}`;
    } finally {
        clearForm();
    }
}

function clearForm() {
    document.getElementById("accountHolder").value = "";
    document.getElementById("accountType").value = "";
    document.getElementById("amount").value = "";
    document.getElementById("transactionType").selectedIndex = 0;
}