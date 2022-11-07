#!/usr/bin/env node
console.log("create-smarty ....");

import { promisify } from "util";
import figlet from "figlet"; //提供炫酷的文字效果；
import clear from "clear"; //清除屏幕
import chalk from "chalk";
import inquirer from "inquirer"; //命令行选项
import chalkAnimation from "chalk-animation"; //提供命令行动画与渐变颜色。

const log = (content) => console.log(chalk.green(content));
const opt = {
  "vue3 vite ui应用模版(Vite)": "vue3-vite-ui",
  模版: "admin",
  组件库脚手架: "uitemplate",
  组件库文档网站: "uitemplate",
  退出: "quit"
};
const question = [
  {
    type: "rawlist" /* 选择框 */,
    message: "请选择要创建的项目？",
    name: "operation",
    choices: Object.keys(opt)
  }
];

// 打印欢迎画面
clear();
const logo = figlet.textSync("VUE3 VITE UI!", {
  // font: "Ghost",
  horizontalLayout: "default",
  verticalLayout: "default",
  width: 80,
  whitespaceBreak: true
});

const rainbow = chalkAnimation.rainbow(logo);
setTimeout(() => {
  rainbow.stop(); // Animation stops
  query();
}, 500);

// Debug
// const { default: op } = await import(`../lib/operations/smarty-ui-vite.js`);
// op()

async function query() {
  const answer = await inquirer.prompt(question);

  if (answer.operation === "退出") return;
  const { default: op } = await import(
    `../lib/operations/${opt[answer.operation]}.js`
  );
  await op();
}
