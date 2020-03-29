"use strict";
async function generateMarkdown(data) {
  const title = data.project;
  const installation =
    data.installation === "skip"
      ? ``
      : `\n## Installation\n${data.installation}`;
  const usage =
    data.usage === "skip" ? `` : `\n## Usage\n\`\`\`${data.usage}\`\`\``;
  const license =
    data.license === "skip" ? `` : `\n## License\n${data.license}`;
  const support =
    data.support === "skip" ? `` : `\n## Support\n${data.support}`;
  const tests = data.tests === "skip" ? `` : `\n## Tests\n${data.tests}`;
  const questions =
    data.questions === "skip" ? `` : `\n## Questions\n${data.questions}`;

  return `
# ${title}

## [Home]('https://github.com/${data.git}/${title}/')

## [Demo]('https://${data.git}.github.io/${title}/')

## Description
${data.description}
${installation}
${usage}
${license}
${support}
${tests}
${questions}

## Contact
### Name: ${data.name}
### Email: ${data.email}
<img src='${data.img_url}' />
`;
}

module.exports = generateMarkdown;
