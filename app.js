
document.addEventListener('DOMContentLoaded', function() {
    const sidebarLinks = document.querySelectorAll('.side-bar a');
    const pages = document.querySelectorAll('.page');

    sidebarLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            const pageId = this.getAttribute('data-page');
            showPage(pageId);
        });
    });

    function showPage(pageId) {
        pages.forEach(page => {
            page.style.display = 'none';
        });

        sidebarLinks.forEach(link => {
            link.classList.remove('active');
        });

        const selectedPage = document.getElementById(`${pageId}-content`);
        if (selectedPage) {
            selectedPage.style.display = 'block';
        }

        const activeLink = document.querySelector(`[data-page="${pageId}"]`);
        if (activeLink) {
            activeLink.classList.add('active');
        }
    }

    
    showPage('profile');
});

//  account balances
let accounts = {
    equity: 0,
    mpesa: 0,
    airtel: 0,
    paypal: 0
};

//  spend categories
let spendCategories = {
    clothing: 0,
    food: 0,
    transport: 0,
    emergencies: 0,
    credit: 0,
    entertainment: 0,
    housing: 0,
    healthcare: 0,
    education: 0,
    other: 0
};

// Function to update total balance
function updateTotalBalance() {
    const totalBalance = Object.values(accounts).reduce((sum, balance) => sum + balance, 0);
    document.getElementById('balance-amount').textContent = totalBalance.toFixed(2);
}

// Function to update individual account balances
function updateAccountBalances() {
    for (const [account, balance] of Object.entries(accounts)) {
        document.getElementById(`${account}-balance`).textContent = balance.toFixed(2);
    }
    updateTotalBalance();
}

// Function to update spend category amounts
function updateSpendCategories() {
    for (const [category, amount] of Object.entries(spendCategories)) {
        document.getElementById(`${category}-amount`).textContent = amount.toFixed(2);
    }
}

// Handle adding money
document.getElementById('add-money-form').addEventListener('submit', function(e) {
    e.preventDefault();
    const account = document.getElementById('account').value;
    const amount = parseFloat(document.getElementById('amount-input').value);

    if (accounts.hasOwnProperty(account) && !isNaN(amount) && amount > 0) {
        accounts[account] += amount;
        updateAccountBalances();
        document.getElementById('amount-input').value = '';
    } else {
        alert('Please enter a valid amount and select an account.');
    }
});

// Handle spending money
document.getElementById('spend-form').addEventListener('submit', function(e) {
    e.preventDefault();
    const spendType = document.getElementById('spend-type').value;
    const account = document.querySelector('input[name="account"]:checked').value;
    const amount = parseFloat(document.getElementById('amount').value);

    if (accounts.hasOwnProperty(account) && spendCategories.hasOwnProperty(spendType) && !isNaN(amount) && amount > 0) {
        if (accounts[account] >= amount) {
            accounts[account] -= amount;
            spendCategories[spendType] += amount;
            updateAccountBalances();
            updateSpendCategories();
            document.getElementById('amount').value = '';
        } else {
            alert('Insufficient funds in the selected account.');
        }
    } else {
        alert('Please enter a valid amount, select an account, and choose a spend category.');
    }
});

// Function to switch between pages
function showPage(pageId) {
    const pages = document.querySelectorAll('.content');
    pages.forEach(page => page.style.display = 'none');
    document.getElementById(pageId).style.display = 'block';
}

// Add event listeners to sidebar links
document.querySelectorAll('.side-bar a').forEach(link => {
    link.addEventListener('click', function(e) {
        e.preventDefault();
        const pageId = this.getAttribute('data-page') + '-content';
        showPage(pageId);
    });
});

// Initialize the page
updateAccountBalances();
updateSpendCategories();
showPage('profile-content');

