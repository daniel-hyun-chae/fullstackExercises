describe('Blog app', function() {
  beforeEach(function(){
    cy.request('POST', 'http://localhost:3003/api/testing/reset')
    cy.request('POST', 'http://localhost:3003/api/users', {
      username: 'test-user',
      name: 'test-user',
      password: 'test-password'
    })
    cy.visit('http://localhost:3000')
  })

  it('Login form is shown', function() {
    cy.getBySel('loginForm').should('exist')
  })

  describe('Login', function(){
    it('suceeds with correct credentials', function() {
      cy.getBySel('username').type('test-user')
      cy.getBySel('password').type('test-password')
      cy.getBySel('login-button').click()
      cy.contains('test-user logged in')
    })

    it('fails with wrong credentials', function() {
      cy.getBySel('username').type('test-user')
      cy.getBySel('password').type('wrong-password')
      cy.getBySel('login-button').click()

      cy.get('.error')
        .should('contain', 'wrong username or password')
        .and('have.css', 'color', 'rgb(255, 0, 0)')
        .and('have.css', 'border-style', 'solid')

      cy.get('html').should('not.contain', 'test-user logged in')
    })
  })

  describe('When logged in', function() {
    beforeEach(function(){
      cy.login({ username: 'test-user', password: 'test-password' })
    })

    it('A blog can be created', function() {
      cy.contains('Create new blog').click()
      cy.getBySel('title').type('test-blog-1')
      cy.getBySel('author').type('test-author-1')
      cy.getBySel('url').type('http://www.test-url.com')
      cy.getBySel('submitButton').click()
      cy.get('.notification').should('contain', 'A new blog test-blog-1 by test-author-1 added')
      cy.getBySel('blogItem').should('contain', 'test-blog-1 test-author-1')
    })

    describe('When a blog exist', function() {
      beforeEach(function(){
        cy.createBlog({
          title: 'test-title-1',
          author: 'test-author-1',
          url: 'http://www.test-url.com'
        })
      })
      it('users can like a blog', function() {
        cy.getBySel('blogItem').contains('test-title-1').parent().as('theBlogItem')
        cy.get('@theBlogItem').find('[data-test=blogItem-detailButton]').click()
        cy.get('@theBlogItem').find('[data-test=blogItem-detail-likes]').should('contain', '0')
        cy.get('@theBlogItem').find('[data-test=blogItem-detail-likeButton]').click()
        cy.get('@theBlogItem').find('[data-test=blogItem-detail-likes]').should('contain', '1')
      })
    })

    describe('When multiple blogs exist', function() {
      beforeEach(function(){
        cy.createBlog({
          title: 'test-title-1',
          author: 'test-author-1',
          url: 'http://www.test-url.com'
        })
        cy.createBlog({
          title: 'test-title-2',
          author: 'test-author-2',
          url: 'http://www.test-url2.com'
        })
        cy.createBlog({
          title: 'test-title-3',
          author: 'test-author-3',
          url: 'http://www.test-url3.com'
        })
      })

      it.only('blogs are ordered according to likes', function() {
        cy.getBySel('blogItem').contains('test-title-1').parent().as('theBlogItem1')
        cy.getBySel('blogItem').contains('test-title-2').parent().as('theBlogItem2')
        cy.getBySel('blogItem').contains('test-title-3').parent().as('theBlogItem3')
        cy.get('@theBlogItem1').find('[data-test=blogItem-detailButton]').click()
        cy.get('@theBlogItem2').find('[data-test=blogItem-detailButton]').click()
        cy.get('@theBlogItem3').find('[data-test=blogItem-detailButton]').click()
        cy.get('@theBlogItem1').find('[data-test=blogItem-detail-likeButton]').as('theBlogItem1-likeButton')
        cy.get('@theBlogItem2').find('[data-test=blogItem-detail-likeButton]').as('theBlogItem2-likeButton')
        cy.get('@theBlogItem3').find('[data-test=blogItem-detail-likeButton]').as('theBlogItem3-likeButton')
        cy.get('@theBlogItem1-likeButton').click().wait(150)
        cy.get('@theBlogItem2-likeButton').click().wait(150)
        cy.get('@theBlogItem1-likeButton').click().wait(150)

        cy.getBySel('blogItem-detail-likes').each((like, index) => {
          const expected = ['2', '1', '0']
          cy.wrap(like).should('contain', expected[index])
        })

        cy.get('@theBlogItem3-likeButton').click().wait(150)
        cy.get('@theBlogItem3-likeButton').click().wait(150)
        cy.get('@theBlogItem3-likeButton').click().wait(150)

        cy.getBySel('blogItem-detail-likes').each((like, index) => {
          const expected = ['3', '2', '1']
          cy.wrap(like).should('contain', expected[index])
        })
      })
    })
  })
})