document.getElementById('loadUserBtn').addEventListener('click', loadUser);

function loadUser() {
    fetch('https://randomuser.me/api/')
        .then(response => response.json())
        .then(data => {
            const user = data.results[0];
            displayUser(user);
        })
        .catch(error => console.error('Error fetching data:', error));
}

function displayUser(user) {
    const userList = document.getElementById('userList');
    const userItem = document.createElement('div');
    userItem.className = 'user-item';

    const userImage = document.createElement('img');
    userImage.src = user.picture.large;
    userImage.alt = 'User Image';
    userImage.width = 50; // Tamaño pequeño de la imagen

    const userName = document.createElement('span');
    userName.textContent = `${user.name.first} ${user.name.last}`;

    const removeButton = document.createElement('button');
    removeButton.textContent = 'Eliminar';
    removeButton.addEventListener('click', () => userItem.remove());

    userItem.appendChild(userImage);
    userItem.appendChild(userName);
    userItem.appendChild(removeButton);

    userList.appendChild(userItem);
}