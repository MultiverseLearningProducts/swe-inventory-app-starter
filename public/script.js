const button = document.getElementById('btn');
const itemName = document.getElementById('item-name');
const deleteButton = document.getElementById('delete-button');
const item = document.getElementById(`item-${deleteButton.dataset.id}`)

deleteButton.addEventListener('click', async (e) => {
    await fetch(`/remove-item/${deleteButton.dataset.id}`, {method: 'DELETE'})
    window.location.href = '/items' //redirects to item page
})
