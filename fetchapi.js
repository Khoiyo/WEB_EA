function renderTable(data) {
    const tableBody = document.getElementById('fetch-body');
    tableBody.innerHTML = '';

    data.forEach(item => {
        tableBody.innerHTML += 
        `
            <tr>
                <td>${item.nev}</td><td>${item.kategorianev}</td> <td>${item.vegetarianus ? 'Igen' : 'Nem'}</td>
                <td>
                    <button onclick="editPizza('${item.nev}', '${item.kategorianev}', '${item.vegetarianus}')">Szerkesztés</button>
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

async function addPizza() {
    const nev = document.getElementById('nev');
    const kategorianev = document.getElementById('kategorianev');
    const vegetarianus = document.getElementById('vegetarianus');
    await fetch('api.php', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
            nev: nev.value,
            kategorianev: kategorianev.value,
            vegetarianus: vegetarianus.value
        })
    });
    getPizzas(); 
}

async function deletePizza(pizzaNev) {
    if (!confirm(`Biztosan törölni szeretnéd a következő pizzát: ${pizzaNev}?`)) {
        return;
    }

    try {
        const response = await fetch(`api.php?nev=${encodeURIComponent(pizzaNev)}`, {
            method: 'DELETE'
        });

        const result = await response.json();

        if (response.ok) {
            console.log("Sikeres törlés:", result);
            getPizzas(); 
        } else {
            alert("Hiba: " + (result.message || "Ismeretlen hiba"));
        }

    } catch (error) {
        console.error("Hiba törléskor:", error);
    }
}

function editPizza(nev, kategorianev, vegetarianus) {
    document.getElementById('nev').value = nev;
    document.getElementById('kategorianev').value = kategorianev;
    document.getElementById('vegetarianus').value = vegetarianus;
    
    console.log("Szerkesztés kijelölve: " + nev);
}

async function updatePizza() {
    const nev = document.getElementById('nev').value;
    const kategorianev = document.getElementById('kategorianev').value;
    const vegetarianus = document.getElementById('vegetarianus').value;

    if (!nev) {
        alert("Nincs kiválasztva pizza!");
        return;
    }

    try {
        const response = await fetch('api.php', {
            method: 'PUT',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                nev: nev,
                kategorianev: kategorianev,
                vegetarianus: vegetarianus
            })
        });

        const result = await response.json();

        if (response.ok) {
            alert("Sikeres frissítés!");
            getPizzas(); 
            document.getElementById('nev').value = '';
            document.getElementById('kategorianev').value = '';
            document.getElementById('vegetarianus').value = '';
        } else {
            alert("Hiba: " + (result.message || "Hiba a mentés során"));
        }
    } catch (error) {
        console.error("Hiba:", error);
    }
}

getPizzas();

