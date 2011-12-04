/**
 * Copyright 2009 Google Inc.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *      http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS-IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */


function isNodeText(node)
{
  return (node.nodeType == 3);
}

function object(o)
{
  var f = function()
    {};
  f.prototype = o;
  return new f();
}

function extend(obj, props)
{
  for (var p in props)
  {
    obj[p] = props[p];
  }
  return obj;
}

function forEach(array, func)
{
  for (var i = 0; i < array.length; i++)
  {
    var result = func(array[i], i);
    if (result) break;
  }
}

function map(array, func)
{
  var result = [];
  // must remain compatible with "arguments" pseudo-array
  for (var i = 0; i < array.length; i++)
  {
    if (func) result.push(func(array[i], i));
    else result.push(array[i]);
  }
  return result;
}

function filter(array, func)
{
  var result = [];
  // must remain compatible with "arguments" pseudo-array
  for (var i = 0; i < array.length; i++)
  {
    if (func(array[i], i)) result.push(array[i]);
  }
  return result;
}

function isArray(testObject)
{
  return testObject && typeof testObject === 'object' && !(testObject.propertyIsEnumerable('length')) && typeof testObject.length === 'number';
}

if (typeof exports !== "undefined")
{
  userAgent = "node-js";
}
else
{
  userAgent = navigator.userAgent.toLowerCase();
}
// Figure out what browser is being used (stolen from jquery 1.2.1)
var browser = {
  version: (userAgent.match(/.+(?:rv|it|ra|ie)[\/: ]([\d.]+)/) || [])[1],
  safari: /webkit/.test(userAgent),
  opera: /opera/.test(userAgent),
  msie: /msie/.test(userAgent) && !/opera/.test(userAgent),
  mozilla: /mozilla/.test(userAgent) && !/(compatible|webkit)/.test(userAgent),
  windows: /windows/.test(userAgent) // dgreensp
};


function getAssoc(obj, name)
{
  return obj["_magicdom_" + name];
}

function setAssoc(obj, name, value)
{
  // note that in IE designMode, properties of a node can get
  // copied to new nodes that are spawned during editing; also,
  // properties representable in HTML text can survive copy-and-paste
  obj["_magicdom_" + name] = value;
}

// "func" is a function over 0..(numItems-1) that is monotonically
// "increasing" with index (false, then true).  Finds the boundary
// between false and true, a number between 0 and numItems inclusive.


function binarySearch(numItems, func)
{
  if (numItems < 1) return 0;
  if (func(0)) return 0;
  if (!func(numItems - 1)) return numItems;
  var low = 0; // func(low) is always false
  var high = numItems - 1; // func(high) is always true
  while ((high - low) > 1)
  {
    var x = Math.floor((low + high) / 2); // x != low, x != high
    if (func(x)) high = x;
    else low = x;
  }
  return high;
}

function binarySearchInfinite(expectedLength, func)
{
  var i = 0;
  while (!func(i)) i += expectedLength;
  return binarySearch(i, func);
}

function htmlPrettyEscape(str)
{
  return str.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/\r?\n/g, '\\n');
}

if (typeof exports !== "undefined")
{
  exports.map = map;
}