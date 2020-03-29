"use strict";

const inquirer = require("inquirer");
const fs = require("fs");
const md = require("./utils/generateMarkdown");
const api = require("./utils/api");
const process = require("process");
const path = require("path");
const util = require("util");

const proj = path.basename(process.cwd());
let git = {};

const writeFileAsync = util.promisify(fs.writeFile);

const questions = [
  {
    type: "list",
    name: "welcome",
    message: "Welcome to the readme generator!",
    choices: [
      { name: "Create a document", value: "create" },
      { name: "Preview a document", value: "preview" },
      { name: "Change defaults", value: "defaults" },
      { name: "Exit", value: "exit" }
    ],
    filter: function(value) {
      if (value === "exit") {
        console.log("\n\nSee ya!");
        process.exit(1);
      }
      return value;
    }
  },
  {
    type: "list",
    name: "html",
    message: "Enable html?",
    choices: [
      { name: "Use HTML", value: "html" },
      { name: "md only", value: "md" }
    ]
  },
  {
    type: "input",
    name: "project",
    message: `Enter the name of the project`,
    default: proj
  },
  {
    type: "input",
    name: "version",
    message: `Enter a version number`,
    default: "0.1"
  },
  {
    type: "input",
    name: "git",
    message: "What's your GitHub username? ",
    validate: async function(value) {
      try {
        var pass = value !== "";
        if (pass) {
          const res = await api.getUser(value);

          if (res === `Not Found`) {
            return "Uh-oh, user doesnt seem to exist.";
          } else {
            questions[5].default = res.name;
            questions[6].default = res.email;
            questions[7].default = res.avatar_url;

            return true;
          }
        } else {
          return "Type something foo!";
        }
      } catch (err) {
        console.error(err);
      }
    }
  },
  {
    type: "input",
    name: "name",
    message: "What's your name? "
  },
  {
    type: "input",
    name: "email",
    message: "What's your email? ",
    validate: function(value) {
      var pass = value !== "";
      if (pass) {
        return true;
      }
      return "Type something foo!";
    }
  },
  {
    type: "input",
    name: "img_url",
    message: "Enter a profile image url (github default)",
    validate: function(value) {
      var pass = value !== "";
      if (pass) {
        return true;
      }
      return "Type something foo!";
    }
  },
  {
    type: "input",
    name: "description",
    message: "Description: ",
    validate: function(value) {
      var pass = value !== "";
      if (pass) {
        return true;
      }
      return "Type something foo!";
    }
  },
  {
    type: "input",
    name: "installation",
    default: "skip",
    message: "Installation: "
  },
  {
    type: "input",
    name: "usage",
    message: "Usage: ",
    default: "skip"
  },
  {
    type: "input",
    name: "license",
    message: "License: ",
    default: "skip"
  },
  {
    type: "input",
    name: "support",
    message: "Enter a Patreon username: ",
    default: "skip"
  },
  {
    type: "input",
    name: "link",
    message: "Enter a LinkedIn username: ",
    default: "skip"
  },
  {
    type: "input",
    name: "website",
    message: "Enter a website: ",
    default: "skip"
  },
  {
    type: "input",
    name: "tests",
    message: "Tests: ",
    default: "skip"
  },
  {
    type: "input",
    name: "questions",
    message: "Questions: ",
    default: "skip"
  }
];

async function writeToFile(fileName, data) {
  await writeFileAsync(fileName, data);
  return console.log("Success");
}

async function init() {
  const answers = await inquirer.prompt(questions);
  const doc = await md(answers);
  writeToFile("README.md", doc);
}

init();
