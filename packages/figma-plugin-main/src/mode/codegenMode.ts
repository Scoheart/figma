import transformToHTML from "./handle/transformToHTML.js";

function codegenMode() {
  figma.codegen.on("generate", ({ language, node }: CodegenEvent) => {
    switch (language) {
      case "html":
        return transformToHTML(node);
      default:
        return [];
    }
  });
}

export default codegenMode;
