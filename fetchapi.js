function renderTable(data) {
    const tableBody = document.getElementById('fetch-body');
    tableBody.innerHTML = '';

    data.forEach(item => {
        tableBody.innerHTML += 
        `
            <tr>
                <td>${item.nev}</td><td>${item.kategorianev}</td> <td>${item.vegetarianus ? 'Igen' : 'Nem'}</td>
                <td>
                    <button onclick="editPizza('${item.nev}')">Szerkesztés</button>
                    <button onclick="deletePizza('${item.nev}')">Törlés</button>
                </td>
            </tr>
        `;
    });
}

async function getPizzas() {
    try {
        const response = await fetch('api.php');
        const data = await response.json();
        renderTable(data);
    } catch (error) {
        console.error('Hiba a lekérés során:', error);
    }
}

async function addPizza(pizzaData) {
    await fetch('api.php', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(pizzaData)
    });
    getPizzas(); 
}

getPizzas();