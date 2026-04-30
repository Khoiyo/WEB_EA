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
