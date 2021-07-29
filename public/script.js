const button = document.getElementById('btn');
const itemName = document.getElementById('item-name');
const deleteButton = document.getElementById('delete-button');
const item = document.getElementById(`item-${deleteButton.dataset.id}`)

deleteButton.addEventListener('click', (e) => {
    const deleteItem = async function() {
        await fetch(`/remove-item/${deleteButton.dataset.id}`, {method: 'DELETE'})
    }
    deleteItem()
    location.reload()
})
