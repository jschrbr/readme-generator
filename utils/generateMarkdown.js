"use strict";
async function generateMarkdown(data) {
  const title = data.project;
  const installation =
    data.installation === "skip"
      ? ``
      : `
## Installation
\`\`\`sh
  ${data.installation}
\`\`\`
`;
  const usage =
    data.usage === "skip"
      ? ``
      : `## Usage
  >${data.usage}`;
  const license =
    data.license === "skip"
      ? ``
      : `
## License
>${data.license}
`;
  const support =
    data.support === "skip"
      ? ``
      : `
## Show your support
Give a ⭐️ if this project helped you!  
<a href="https://www.patreon.com/${data.support}">
  <img src="https://c5.patreon.com/external/logo/become_a_patron_button@2x.png" width="160">
</a>
`;
  const link =
    data.support === "skip"
      ? ``
      : `
- LinkedIn: [@${data.link}](https://linkedin.com/in/${data.link})
`;
  const website = data.website === "skip" ? `` : `- Website: ${data.website}`;
  const tests =
    data.tests === "skip"
      ? ``
      : `
## Tests
${data.tests}
`;
  const questions =
    data.questions === "skip"
      ? ``
      : `
## Questions
>${data.questions}
`;

  return `
# ${title}
<img alt="Version" src="https://img.shields.io/badge/version-${data.version}-blue.svg?cacheSeconds=2592000" />

> ${data.description}

## 🏠 [Home](https://github.com/${data.git}/${title}/)

## ✨ [Demo](https://${data.git}.github.io/${title}/)
${installation}
${usage}
${license}
${support}
${tests}
${questions}

## Author
👤 **${data.name}**
<img src='${data.img_url}' />

${website}
- Email: ${data.email}
- Github: [@${data.git}](https://github.com/${data.git})
${link}

`;
}

module.exports = generateMarkdown;
