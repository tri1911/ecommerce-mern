import chalk from "chalk";

const info = (...params: unknown[]) => {
  console.log(...params);
};

const error = (...params: unknown[]) => {
  console.error(chalk.red("❌", ...params));
};

export const themes = {
  info: chalk.yellow,
  success: chalk.green,
  warning: chalk.hex("#FFA500"),
  error: chalk.red,
};

export default { info, error };
