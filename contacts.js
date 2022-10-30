const { nanoid } = require("nanoid");
const path = require("path");
const fs = require("fs").promises;

const contactsPath = path.join(__dirname, "./db/contacts.json");

async function listContacts() {
  const contactsRaw = await fs.readFile(contactsPath);
  const contacts = JSON.parse(contactsRaw);
  return contacts;
}

async function getContactById(contactId) {
  const contacts = await listContacts();
  const contactToShow = contacts.find(
    (contact) => contact.id === contactId.toString()
  );
  if (!contactToShow) {
    return null;
  }
  return contactToShow;
}

async function removeContact(contactId) {
  const contacts = await listContacts();
  const contact = contacts.find(
    (contact) => contact.id === contactId.toString()
  );
  if (!contact) {
    return null;
  }

  const newContacts = contacts.filter(
    (item) => item.id !== contactId.toString()
  );
  await fs.writeFile(contactsPath, JSON.stringify(newContacts));
  return contact;
}

async function addContact(name, email, phone) {
  const id = nanoid();
  const newContact = { id, name, email, phone };
  const contacts = await listContacts();
  await fs.writeFile(contactsPath, JSON.stringify(contacts));
  return newContact;
}

module.exports = {
  listContacts,
  getContactById,
  removeContact,
  addContact,
};
