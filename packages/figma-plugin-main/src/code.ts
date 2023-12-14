import defaultMode from "./mode/defaultMode.js";
import inspectMode from "./mode/inspectMode.js";
import codegenMode from "./mode/codegenMode.js";

// if (figma.editorType === "figma" && figma.mode === "default") {
//   defaultMode();
// } else if (figma.editorType === "dev") {
//   switch (figma.mode) {
//     case "inspect":
//       inspectMode();
//     case "codegen":
//       codegenMode();
//   }
// }

if (figma.editorType === "dev") {
  // Read the document and listen to API events
  if (figma.mode === "inspect") {
    // Running in inspect panel mode
    inspectMode();
  } else if (figma.mode === "codegen") {
    // Running in codegen mode
    codegenMode();
  }
} else if (figma.editorType === "figma") {
  // If the plugin is run in Figma design, edit the document
  inspectMode();
  if (figma.mode === "textreview") {
    // Running in text review mode
  }
} else if (figma.editorType === "figjam") {
  // Do FigJam only operations
  if (figma.mode === "textreview") {
    // Running in text review mode
  }
}
