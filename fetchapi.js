async function getPizzas() {
    try {
        const response = await fetch('backend/pizza_api.php');
        const data = await response.json();
        renderTable(data);
    } catch (error) {
        console.error('Hiba a lekérés során:', error);
    }
}
