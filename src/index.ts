// ==UserScript==
// @name     HackerNews rice
// @version  1
// @grant    none
// @include https://news.ycombinator.com/*
// ==/UserScript==

type NodeOperationFn = (node: Element | HTMLElement) => void;

const selectElement = (query: string) => document.querySelectorAll(query);

const processNodes = (
  nodeList: NodeListOf<Element | HTMLElement>,
  fn: NodeOperationFn | NodeOperationFn[]
) => {
  if (Array.isArray(fn)) {
    fn.forEach((f) => {
      for (let i = 0; i < nodeList.length; i++) {
        f(nodeList[i]);
      }
    });
  } else {
    for (let i = 0; i < nodeList.length; i++) {
      fn(nodeList[i]);
    }
  }
};

const updateStyle = (property: any, value: string) => {
  return (node: HTMLElement) => (node.style[property] = value);
};

const changes = [
  {
    element: '#hnmain',
    changes: [
      updateStyle('width', '50%'),
      updateStyle('backgroundColor', '#fff'),
    ],
  },
  { element: '.comment', changes: updateStyle('fontSize', '12pt') },
  { element: '.hnuser', changes: updateStyle('fontStyle', 'italic') },
  { element: '.spacer', changes: updateStyle('height', '12px') },
  { element: '.titlelink', changes: updateStyle('fontSize', '12pt') },
  { element: '.score', changes: updateStyle('color', '#ff6600') },
  { element: '.subtext', changes: updateStyle('fontSize', '9pt') },
];

changes.forEach((c) => processNodes(selectElement(c.element), c.changes));

Array.from(document.querySelectorAll('[href]'))
  .filter(
    (node) =>
      /item\?id\=/.test(node.getAttribute('href')) &&
      (/\d+\scomments?/.test(node.textContent) ||
        /discuss/.test(node.textContent))
  )
  .forEach(updateStyle('fontWeight', 'bold'));
