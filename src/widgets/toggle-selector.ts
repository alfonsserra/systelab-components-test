import { Widget } from './widget';
import { by, ElementArrayFinder } from 'protractor';

export interface ToggleSelectorOption {
  id: string;
  caption: string;
}

export class ToggleSelector extends Widget {
  private static idPrefix = 'id';

  public async selectOptionByText(optionText: string): Promise<void> {
    await this.elem.element(by.cssContainingText('.slab-option', optionText)).click();
  }

  public async selectOptionById(optionId: string): Promise<void> {
    await this.getElement()
      .element(by.id(ToggleSelector.idPrefix + optionId))
      .click();
  }

  public async getSelectedOption(): Promise<string> {
    return this.elem.element(by.className('slab-option slab-selected ng-star-inserted')).getText();
  }

  public async getOptions(): Promise<ToggleSelectorOption[]> {
    const optionArray: ToggleSelectorOption[] = [];
    const options: ElementArrayFinder = this.elem.all(by.css("div[class*='slab-option']"));
    const numberOfOptions: number = await options.count();
    for (let i = 0; i < numberOfOptions; i++) {
      const id: string = (await options.get(i).getAttribute('id')).slice(ToggleSelector.idPrefix.length);
      const caption: string = await options.get(i).getText();
      const option: ToggleSelectorOption = {
        id: id,
        caption: caption,
      };
      optionArray.push(option);
    }
    return optionArray;
  }
}
