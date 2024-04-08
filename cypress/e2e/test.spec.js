describe('Web elements validation test cases', () => {

  beforeEach('Visit web page and accept cookie', () => {

    cy.visit('/')
    cy.get('#acceptPirukas').click();

  })

  it('Should select client type radio button', () => {

    cy.contains('div', 'Soovin liisingut').find('[type="radio"]').then(radioButtons => {
      cy.wrap(radioButtons).eq(0).check().should('be.checked')
      cy.wrap(radioButtons).eq(1).check().should('be.checked')
      cy.wrap(radioButtons).eq(0).should('not.be.checked')

    })
  
  })

  it('Should select loan type radio button', () => {

    cy.contains('div', 'Liisingu tüüp').find('[type="radio"]').then(radioButtons => {
      cy.wrap(radioButtons).eq(0).check().should('be.checked')
      cy.wrap(radioButtons).eq(1).check().should('be.checked')
      cy.wrap(radioButtons).eq(0).should('not.be.checked')

    })

  })

  it('Vat_included checkbox should be checkable', () => {

    cy.contains('div', 'Soovin liisingut').find('[type="radio"]').then(radioButtons => {
      cy.wrap(radioButtons).eq(1).check().should('be.checked')

  })

    cy.get('[type="checkbox"][id="vat_included"]').check({force: true}).should('be.checked')
    cy.get('[type="checkbox"][id="vat_included"]').uncheck({force: true}).should('not.be.checked')

})  

  it('Price input validation', () => {

    cy.get('[type="text"][id="price"]').clear()
      .should('be.empty')
      .type(8000)
      .should('have.value', '8000')

  })

  it('Down payment input validation with car price 15000', () => {

    cy.get('[type="text"][id="initial_percentage"]').clear()
    .should('be.empty')
    .type(20)
    .should('have.value', '20') 
  cy.get('[type="text"][id="initial"]').should('have.value', '3000')

  cy.get('[type="text"][id="initial"]').clear()
    .should('be.empty')
    .type(3000)
    .should('have.value', '3000') 
  cy.get('[type="text"][id="initial_percentage"]').should('have.value', '20')

  })

  it('Validate interest rate input field', () => {

    cy.get('[type="text"][id="interest_rate"]').clear()
    .should('be.empty')
    .type(3)
    .should('have.value', '3') 

  })

  it('Residual value input validation with car price 15000', () => {

    cy.get('[type="text"][id="reminder_percentage"]').clear()
      .should('be.empty')
      .type(20)
      .should('have.value', '20')
    cy.get('[type="text"][id="reminder"]').should('have.value', '3000')

    cy.get('[type="text"][id="reminder"]').clear()
      .should('be.empty')
      .type(3000)
      .should('have.value', '3000')  
      cy.get('[type="text"][id="reminder_percentage"]').should('have.value', '20')

  })

  it('Validate the dropdown option selection', () => {

    cy.get('select[name="years"]').select('3').should('have.value', '36')
    cy.get('select[name="months"]').select('3').should('have.value', '3')

  })

  it('Validate payment schedule button', () => {

    cy.get('.payment-graph-link').should('be.visible').and('have.attr', 'href');

  })

})

describe('Boundary value test cases', () => {

  beforeEach('Visit web page and accept cookie', () => {

    cy.visit('/')
    cy.get('#acceptPirukas').click()

  })

  it('Monthly payment calculation with invalid vehicle price', () => {

    cy.get('[type="text"][id="price"]').clear()
      .type(3000)
    cy.contains('.error-message', 'Sõiduki hind peab olema vähemalt 7500€.').should('be.visible')

  })

  it('Monthly payment calculation with the smallest allowed price', () => {

    cy.get('[type="text"][id="price"]').clear()
      .type(7500)
    cy.get('.error-message').should('not.exist')

  })

  it('Monthly payment calculation with first invalid vehicle price', () => {

    cy.get('[type="text"][id="price"]').clear()
      .type(7499)
    cy.contains('.error-message', 'Sõiduki hind peab olema vähemalt 7500€.').should('be.visible')

  })

  it('Monthly payment calculation when vehicle price is 0', () => {

    cy.get('[type="text"][id="price"]').clear()
      .type(0)
    cy.contains('.error-message', 'Sõiduki hind peab olema vähemalt 7500€.').should('be.visible')

  })

  it('Monthly payment calculation when vehicle price value is negative', () => {

    cy.get('[type="text"][id="price"]').clear()
      .type(-7500)
    cy.contains('.error-message', 'Sõiduki hind peab olema vähemalt 7500€.').should('be.visible')

  })

  it('Monthly payment calculation with 0% down payment', () => {

    cy.get('[type="text"][id="initial_percentage"]').clear()
      .type(0)
    cy.contains('.error-message', 'Sõiduki sissemakse peab olema vähemalt 10%.').should('be.visible')

  })

  it('Monthly payment calculation with 5% down payment', () => {

    cy.get('[type="text"][id="initial_percentage"]').clear()
      .type(5)
    cy.contains('.error-message', 'Sõiduki sissemakse peab olema vähemalt 10%.').should('be.visible')

  })

  it('Monthly payment calculation with 100% down payment', () => {

    cy.get('[type="text"][id="initial_percentage"]').clear()
      .type(100)
    cy.contains('.error-message', 'Finantseeritav summa peab olema vähemalt 5000€.').should('be.visible')

  })

  it('Monthly payment calculation with 0 months leasing period', () => {

    cy.get('select[name="years"]').select('0').should('have.value', '0')
    cy.get('select[name="months"]').select('0').should('have.value', '0')
    cy.contains('.error-message', 'Liisinguperiood peab olema vahemikus 6 kuud kuni 7 aastat.').should('be.visible')

  })

  it('Monthly payment calculation with 3 months leasing period', () => {

    cy.get('select[name="years"]').select('0').should('have.value', '0')
    cy.get('select[name="months"]').select('3').should('have.value', '3')
    cy.contains('.error-message', 'Liisinguperiood peab olema vahemikus 6 kuud kuni 7 aastat.').should('be.visible')

  })

  it('Monthly payment calculation with 6 months leasing period', () => {

    cy.get('select[name="years"]').select('0').should('have.value', '0')
    cy.get('select[name="months"]').select('6').should('have.value', '6')
    cy.get('.error-message').should('not.exist')

  })

  it('Monthly payment calculation with 7 years leasing period', () => {

    cy.get('select[name="years"]').select('7').should('have.value', '84')

  })

  it('Monthly payment calculation with 7 years and 1 month leasing period', () => {

    cy.get('select[name="years"]').select('7').should('have.value', '84')
    cy.get('select[name="months"]').should('not.have.value', '1')

  })

})

