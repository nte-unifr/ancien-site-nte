/* Copyright (c) 2002-2007, Samuel Schluep, ETH Zurich and Infrae.
 * All rights reserved. See also LICENSE.txt
 *
 * This tooltip code is inspired by the JavaScript tooltip of webmaze
 * http://www.webmatze.de/webdesign/javascript/tooltips.htm
 *
 * 
 */

// the tooltip element
toolTipElement = null;
// the mouse coordinates relative to the document
x = 0;
y = 0;
// the coordinates of the tooltip's offset parent
offsetParentX = 0;
offsetParentY = 0;

document.onmousemove = updateToolTip;

function setToolTipPos(x, y) {
  // Ughhh... calculating spacing for incompatible browsers
  var innerWidth, innerHeight, xOffset, yOffset;
  if (window.innerHeight) {
    // all except IE
    innerWidth = window.innerWidth - 25;
    innerHeight = window.innerHeight - 25;
    xOffset = window.pageXOffset;
    yOffset = window.pageYOffset;
  } else if (document.documentElement && document.documentElement.clientHeight) {
    // IE 6 strict mode
    innerWidth = document.documentElement.clientWidth - 6;
    innerHeight = document.documentElement.clientHeight - 6;
    xOffset = document.documentElement.scrollLeft;
    yOffset = document.documentElement.scrollTop;
  } else if (document.body) {
    // other IE
    innerWidth = document.documentElement.clientWidth - 6;
    innerHeight = document.documentElement.clientHeigth - 6;
    xOffset = document.body.scrollLeft;
    yOffset = document.body.scrollTop;
  }
  var left = xOffset;
  var right = xOffset + innerWidth;
  var top = yOffset;
  var bottom = yOffset + innerHeight;
  var toolTipWidth = toolTipElement.offsetWidth;
  var toolTipHeight = toolTipElement.offsetHeight;
  var pOffset = 20;
  // adjust right side
  var dRight = right - (x + pOffset + toolTipWidth);
  x = (dRight >= 0) ? x + pOffset : x + pOffset + dRight;
  // adjust left side
  if (x < left) {
    toolTipElement.style.width = toolTipWidth - (left - x) + 'px';
    x = left;
  }
  // adjust vertical space
  var dBelow = bottom - (y + pOffset + toolTipHeight);
  var dAbove = (y - pOffset - toolTipHeight) - top;
  y = (dBelow < 0 && dAbove > 0) ? y - pOffset - toolTipHeight : y + pOffset;
  // set tooltip position
  toolTipElement.style.left = x - offsetParentX + 'px';
  toolTipElement.style.top = y - offsetParentY + 'px';
}

function updateToolTip(e) {
  // get mouse position relative to the document
  // see: http://www.quirksmode.org/js/events_properties.html
  if (!e) var e = window.event;
  if (e.pageX || e.pageY) {
    // all except IE
    x = e.pageX;
    y = e.pageY;
  }
  else if (e.clientX || e.clientY) {
    // IE
    x = e.clientX + document.body.scrollLeft
                  + document.documentElement.scrollLeft;
    y = e.clientY + document.body.scrollTop
                  + document.documentElement.scrollTop;
  }
  // set tooltip position
  if (toolTipElement != null) {
    setToolTipPos(x, y);
  }
}

function showToolTip(id) {
  // show tooltip
  toolTipElement = document.getElementById(id);
  toolTipElement.style.display = "block";
  // calculate offset parent position
  setOffsetParentPos();
  // set tooltip position
  setToolTipPos(x, y);
}

function hideToolTip() {
  // hide tooltip again
  toolTipElement.style.display = "none";
  toolTipElement = null;
}

function setOffsetParentPos() {
  // positioning with left and top is relative to a offest parent element.
  // calculate the position of the offset parent for positioning relative
  // to the document. see http://www.quirksmode.org/js/findpos.html
  var obj = toolTipElement;
  var left = 0;
  var top = 0;
  while (obj = obj.offsetParent) {
    left += obj.offsetLeft;
    top += obj.offsetTop;
  }
  offsetParentX = left;
  offsetParentY = top;
}
