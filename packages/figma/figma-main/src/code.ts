import codegenMode from './editorType/dev/codegenMode';
import defaultMode from './editorType/figma/defaultMode';
import inspectMode from './editorType/dev/inspectMode';

/**
 * Fimga 插件模式
 *
 * figma
 *  - defaultMode
 * dev
 *  - inspectMode
 *  - codegenMode
 * figjam
 */
if (figma.editorType === 'figma') {
  // If the plugin is run in Figma design, edit the document
  defaultMode();
  // inspectMode();
  if (figma.mode === 'textreview') {
    // Running in text review mode
  }
} else if (figma.editorType === 'dev') {
  // Read the document and listen to API events
  if (figma.mode === 'inspect') {
    // Running in inspect panel mode
    inspectMode();
  } else if (figma.mode === 'codegen') {
    // Running in codegen mode
    codegenMode();
  }
} else if (figma.editorType === 'figjam') {
  // Do FigJam only operations
  if (figma.mode === 'textreview') {
    // Running in text review mode
  }
}
