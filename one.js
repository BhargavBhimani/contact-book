editBtn.addEventListener('click', function (contact) {
    let existingData = localStorage.getItem("contacts");

    if (existingData) {
        const parsedData = JSON.parse(existingData); // Assuming the data is stored as JSON
        parsedData.name = contact.name;
        parsedData.phone = contact.phone;
        localStorage.setItem("contacts", JSON.stringify(parsedData));
        console.log(contact.name);
    } else {
        console.log("Data not found in localStorage.");
    }
})
