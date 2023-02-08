// Invoked on the commit-msg git hook by simple-git-hooks.

import { readFileSync } from 'fs';
import colors from 'picocolors';

// get $1 from commit-msg script
const msgFilePath = process.argv[2];
const msgFileContents = readFileSync(msgFilePath, 'utf-8');
const commitTitle = msgFileContents.split(/\r?\n/)[0];

const commitRE =
  /^(revert: )?(feat|fix|refactor|test|perf|style|asset|doc|ci|chore|wip)(\(.+\))?: [A-Z].{1,98}[^.]$/;

if (!commitRE.test(commitTitle)) {
  console.log();
  console.error(
    `  ${colors.bgRed(colors.white(' ERROR '))} ${colors.white(
      `Invalid commit title, format, or length.`
    )}\n\n` +
      colors.white(
        `  Commit messages must under 100 characters and have the following format:\n\n`
      ) +
      `    ${colors.green(
        `- Starts with feat, fix, refactor, test, perf, style, asset, doc, ci, chore or wip`
      )}\n` +
      `    ${colors.green(
        `- Followed by a semi-colon and a space, then a capitalized title.`
      )}\n\n` +
      `    ${colors.white(
        `Example => ${colors.green(`feat: Add new cool feature`)}`
      )}\n\n`
  );
  process.exit(1);
}
