// ==UserScript==
// @name     HackerNews rice
// @version  1
// @grant    none
// @include https://news.ycombinator.com/*
// ==/UserScript==

type NodeOperationFn = (node: Element | HTMLElement) => void;

const selectElement = (query: string) => document.querySelectorAll(query); 

const processNodes = (nodeList: NodeListOf<Element | HTMLElement>, fn: NodeOperationFn | NodeOperationFn[]) => {
  if (Array.isArray(fn)) { 
    fn.forEach((f) => { 
      for (let i = 0; i < nodeList.length; i++) {
        f(nodeList[i]);
      }
    })
  } else {
    for (let i = 0; i < nodeList.length; i++) {
      fn(nodeList[i]);
    }
  }
}

const updateStyle = (property: any, value: string) => { 
  return (node: HTMLElement) => node.style[property] = value;
}

processNodes(selectElement('#hnmain'), updateStyle('width', '50%'));
processNodes(selectElement('.comment'), updateStyle('fontSize', '12pt'));
processNodes(selectElement('.hnuser'), updateStyle('fontWeight', 'bold'));
processNodes(selectElement('.spacer'), updateStyle('height', '12px'));
processNodes(selectElement('.titlelink'), updateStyle('fontSize', '12pt'));
processNodes(selectElement('.score'), updateStyle('color', '#ff6600'));
processNodes(selectElement('.subtext'), updateStyle('fontSize', '9pt'));
