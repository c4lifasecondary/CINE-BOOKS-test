describe('CINE-BOOKS regression suite', () => {
  beforeEach(() => {
    cy.viewport(1920, 1080);
    cy.visit('https://cine-books.com/');

    cy.get('#mounted-player').scrollIntoView();
    cy.get('.play-block-center__button').click();
    cy.intercept('**/vod/**').as('videos');
    cy.wait('@videos');
  });

  it('Check player subtitles', () => {
    let text1, text2;

    cy.get('#mounted-player').realHover('mouse');
    cy.get('.control button[class*=cn-webviewer-icon-pause]').click({ force: true });
    cy.get('.control button[class*=cn-webviewer-icon-next]').dblclick({ force: true });
    cy.get('#mounted-player').realHover('mouse');
    cy.get('.player-controls-container button[class*=cn-webviewer-icon-play]').click({ force: true });
    
    cy.get('.video_subtitles').should('be.visible');
    cy.get('.video_subtitles').then(x => {
      text1 = x.text();
    });
    cy.get('#mounted-player').realHover('mouse');
    cy.get('.control button[class*=cn-webviewer-icon-next]').click({ force: true });
    
    cy.wait(1500);
    
    cy.get('.video_subtitles').then(x => {

    if (x.is(':visible')) {
      cy.get('.video_subtitles').then(x => {
        text2 = x.text();
  
        expect(text1).not.be.equal(text2);
      });
    }
    });
    
    cy.get('#mounted-player').realHover('mouse');
    cy.get('.control button[class*=cn-webviewer-icon-subtitle-pressed]').click({ force: true });
    
    cy.get('.video_subtitles').should('not.be.visible');
  });

  it('Check resolution changing', () => {
    let link1, link2;

    cy.get('.video-player-wrapper video').invoke('prop', 'src').then(x => {
      link1 = x;
    });
    cy.get('#mounted-player').realHover('mouse');
    cy.get('.control button[class*=cn-webviewer-icon-settings]').click({ force: true });
    cy.contains(':nth-child(1)', 'Resolution').click({ force: true });
    cy.contains('1080').click({ force: true });
    cy.intercept('**/video/1080/**').as('videos1080');
    cy.wait('@videos1080');
    
    cy.get('#mounted-player').realHover('mouse');
    cy.get('.control button[class*=cn-webviewer-icon-settings]').click({ force: true });
    cy.contains(':nth-child(2)', '1080').then(x => {
      const quality = x.text().split(' ')[0];

      expect(quality).to.be.equal('1080');
    });
    cy.get('.video-player-wrapper video').invoke('prop', 'src').then(x => {
      link2 = x;

      expect(link1).not.be.equal(link2);
    });
  });
});