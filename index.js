#!/usr/bin/env node

const { program } = require('commander');
const inquirer = require('inquirer');
const fs = require('fs');
const path = require('path');
const ejs = require('ejs');

// 脚手架版本
program.version('1.0.0');

// 定义 create 命令
program
  .command('create <project-name>')
  .description('创建一个新的前端项目')
  .action(async (projectName) => {
    // 1. 交互式提问
    const answers = await inquirer.prompt([
      {
        type: 'input',
        name: 'description',
        message: '请输入项目描述：',
        default: '一个基于Vue3的前端项目'
      },
      {
        type: 'confirm',
        name: 'initGit',
        message: '是否初始化Git仓库？',
        default: true
      }
    ]);

    // 2. 创建项目目录
    const targetDir = path.join(process.cwd(), projectName);
    if (!fs.existsSync(targetDir)) {
      fs.mkdirSync(targetDir, { recursive: true });
    }

    // 3. 模板目录（如果有packages/zt-vue3-template，就用它做模板）
    const templateDir = path.join(__dirname, 'packages', 'zt-vue3-template');
    if (fs.existsSync(templateDir)) {
      // 递归复制模板文件
      const copyTemplate = (src, dest) => {
        const stats = fs.statSync(src);
        if (stats.isDirectory()) {
          if (!fs.existsSync(dest)) fs.mkdirSync(dest);
          fs.readdirSync(src).forEach(file => {
            copyTemplate(path.join(src, file), path.join(dest, file));
          });
        } else {
          // 用ejs渲染模板变量
          ejs.renderFile(src, { 
            projectName, 
            description: answers.description 
          }, (err, result) => {
            if (err) throw err;
            fs.writeFileSync(dest, result);
          });
        }
      };
      copyTemplate(templateDir, targetDir);
    } else {
      // 兜底：生成基础package.json
      const pkg = {
        name: projectName,
        version: '1.0.0',
        description: answers.description
      };
      fs.writeFileSync(
        path.join(targetDir, 'package.json'),
        JSON.stringify(pkg, null, 2)
      );
    }

    // 4. 成功提示
    console.log(`\n✅ 项目 ${projectName} 创建成功！`);
    console.log(`📂 项目路径：${targetDir}`);
    console.log(`\n👉 下一步：`);
    console.log(`   cd ${projectName}`);
    console.log(`   npm install`);
  });

// 解析命令行参数
program.parse(process.argv);