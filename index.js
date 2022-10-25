const func = require("./contacts");
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
      const db = await func.listContacts();
      console.table(db.contacts);
      break;

    case "get":
      await func.getContactById(id);
      break;

    case "remove":
      await func.removeContact(id);
      break;

    case "add":
      await func.addContact(name, email, phone);
      break;

    default:
      console.warn("\x1B[31m Unknown action type!");
  }
}

invokeAction(argv);
