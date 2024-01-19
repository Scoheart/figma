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

  const className =
    'd2c-' + name.replace(/[."()\s]/g, '') + id.replace(/[;:]/g, '-');

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

  const className =
    'd2c-' + name.replace(/[."()\s]/g, '') + id.replace(/[;:]/g, '-');

  let css = `.${className}${transformStyle(universal)}\n`;

  css += children
    .map((node) => {
      return toCSS(node);
    })
    .join('');

  return css;
}

const staticPath = path.join(projectPath, 'static/');
function handleResouces(base64, name) {
  const imagePath = path.join(staticPath, name + '.png');
  const data = Buffer.from(base64, 'base64');
  // const data = new Uint8Array(Object.values(base64));
  fs.writeFileSync(imagePath, data);
  return imagePath;
}

function transformStyle(universal) {
  const {
    width,
    height,
    paddingTop,
    paddingRight,
    paddingBottom,
    paddingLeft,
    layoutMode,
    itemSpacing,
    primaryAxisAlignItems,
    counterAxisAlignItems,
    fills,
    fontName,
    fontSize,
    fontWeight,
  } = universal;
  const cssObj = {
    width: width + 'px',
    height: height + 'px',
    display: getDisplay(layoutMode),
    'flex-direction': getFlexDirection(layoutMode),
    'justify-content': getJustifyContent(primaryAxisAlignItems),
    'align-items': getAlignItems(counterAxisAlignItems),
    gap: getGap(itemSpacing),
    padding: getPadding(paddingTop, paddingRight, paddingBottom, paddingLeft),
    'background-color': getBackgroundColor(fills),
    font: getFontFamily(fontName, fontWeight, fontSize),
  };
  const json = JSON.stringify(cssObj, null, 2);
  const json2 = json.split('"').join('');
  return json2.split(',').join(';').split('舒').join(',');
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

function getJustifyContent(primaryAxisAlignItems) {
  switch (primaryAxisAlignItems) {
    case 'MIN':
      return 'start';
    case 'MAX':
      return 'end';
    case 'CENTER':
      return 'center';
    case 'SPACE_BETWEEN':
      return 'space-between';
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

function getGap(itemSpacing) {
  if (!itemSpacing) return undefined;
  return itemSpacing + 'px';
}

function getPadding(paddingTop, paddingRight, paddingBottom, paddingLeft) {
  if (paddingTop === undefined) return undefined;
  // return `${paddingTop}px ${paddingRight}px ${paddingBottom}px ${paddingLeft}px`;
}

function getBackgroundColor(fills) {
  if (!fills) return undefined;
  if (fills.length === 0) return undefined;
  const { color, opacity, type } = fills[0];
  if (type !== 'SOLID') return undefined;
  const r = sliceNum(color.r * 255);
  const g = sliceNum(color.g * 255);
  const b = sliceNum(color.b * 255);
  const a = sliceNum(opacity);

  return `rgba(${r}舒 ${g}舒 ${b}舒 ${a})`;
}

function sliceNum(num) {
  return num.toFixed(2).replace(/\.00$/, '');
}

function getFontFamily(fontName, fontWeight, fontSize) {
  if (!fontName) return undefined;
  console.log(fontName)
  const { family } = fontName;
  return `\"${family}\" ${fontWeight} ${fontSize}`;
}
