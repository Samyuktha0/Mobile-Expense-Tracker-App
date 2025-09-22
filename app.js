document.getElementById('expense-form').addEventListener('submit', async (e) => {
    e.preventDefault();
    const desc = document.getElementById('desc').value;
    const amount = parseFloat(document.getElementById('amount').value);
    const category = document.getElementById('category').value;

    await fetch('/api/expenses', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ desc, amount, category })
    });

    document.getElementById('desc').value = '';
    document.getElementById('amount').value = '';
    loadExpenses();
});

async function loadExpenses() {
    const res = await fetch('/api/expenses');
    const data = await res.json();
    const list = document.getElementById('expense-list');
    list.innerHTML = '';
    data.forEach(item => {
        list.innerHTML += `<div class="expense-item">${item.desc} - ₹${item.amount} (${item.category})</div>`;
    });
}

window.onload = loadExpenses;
