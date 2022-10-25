const { nanoid } = require("nanoid");
const path = require("path");
const fs = require("fs").promises;

const contactsPath = path.join(__dirname, "./db/contacts.json");

async function listContacts() {
  const dbRaw = await fs.readFile(contactsPath);
  const db = JSON.parse(dbRaw);
  return db;
}

async function getContactById(contactId) {
  const db = await listContacts();
  contactToShow = db.contacts.find(
    (contact) => contact.id === contactId.toString()
  );
  console.table(contactToShow);
  return contactToShow;
}

async function removeContact(contactId) {
  const db = await listContacts();
  const contact = db.contacts.find((item) => item.id === contactId.toString());
  if (!contact) {
    return null;
  }

  const contacts = db.contacts.filter(
    (item) => item.id !== contactId.toString()
  );
  db.contacts = contacts;
  await fs.writeFile(contactsPath, JSON.stringify(db));
}

async function addContact(name, email, phone) {
  const id = nanoid();
  const newContact = { id, name, email, phone };
  const db = await listContacts();
  db.contacts.push(newContact);
  await fs.writeFile(contactsPath, JSON.stringify(db));
  return newContact;
}

module.exports = {
  listContacts,
  getContactById,
  removeContact,
  addContact,
};
