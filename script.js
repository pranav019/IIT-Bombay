let data = [
  // The JSON data
  {
    id: 1,
    chemicalName: "Ammonium Persulfate",
    vendor: "LG Chem",
    density: "3525.92",
    viscosity: "60.631",
    packaging: "Bag",
    packSize: "100.00",
    unit: "kg",
    quantity: "6495.18",
  },
  {
    id: 2,
    chemicalName: "Caustic Potash",
    vendor: "Formosa",
    density: "3172.15",
    viscosity: "48.22",
    packaging: "Bag",
    packSize: "100.00",
    unit: "kg",
    quantity: "8751.90",
  },
  {
    id: 3,
    chemicalName: "Dimethylaminopropylamino",
    vendor: "LG Chem",
    density: "8453.37",
    viscosity: "12.62",
    packaging: "Barrel",
    packSize: "75.00",
    unit: "L",
    quantity: "5964.61",
  },
  {
    id: 4,
    chemicalName: "Mono Ammonium Phosphate",
    vendor: "Sinopec",
    density: "1597.65",
    viscosity: "76.51",
    packaging: "Bag",
    packSize: "105.00",
    unit: "kg",
    quantity: "8183.73",
  },
  {
    id: 5,
    chemicalName: "Ferric Nitrate",
    vendor: "DowDuPont",
    density: "364.04",
    viscosity: "14.90",
    packaging: "Bag",
    packSize: "105.00",
    unit: "kg",
    quantity: "4154.33",
  },
  {
    id: 6,
    chemicalName: "n-Pentane",
    vendor: "Sinopec",
    density: "4535.26",
    viscosity: "66.76",
    packaging: "N/A",
    packSize: "N/A",
    unit: "t",
    quantity: "6272.14",
  },
  {
    id: 7,
    chemicalName: "Glycol Ether PM",
    vendor: "LG Chem",
    density: "6495.18",
    viscosity: "72.12",
    packaging: "Bag",
    packSize: "250.00",
    unit: "kg",
    quantity: "8749.54",
  },
];

// Load table data from sessionStorage if available
if (sessionStorage.getItem("chemicalData")) {
  data = JSON.parse(sessionStorage.getItem("chemicalData"));
}

const tbody = document.getElementById("chemicalBody");
let selectedRows = new Set();
let currentlyEditingRow = null; // Track the currently editing row

// Function to load data into the table
function loadTable() {
  tbody.innerHTML = "";
  data.forEach((item, index) => {
    const row = document.createElement("tr");
    row.setAttribute("data-index", index);

    // Add class to highlight row if selected or being edited
    const isSelectedOrEditing =
      selectedRows.has(index) || currentlyEditingRow === index;

    row.innerHTML = `
      <td class="${isSelectedOrEditing ? "bg-pink" : ""}">
        <input  type="checkbox" onclick="toggleRowSelection(${index})" ${
      selectedRows.has(index) ? "checked" : ""
    }>
      </td>
      <td class="${
        isSelectedOrEditing ? "bg-pink" : ""
      }" ondblclick="editCell(this, ${index}, 'chemicalName')">${
      item.chemicalName
    }</td>
      <td class="${
        isSelectedOrEditing ? "bg-pink" : ""
      }" ondblclick="editCell(this, ${index}, 'vendor')">${item.vendor}</td>
      <td class="${
        isSelectedOrEditing ? "bg-pink" : ""
      }" ondblclick="editCell(this, ${index}, 'density')">${item.density}</td>
      <td class="${
        isSelectedOrEditing ? "bg-pink" : ""
      }" ondblclick="editCell(this, ${index}, 'viscosity')">${
      item.viscosity
    }</td>
      <td class="${
        isSelectedOrEditing ? "bg-pink" : ""
      }" ondblclick="editCell(this, ${index}, 'packaging')">${
      item.packaging
    }</td>
      <td class="${
        isSelectedOrEditing ? "bg-pink" : ""
      }" ondblclick="editCell(this, ${index}, 'packSize')">${item.packSize}</td>
      <td class="${
        isSelectedOrEditing ? "bg-pink" : ""
      }" ondblclick="editCell(this, ${index}, 'unit')">${item.unit}</td>
      <td class="${
        isSelectedOrEditing ? "bg-pink" : ""
      }" ondblclick="editCell(this, ${index}, 'quantity')">${item.quantity}</td>
    `;
    tbody.appendChild(row);
  });
}

// Toggle row selection
function toggleRowSelection(index) {
  if (selectedRows.has(index)) {
    selectedRows.delete(index);
  } else {
    selectedRows.add(index);
  }
  loadTable();
}

// Edit cell functionality
function editCell(cell, rowIndex, key) {
  const currentValue = cell.textContent;
  currentlyEditingRow = rowIndex;
  const input = document.createElement("input");
  input.value = currentValue;

  input.onblur = function () {
    data[rowIndex][key] = input.value;
    currentlyEditingRow = null;
    saveDataLocally();
    loadTable(); 
  };

  cell.textContent = "";
  cell.appendChild(input);
  input.focus();
}

// Add a new row
function addRow() {
  const newRow = {
    id: data.length + 1,
    chemicalName: "New Chemical",
    vendor: "New Vendor",
    density: "1000",
    viscosity: "50",
    packaging: "Bag",
    packSize: "100",
    unit: "kg",
    quantity: "1000",
  };
  data.push(newRow);
  saveDataLocally();
  loadTable();
}

// Move selected rows up
function moveRowUp() {
  const selectedArray = Array.from(selectedRows);
  if (selectedArray.length === 0) return;

  selectedArray.forEach((index) => {
    if (index > 0) {
      [data[index - 1], data[index]] = [data[index], data[index - 1]];
    }
  });
  saveDataLocally();
  loadTable();
}

// Move selected rows down
function moveRowDown() {
  const selectedArray = Array.from(selectedRows).reverse();
  if (selectedArray.length === 0) return;

  selectedArray.forEach((index) => {
    if (index < data.length - 1) {
      [data[index + 1], data[index]] = [data[index], data[index + 1]];
    }
  });
  saveDataLocally();
  loadTable();
}

// Delete selected rows
function deleteRow() {
  data = data.filter((_, index) => !selectedRows.has(index));
  selectedRows.clear();
  saveDataLocally();
  loadTable();
}

// Save data to sessionStorage
function saveDataLocally() {
  sessionStorage.setItem("chemicalData", JSON.stringify(data));
}

// Refresh the table without saving data
function refreshData() {
  selectedRows.clear();
  loadTable();
}

// Save data and alert the user
function saveData() {
  saveDataLocally();
  alert("Data saved successfully!");
}

// Initial table load
loadTable();
