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

## Do your test

### Create your Page Object

For every page object create a new class by extending BasePage. Call the super constructor with the selector as a parameter.

```typescript
export class MainPage extends BasePage {

	constructor() {
		super('my-selector');
	}
```

Create methods to access the different widgets that can be directly found in the page. The available widgets are:

- Button
- ComboBox
- ContextMenu
- Datepicker
- Grid
- Icon
- InputField
- Label
- MesssagePopup
- Popup
- SystelabDialog
- Tab
- Tabs

For example

```typescript
	public getAllergyGrid(): Grid {
		return new Grid(this.current.element(by.id('AllergyTable')));
	}
```

Use the appropriate locator in order to get the right ElementFinder.

### Create your Test spec

In your spec files, use the needed page objects and access to the widgets through the methods defined. 
Interact with the widgets with the methods provided by the library. 

For example:

```typescript
it(`Should be able to do something`, async () => {
        const patientMaintenanceDialog = await mainPage.getPatientMaintenanceDialog();
		await patientMaintenanceDialog.getButtonAdd().click();
		const patientDialog = await patientMaintenanceDialog.getPatientDialog();
		await patientDialog.getTabs().selectTab(1);
	});
```

## Links

- [Good practices](http://criticaltester.com/test-processes/automated-testing/protractor-good-practices/) specially how to run tests in parallel.
- [Best practices](https://www.logigear.com/blog/test-automation/15-best-practices-for-building-an-awesome-protractor-framework/)
- [Testing Angular](https://livebook.manning.com/book/testing-angular-applications/chapter-9/64) 
- [Large scale Angular testing with Protractor](https://www.youtube.com/watch?v=ympTE-bLYaU
) by Andres Dominguez
