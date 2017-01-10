import { TravelPostPage } from './app.po';

describe('travel-post App', function() {
  let page: TravelPostPage;

  beforeEach(() => {
    page = new TravelPostPage();
  });

  it('should display message saying app works', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('app works!');
  });
});
