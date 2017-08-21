import { TDLevelDesignerPage } from './app.po';

describe('tdlevel-designer App', () => {
  let page: TDLevelDesignerPage;

  beforeEach(() => {
    page = new TDLevelDesignerPage();
  });

  it('should display message saying app works', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('app works!');
  });
});