describe('Functional test cases about monthly payment', () => {

  beforeEach('Visit web page and accept cookie', () => {

    cy.visit('/')
    cy.get('#acceptPirukas').click()

  })

  it('Monthly payment calculation with correct values', () => {

    cy.contains('div', 'Soovin liisingut').find('[type="radio"]').then(radioButtons => {
      cy.wrap(radioButtons).eq(1).check()
    })

    cy.contains('div', 'Liisingu tüüp').find('[type="radio"]').then(radioButtons => {
      cy.wrap(radioButtons).eq(1).check()
    })

    cy.get('[type="text"][id="price"]').clear()
      .type(25000)

    cy.get('[type="text"][id="initial_percentage"]').clear()
      .type(50)
 
    cy.get('select[name="years"]').select('3')
    cy.get('select[name="months"]').select('3')

    cy.get('[type="text"][id="interest_rate"]').clear()
      .type(6)

    cy.get('[type="text"][id="reminder_percentage"]').clear()
      .type(20)

    cy.get('a.btn.btn-dark').contains('Taotle liisingut').click()

    cy.contains('.success-message', 'Liisingutaotlus on edukalt esitatud.').should('be.visible')
    
  })

  it('Monthly payment calculation when financed amount is less than 5000€', () => {

    cy.get('[type="text"][id="initial_percentage"]').clear()
      .type(80)
    cy.contains('.error-message', 'Finantseeritav summa peab olema vähemalt 5000€.').should('be.visible')

  })

  it('Monthly instalment change after increasing initial percentage', () => {

    let previousPayment;
    let newPayment;

    cy.get('[type="text"][id="initial_percentage"]').clear()
    .type(10)

    cy.get('.payment').invoke('text').then((currentPaymentText) => {
      previousPayment = parseFloat(currentPaymentText.replace(',', ''))

      cy.get('[type="text"][id="initial_percentage"]').clear()
        .type(30)

      cy.get('.payment').invoke('text').then((currentPaymentText) => {
        newPayment = parseFloat(currentPaymentText.replace(',', ''))

        expect(newPayment).to.be.lessThan(previousPayment)
      })

    })

  })

  it('Monthly instalment change after decreasing initial percentage', () => {

    let previousPayment;
    let newPayment;

    cy.get('[type="text"][id="initial_percentage"]').clear()
    .type(30)

    cy.get('.payment').invoke('text').then((currentPaymentText) => {
      previousPayment = parseFloat(currentPaymentText.replace(',', ''))

      cy.get('[type="text"][id="initial_percentage"]').clear()
        .type(20)

      cy.get('.payment').invoke('text').then((currentPaymentText) => {
        newPayment = parseFloat(currentPaymentText.replace(',', ''))

        expect(newPayment).to.be.greaterThan(previousPayment)
      })

    })

  })

})

describe('Max loan test cases', () => {

  beforeEach('Visit web page and accept cookie', () => {

    cy.visit('/')
    cy.get('#acceptPirukas').click();

  })

  it('max loan with correct value', () => {

    cy.get('[href="#max-payment"]').click()
    cy.get('input[name="monthly-income"]').clear()
      .should('be.empty')
      .type(5000)
      .should('have.value', '5000')
    cy.get('.error-message').should('not.exist')

  })

  it('max loan with incorrect value', () => {

    cy.get('[href="#max-payment"]').click()
    cy.get('input[name="monthly-income"]').clear()
      .should('be.empty')
      .type(500)
      .should('have.value', '500')
  
    cy.contains('.calculator-error', 'Maksimaalse kuumakse arvutamiseks on netosissetulek liiga väike.').should('be.visible')

  })

})