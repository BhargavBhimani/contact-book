document.addEventListener('DOMContentLoaded', function () {
  let contacts = [];
  const addNew = document.getElementById('addNew')
  const contactForm = document.getElementById('contact-form')
  const editForm = document.getElementById('edit-form')
  const editBtn = document.getElementById('editBtn')
  const closeBtn = document.getElementById('close')
  const closedBtn = document.getElementById('closed')
  let contactToEdit;


  addNew.addEventListener('click', function () {
    contactForm.style.display = 'flex'
  })


  function addContact() {
    const name = document.getElementById('name').value;
    const phone = document.getElementById('phone').value;

    if (isPhoneUnique(phone)) {
      const contact = { name, phone };
      if (name != '' && phone != '') {
        let contacts = JSON.parse(localStorage.getItem('contacts')) || [];

        contacts.push(contact);
        localStorage.setItem('contacts', JSON.stringify(contacts));
      }
      else {
        alert('enter name and number')
      }
      displayContacts();
      clearInputFields();
    } else {
      alert("Phone number is already saved");
      clearInputFields();

    }

    contactForm.style.display = 'none'
  }

  function isPhoneUnique(phone) {
    let contacts = JSON.parse(localStorage.getItem('contacts')) || [];
    return contacts.every(contact => contact.phone !== phone);
  }

  function displayContacts() {
    const contactsList = document.getElementById('contacts');
    contactsList.innerHTML = '';
    const storedContacts = JSON.parse(localStorage.getItem('contacts')) || [];
    storedContacts.sort((a, b) => a.name.localeCompare(b.name));
    for (const contact of storedContacts) {

      const editButton = document.createElement('img');
      editButton.src = 'img/edit.svg';
      editButton.width = 20;
      editButton.addEventListener('click', () => editContact(contact))

      const div = document.createElement('div')
      div.classList = 'flex flex row gap-5 items-center'

      const li = document.createElement('li');
      // inputString.charAt(0).toUpperCase() + inputString.slice(1);
      li.innerHTML = `<span class="text-2xl text-left">${contact.name.charAt(0).toUpperCase() + contact.name.slice(1)} <br> <p class="text-sm"> ${contact.phone}</p> </span>`;
      li.classList = 'flex flex-row items-center justify-between w-[85vw] my-2 hover:bg-slate-100 rounded-3xl border-none px-5';

      const deleteButton = document.createElement('img');
      deleteButton.classList = 'inline hover:cursor-pointer'
      deleteButton.src = 'img/delete.svg';
      deleteButton.width = 20;
      deleteButton.addEventListener('click', () => deleteContact(contact.phone));
      div.appendChild(editButton)
      div.appendChild(deleteButton);
      li.appendChild(div)
      contactsList.appendChild(li);
    }
  }

  function editContact(contact) {
    contactToEdit = contact;

    document.getElementById('editName').value = contact.name;
    document.getElementById('editPhone').value = contact.phone;

    editForm.style.display = 'flex';

  }

  function clearInputFields() {
    document.getElementById('name').value = '';
    document.getElementById('phone').value = '';
  }

  function deleteContact(phone) {
    contacts = contacts.filter(contact => contact.phone !== phone);

    let storedContacts = JSON.parse(localStorage.getItem('contacts')) || [];

    const index = storedContacts.findIndex(contact => contact.phone === phone);

    if (index !== -1) {
      storedContacts.splice(index, 1);

      localStorage.setItem('contacts', JSON.stringify(storedContacts));

      displayContacts();
    } else {
      alert('Contact not found.');
    }
  }

  function searchContacts() {
    const searchValue = document.getElementById('search').value.toLowerCase();
    const storedContacts = JSON.parse(localStorage.getItem('contacts')) || [];

    const filteredContacts = storedContacts.filter(contact =>
      contact.name.toLowerCase().includes(searchValue) || contact.phone.includes(searchValue)
    );
    filteredContacts.sort((a, b) => a.name.localeCompare(b.name));
    displayFilteredContacts(filteredContacts);
  }

  function displayFilteredContacts(filteredContacts) {
    const contactsList = document.getElementById('contacts');
    contactsList.innerHTML = '';
    for (const contact of filteredContacts) {

      const editButton = document.createElement('img');
      editButton.src = 'img/edit.svg';
      editButton.width = 20;
      editButton.addEventListener('click', () => editContact(contact))

      const div = document.createElement('div')
      div.classList = 'flex flex row gap-5 items-center'

      const li = document.createElement('li');
      li.innerHTML = `<span class="text-2xl text-left">${contact.name.charAt(0).toUpperCase() + contact.name.slice(1)} <br> <p class="text-sm"> ${contact.phone}</p> </span>`;
      li.classList = 'flex flex-row items-center justify-between w-[85vw] my-2 hover:bg-slate-100 rounded-3xl border-none px-5';

      const deleteButton = document.createElement('img');
      deleteButton.classList = 'inline hover:cursor-pointer'
      deleteButton.src = 'img/delete.svg';
      deleteButton.width = 20;
      deleteButton.addEventListener('click', () => deleteContact(contact.phone));
      div.appendChild(editButton)
      div.appendChild(deleteButton);
      li.appendChild(div)
      contactsList.appendChild(li);

    }
  }

  editBtn.addEventListener('click', function () {
    const updatedName = document.getElementById('editName').value;
    const updatedPhone = document.getElementById('editPhone').value;

    const existingContacts = JSON.parse(localStorage.getItem('contacts')) || [];

    // Find the contact to update
    const index = existingContacts.findIndex(contact => contact.phone === contactToEdit.phone);

    if (index !== -1) {
      existingContacts[index].name = updatedName;
      existingContacts[index].phone = updatedPhone;

      localStorage.setItem('contacts', JSON.stringify(existingContacts));

      editForm.style.display = 'none';
      contactForm.style.display = 'none'

      displayContacts();
    } else {
      alert('Contact not found.');
    }
  });

  closeBtn.addEventListener('click', function () {
    contactForm.style.display = 'none';
    clearInputFields();
  })
  closedBtn.addEventListener('click', function () {
    editForm.style.display = 'none';
    clearInputFields();
  })
  document.getElementById('addButton').addEventListener('click', addContact);
  document.getElementById('search').addEventListener('input', searchContacts);

  displayContacts();
});