
let pizaKategoriak = [];


async function loadData() {
    try {
        
        const response = await fetch('kategoria.txt');
        if (!response.ok) throw new Error('Nem sikerült betölteni a kategoria.txt fájlt!');
        const text = await response.text();
        
        parseData(text);
        renderTable();
    } catch (error) {
        console.error("Hiba a betöltéskor ", error);
        
    }
}


function parseData(text) {
    const lines = text.trim().split('\n');
    pizaKategoriak = [];
    
    
    for (let i = 1; i < lines.length; i++) {
        const row = lines[i].trim();
        if (row) {
            const cols = row.split('\t');
            if (cols.length >= 2) {
                pizaKategoriak.push({
                    nev: cols[0],
                    ar: parseInt(cols[1], 10)
                });
            }
        }
    }
}


function createRecord() {
    const nevInput = document.getElementById('kategoria-nev');
    const arInput = document.getElementById('kategoria-ar');
    
    const nev = nevInput.value.trim();
    const ar = parseInt(arInput.value, 10);
    
    if (nev && !isNaN(ar)) {
        pizaKategoriak.push({ nev: nev, ar: ar });
        nevInput.value = '';
        arInput.value = '';
        renderTable();
    } else {
        alert("Kérlek adj meg érvényes nevet és árat!");
    }
}


function renderTable() {
    const tbody = document.getElementById('table-body');
    tbody.innerHTML = '';
    
    pizaKategoriak.forEach((item, index) => {
        const tr = document.createElement('tr');
        
        const tdNev = document.createElement('td');
        tdNev.textContent = item.nev;
        
        const tdAr = document.createElement('td');
        tdAr.textContent = item.ar;
        
        const tdActions = document.createElement('td');
        
        const editBtn = document.createElement('button');
        editBtn.textContent = "Szerkesztés";
        editBtn.onclick = () => updateRecord(index);
        
        const deleteBtn = document.createElement('button');
        deleteBtn.textContent = "Törlés";
        deleteBtn.className = "delete-btn";
        deleteBtn.onclick = () => deleteRecord(index);
        
        tdActions.appendChild(editBtn);
        tdActions.appendChild(deleteBtn);
        
        tr.appendChild(tdNev);
        tr.appendChild(tdAr);
        tr.appendChild(tdActions);
        
        tbody.appendChild(tr);
    });
}


function updateRecord(index) {
    const ujNev = prompt("Add meg az új nevet:", pizaKategoriak[index].nev);
    const ujAr = prompt("Add meg az új árat:", pizaKategoriak[index].ar);
    
    if (ujNev !== null && ujAr !== null) {
        const parsedAr = parseInt(ujAr, 10);
        if (!isNaN(parsedAr)) {
            pizaKategoriak[index].nev = ujNev.trim();
            pizaKategoriak[index].ar = parsedAr;
            renderTable();
        } else {
            alert("Érvénytelen ár!");
        }
    }
}


function deleteRecord(index) {
    if (confirm("Biztosan törölni szeretnéd ezt a kategóriát?")) {
        pizaKategoriak.splice(index, 1);
        renderTable();
    }
}


window.onload = loadData;
