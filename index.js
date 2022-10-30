const api = require("./contacts");
const { Command } = require("commander");
const program = new Command();
program
  .option("-a, --action <type>", "choose action")
  .option("-i, --id <type>", "user id")
  .option("-n, --name <type>", "user name")
  .option("-e, --email <type>", "user email")
  .option("-p, --phone <type>", "user phone");

program.parse(process.argv);

const argv = program.opts();
console.log(argv);

async function invokeAction({ action, name, email, phone, id }) {
  switch (action) {
    case "list":
      const contacts = await api.listContacts();
      console.table(contacts);
      break;

    case "get":
      const contact = await api.getContactById(id);
      console.table(contact);
      break;

    case "remove":
      const removedContact = await api.removeContact(id);
      console.table(removedContact);
      break;

    case "add":
      const newContact = await api.addContact(name, email, phone);
      console.table(newContact);
      break;

    default:
      console.warn("\x1B[31m Unknown action type!");
  }
}

invokeAction(argv);
