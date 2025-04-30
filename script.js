
document.addEventListener('DOMContentLoaded', () => {
  const tableBody = document.getElementById('tableBody');
  const deleteSelect = document.getElementById('deleteSelect');

  function saveData() {
    const data = [];
    tableBody.querySelectorAll('tr').forEach(row => {
      const inputs = row.querySelectorAll('input');
      data.push({
        sorte: inputs[0].value,
        laden: inputs[1].value,
        lager: inputs[2].value
      });
    });
    localStorage.setItem('eistabelle', JSON.stringify(data));
  }

  function loadData() {
    const saved = localStorage.getItem('eistabelle');
    if (saved) {
      const data = JSON.parse(saved);
      data.forEach(row => addRow(row.sorte, row.laden, row.lager));
    }
  }

  function addRow(sorte = '', laden = '', lager = '') {
    const row = document.createElement('tr');
    row.innerHTML = `
      <td><input type="text" value="${sorte}"></td>
      <td><input type="text" value="${laden}"></td>
      <td><input type="text" value="${lager}"></td>
    `;
    row.querySelectorAll('input').forEach(input => {
      input.addEventListener('input', saveData);
    });
    tableBody.appendChild(row);
    updateDeleteSelect();
    saveData();
  }

  function updateDeleteSelect() {
    deleteSelect.innerHTML = '';
    tableBody.querySelectorAll('tr').forEach((row, index) => {
      const sorte = row.querySelector('input').value;
      const option = document.createElement('option');
      option.value = index;
      option.textContent = sorte || `Sorte ${index + 1}`;
      deleteSelect.appendChild(option);
    });
  }

  window.addRow = addRow;

  window.deleteRow = () => {
    const index = deleteSelect.value;
    if (index !== null) {
      tableBody.removeChild(tableBody.children[index]);
      updateDeleteSelect();
      saveData();
      hideDeleteModal();
    }
  };

  window.showDeleteModal = () => {
    document.getElementById('deleteModal').style.display = 'block';
  };

  window.hideDeleteModal = () => {
    document.getElementById('deleteModal').style.display = 'none';
  };

  loadData();
});

// Service Worker registrieren
if ('serviceWorker' in navigator) {
  navigator.serviceWorker.register('sw.js').then(() => {
    console.log('Service Worker registriert');
  });
}
