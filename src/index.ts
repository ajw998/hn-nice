// ==UserScript==
// @name     HackerNews rice
// @version  1
// @grant    none
// @include https://news.ycombinator.com/*
// ==/UserScript==

type NodeOperationFn = (node: Element | HTMLElement) => void;

type NodeFilterFn = (node: Element | HTMLElement) => boolean;

interface ProcessNodesOptions {
  filter?: NodeFilterFn;
}

const selectElement = (query: string): NodeListOf<Element | HTMLElement> =>
  document.querySelectorAll(query);

const processNodes = (
  nodeList: NodeListOf<Element | HTMLElement>,
  fn: NodeOperationFn | NodeOperationFn[],
  options?: ProcessNodesOptions
) => {
  if (nodeList.length !== 0) {
    const nodes =
      options && options.filter
        ? Array.from(nodeList).filter(options.filter)
        : Array.from(nodeList);

    if (Array.isArray(fn)) {
      fn.forEach((f) => {
        nodes.forEach(f);
      });
    } else {
      nodes.forEach(fn);
    }
  }
};

const updateStyle = (property: any, value: string) => {
  return (node: HTMLElement) => (node.style[property] = value);
};

const addInteraction = (event, fn: (node: HTMLElement) => void) => {
  return (node: HTMLElement) => node.addEventListener(event, (_) => fn(node));
};

const changes = [
  {
    element: "#hnmain",
    changes: [
      updateStyle("width", "50%"),
      updateStyle("backgroundColor", "#fff"),
    ],
  },
  { element: ".comment", changes: updateStyle("fontSize", "12pt") },
  { element: ".hnuser", changes: updateStyle("fontStyle", "italic") },
  { element: ".spacer", changes: updateStyle("height", "20px") },
  { element: ".titlelink", changes: updateStyle("fontSize", "12pt") },
  { element: ".score", changes: updateStyle("color", "#ff6600") },
  { element: ".subtext", changes: updateStyle("fontSize", "9pt") },
  // Add background colour on hover
  {
    element: ".default",
    changes: [
      addInteraction("mouseover", updateStyle("backgroundColor", "#ededed")),
      addInteraction("mouseleave", updateStyle("backgroundColor", "#fff")),
    ],
  },
  {
    element: "[href]",
    changes: [updateStyle("fontWeight", "bold")],
    options: {
      filter: (node: Element) =>
        /item\?id\=/.test(node.getAttribute("href")) &&
        (/\d+\scomments?/.test(node.textContent) ||
          /discuss/.test(node.textContent)),
    },
  },
];

changes.forEach((c) =>
  processNodes(selectElement(c.element), c.changes, c.options)
);
