[![Codacy Badge](https://api.codacy.com/project/badge/Grade/83129b70f2e6402ea33d4b43e4c207ae)](https://app.codacy.com/app/alfonsserra/systelab-components-test?utm_source=github.com&utm_medium=referral&utm_content=systelab/systelab-components-test&utm_campaign=badger)
[![Build Status](https://travis-ci.org/systelab/systelab-components-test.svg?branch=master)](https://travis-ci.org/systelab/systelab-components-test)
[![codecov](https://codecov.io/gh/systelab/systelab-components-test/branch/master/graph/badge.svg)](https://codecov.io/gh/systelab/systelab-components-test)
[![npm version](https://badge.fury.io/js/systelab-components-test.svg)](https://badge.fury.io/js/systelab-components-test)
[![Known Vulnerabilities](https://snyk.io/test/github/systelab/systelab-components-test/badge.svg?targetFile=package.json)](https://snyk.io/test/github/systelab/systelab-components-test?targetFile=package.json)

# systelab-components-test

Library with test tools for [systelab-components](https://github.com/systelab/systelab-components) based applications.

## Installing the library

```bash
npm install systelab-components-test --save
```

## Working with the repo


```bash
git clone https://github.com/systelab/systelab-components-test.git
cd systelab-components-test
npm install
```

## Protractor Locators (Selectors)

The most used:

```
$('#some-id')
```

or

```
element(by.id('some-id'))
```

The $ is not a jQuery selector, but a shorthanded version of element(by.css('#some-id')). In this fashion, we’d be able to select elements by id, class and attributes:

```
$('.some-class')             // element(by.className())
$('tag-name')                // element(by.tagName())
$('[ng-message=required]')   // remember to leave out the double quotes around the value of attribute
$('#parent #child')          // select one child inside parent
$('ul li')                   // select all children inside parent
$('ul li').first()           // select first of children
$('ul li').last()            // select last of children
$('ul li').get(index)        // select index-th of children
```

Then we get the more interesting ones:

```
element(by.model('data'));
element(by.repeater('cat in pets'));
element(by.options('c for c in colors'))
element(by.binding('value'));           // only look through the elements with ng-binding attribute
element(by.buttonText('Save'));         // the whole of button text
element(by.partialButtonText('Save'));  // part of button text
element(by.cssContainingText('.pet', 'Dog')) // for selecting this: <li class="pet">Dog</li>
element(by.deepCss('span'))             // for selecting all level of spans <span><span>x</span></span>
```
