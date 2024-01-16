import { Body, Controller, Get, Post } from '@nestjs/common';
import { AppService } from './app.service';
import * as fs from 'fs';
import * as path from 'path';
const cwd = process.cwd();
const projectPath = path.join(cwd, '../project/');

@Controller('/d2c')
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Post('/html')
  async html(@Body() nodeList) {
    console.log('发了一次请求');
    nodeList.forEach((node, index) => {
      const html = toCode(node);
      let style = '<style>';
      const css = toCSS(node);
      style += css + '</style>';
      const htmlPath = path.join(projectPath, `${index}.html`);
      fs.writeFileSync(htmlPath, html + style);
    });
  }

  @Post('/json')
  async json() {}
}

function toCode(node) {
  const { structure, style, resources, children } = node;
  const { id, name, type, characters } = structure;
  const { universal } = style;
  const { isAsset, image } = resources;

  const className = name.replace(/ /g, '-');

  let html = '';
  if (isAsset) {
    return `<img src="${handleResouces(image, className)}" alt="${name}"/>`;
  }
  switch (type) {
    case 'FRAME':
    case 'GROUP':
    case 'COMPONENT':
    case 'INSTANCE':
      html += `<div class=${className}>
      ${children
        .map((node) => {
          return toCode(node);
        })
        .join('')}
      </div>`;
      break;
    case 'TEXT':
      html += `<div class=${className}></div>`;
      break;
    default:
      break;
  }

  return html;
}

function toCSS(node) {
  const { structure, style, children } = node;
  const { name } = structure;
  const { universal } = style;

  const className = name.replace(/ /g, '-');

  let css = '';
  css += `.${className} {`;
  css += `width: 100px`;
  css += '}';

  css += children
    .map((node) => {
      return toCSS(node);
    })
    .join('');

  return css;
}

const staticPath = path.join(projectPath, 'static/');
function handleResouces(uint8arr, name) {
  const imagePath = path.join(staticPath, name + '.png');
  const data = new Uint8Array(Object.values(uint8arr));
  fs.writeFileSync(imagePath, data);
  return imagePath;
}
