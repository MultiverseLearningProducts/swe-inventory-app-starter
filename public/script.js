const button = document.getElementById('btn');
const itemName = document.getElementById('item-name');
const deleteButton = document.getElementById('delete-button');

deleteButton.addEventListener('click', async (e) => {
    await fetch(`/remove-item/${deleteButton.dataset.id}`, {method: 'DELETE'})
})
