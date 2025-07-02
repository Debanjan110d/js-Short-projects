document.addEventListener('DOMContentLoaded', () => {
    const expenseform = document.getElementById('expense-form');
    const expenselist = document.getElementById('expense-list');
    const expensetotal = document.getElementById('total-amount');
    const expenseAmountInput = document.getElementById('expense-amount');
    const expenseNameInput = document.getElementById('expense-name');

    let expenses = loadExpensesFromLocalStorage();
    let totalAmount = calculateTotalAmount(expenses);

    // Load expenses on page load
    renderExpenses(expenses);

    expenseform.addEventListener('submit', (e) => {
        e.preventDefault();
        const name = expenseNameInput.value.trim();

        const amount = parseFloat(expenseAmountInput.value.trim());
        if (name !== "" && !isNaN(amount) && amount > 0) {
            const newExpense = {
                id: Date.now(),
                name: name,
                amount: amount,
            }
            expenses.push(newExpense);
            saveExpensesToLocalStorage(expenses);
            renderExpenses(expenses);
            //clear the input fields
            expenseNameInput.value = "";
            expenseAmountInput.value = "";

        }
    })

    function calculateTotalAmount() {
        return expenses.reduce((total, expense) => total + expense.amount, 0);
    }

    function saveExpensesToLocalStorage() {
        localStorage.setItem('expenses', JSON.stringify(expenses));
    }

    function loadExpensesFromLocalStorage() {
        const storedExpenses = localStorage.getItem('expenses');
        return storedExpenses ? JSON.parse(storedExpenses) : [];
    }

    function updateTotal() {
        totalAmount = calculateTotalAmount(expenses);
        expensetotal.textContent = totalAmount.toFixed(2);
    }

    function renderExpenses(expenses) {
        expenselist.innerHTML = '';
        expenses.forEach(expense => {
            const li = document.createElement('li');
            li.textContent = `${expense.name} - $${expense.amount.toFixed(2)}`;
            const deleteButton = document.createElement('button');
            deleteButton.textContent = 'Delete';
            deleteButton.addEventListener('click', () => {
                // Clear the expenses array and repopulate with filtered items
                const filteredExpenses = expenses.filter(exp => exp.id !== expense.id);
                expenses.length = 0; // Clear array contents
                expenses.push(...filteredExpenses); // Repopulate with filtered items

                saveExpensesToLocalStorage();
                renderExpenses(expenses);
            });
            li.appendChild(deleteButton);
            expenselist.appendChild(li);
        });
        updateTotal();
    }

})