const { status } = require("wd/lib/commands")

describe('API TEST-1', () => {

    it('Get Users Details', () => {

        cy.request({
            method: 'GET',
            url: "https://gorest.co.in/public/v2/users",
            headers: {
                Authorization: "Bearer 253e55e13faab872ca99b8eca0bb5be3ca0bb2c13237cda59406aed6707be3de"
            }
        }).then((response) => {
            //cy.log(JSON.stringify(response))
            expect(response.status).to.equal(200)
        })
    })

    it('Get a Single User', () => {
        cy.request({
            method: 'GET',
            url: "https://gorest.co.in/public/v2/users/7528136",
            headers: {
                Authorization: "Bearer 253e55e13faab872ca99b8eca0bb5be3ca0bb2c13237cda59406aed6707be3de"
            }
        }).then((response) => {
            cy.log(JSON.stringify(response))
            expect(response.status).to.equal(200)
            expect(response.body.id).to.equal(7528136)
        })

    })

    it('Get / Invalid Endpoint', () => {
        cy.request({
            method: 'GET',
            url: "https://gorest.co.in/public/v2/user/7527478",     //the adress ==> /users/7527478
            headers: {
                Authorization: "Bearer 253e55e13faab872ca99b8eca0bb5be3ca0bb2c13237cda59406aed6707be3de"
            },
            failOnStatusCode: false  //this line is added for 400 or 500 series tests
        }).then((response) => {
            cy.log(JSON.stringify(response))
            //404 is expected response, but in the codes this part is not parsing since it failed,
            //to pass here, we should add "failOnStatusCode: false" in the cy.request() objects
            expect(response.status).to.equal(404)

        })

    })

    it('Get / Invalid User Id', () => {
        cy.request({
            method: 'GET',
            url: "https://gorest.co.in/public/v2/user/7524",     //the adress ==> /users/7527478
            headers: {
                Authorization: "Bearer 253e55e13faab872ca99b8eca0bb5be3ca0bb2c13237cda59406aed6707be3de"
            },
            failOnStatusCode: false  //this line is added for 400 or 500 series tests
        }).then((response) => {
            //404 is expected response, but in the codes this part is not parsing since it failed,
            //to pass here, we should add "failOnStatusCode: false" in the cy.request() objects
            expect(response.status).to.equal(404)
            cy.log(JSON.stringify(response))
        })

    })
})