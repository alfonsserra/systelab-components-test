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
## Improving and publishing the library

Once you get your improvements merged, you will need an authorised user in order to publish it. Having the new version updated in the package.json file, you'll neeed to execute the following commands:
```bash 
npm login 
# Here you will enter your credentials
npm publish
```

## Using the library

### Create your Page Object

For every page object create a new class by extending BasePage. Call the super constructor with the selector as a parameter.

```typescript
export class MainPage extends BasePage {

	constructor() {
		super('my-selector');
	}
```

In the Page Object, create methods to access the different widgets that can be directly found in the page. Some available widgets are:
Button, ComboBox, ContextMenu, Datepicker, Grid, Icon, InputField, Label, MesssagePopup, Popup, Dialog, Tab, Tabs

For example:

```typescript
	public getAllergyGrid(): Grid {
		return new Grid(this.current.element(by.id('AllergyTable')));
	}
```
Use the appropriate locator in order to get the right ElementFinder.

Dialogs are considered widgets an not page objects, therefore, for each one, you will have to create a class extending Dialog and in that class create methods to access the different widgets that can be directly found in the dialog.

For example:

```typescript
	public getAllergyDetailDialog(): AllergyDetailDialog {
		return new AllergyDetailDialog(element(by.tagName('allergy-dialog')));
	}
```

And the class implementing the dialog will be something like:

```typescript
export class AllergyDetailDialog extends Dialog {

	public getEnableSwitch() {
		return this.byId('AllergyEnableSwitch').element(by.tagname('input'));
	}
...
```


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

### Allure

In order to document test cases we suggest to use Allure.

With allure the test cases will look like the following example:

```typescript
await allure.createStep(`Action: Set a valid username and password`, async () => {
			await LoginActionService.login(loginPage);
		})();
```

If documentation for an expectatio is needed, use the convenient function called *because*, 
that can be combined with the normal expect function to avoid the need of an inner function for Allure. 

Using the function, the test case will look like the above example.

```typescript
	await because('The logged user is Administrator').expect(await mainPage.getFullUsernameField().getText()).toEqual('Administrator');

```

For more information, please read the documentation at [Allure reporter](https://github.com/systelab/allure-reporter)

### Experimental

Included in the library, there is a decorator and a method that can be used in order to simplify common checks on the widgets.

The idea is to annotate the methods that get specific widgets to test with the @TestAttribute decorator

```typescript
	@TestAttribute({type: AttributeType.Text, visible: true, enable: true, mandatory: true, length: 20, name: 'name'})
	public getNameInput(): InputField {
		return new InputField(this.byId('PatientNameInput'));
	}
```

Once you have all the widgets to test with the proper decorator, in your test you can check the attributes with the method check in the service TestAttributesService:

```typescript
	public static async check(dialog: Widget | BasePage) {
```

For example:

```typescript
	it(`Check patient dialog`, async () => {
		await patientMaintenanceDialog.getButtonAdd().click();
		await TestAttributesService.check(patientDialog)
		await patientDialog.getButtonClose().click();
	});
```

## Useful Links

- [Good practices](http://criticaltester.com/test-processes/automated-testing/protractor-good-practices/) specially how to run tests in parallel.
- [Best practices](https://www.logigear.com/blog/test-automation/15-best-practices-for-building-an-awesome-protractor-framework/)
- [Testing Angular](https://livebook.manning.com/book/testing-angular-applications/chapter-9/64) 
- [Large scale Angular testing with Protractor](https://www.youtube.com/watch?v=ympTE-bLYaU
) by Andres Dominguez
