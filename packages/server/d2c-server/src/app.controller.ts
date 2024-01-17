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

  const className = name.replace(/[."()\s]/g, '') + id.replace(/[;:]/g, '-');

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
      html += `<div class=${className}>${characters}</div>`;
      break;
    default:
      break;
  }

  return html;
}

function toCSS(node) {
  const { structure, style, children } = node;
  const { id, name } = structure;
  const { universal } = style;

  const className = name.replace(/[."()\s]/g, '') + id.replace(/[;:]/g, '-');

  let css = `.${className}${transformStyle(universal)}\n`;

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

function transformStyle(universal) {
  const { width, height, layoutMode } = universal;
  const cssObj = {
    width: width + 'px',
    height: height + 'px',
    display: getDisplay(layoutMode),
    'flex-direction': getFlexDirection(layoutMode),
  };
  const json = JSON.stringify(cssObj, null, 2);
  const json2 = json.split('"').join('');
  return json2.split(',').join(';');
}

function getDisplay(layoutMode) {
  switch (layoutMode) {
    case 'HORIZONTAL':
    case 'VERTICAL':
      return 'flex';
    case 'NONE':
      return undefined;
  }
}

function getFlexDirection(layoutMode) {
  switch (layoutMode) {
    case 'HORIZONTAL':
      return 'row';
    case 'VERTICAL':
      return 'column';
    case 'NONE':
      return undefined;
  }
}

function getAlignItems(counterAxisAlignItems) {
  switch (counterAxisAlignItems) {
    case 'MIN':
      return 'flex-start';
    case 'CENTER':
      return 'center';
    case 'MAX':
      return 'flex-end';
    case 'BASELINE':
      return 'baseline';
  }
}
