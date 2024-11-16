import bodyData from "../config/payload.json"
import bodyPut from "../fixtures/put.json"

describe('API TEST-E2E Flow (POST-PUT-GET)', () => {

    function randomEmailGeneration() {
        const randomString = Math.random().toString(36).substring(2, 10)
        const email = randomString + "@email.com"
        return email
    }

    it('POST Users Details', () => {
        bodyData.email = randomEmailGeneration()

        cy.request({
            method: 'POST',
            url: 'https://gorest.co.in/public/v2/users',
            headers: {
                Authorization: "Bearer 253e55e13faab872ca99b8eca0bb5be3ca0bb2c13237cda59406aed6707be3de"
            },
            body: bodyData
        }).then((response) => {
            let id = response.body.id;
            cy.log(JSON.stringify(response.body.id))
            expect(response.status).to.equal(201)
            cy.request({
                method: "PUT",
                url: 'https://gorest.co.in/public/v2/users/' + id,
                headers: {
                    Authorization: "Bearer 253e55e13faab872ca99b8eca0bb5be3ca0bb2c13237cda59406aed6707be3de"
                },
                body: bodyPut
            })
        }).then((response) => {
            cy.log(JSON.stringify(response.body))
            expect(response.status).to.equal(200)
            let id = response.body.id;
            cy.request({
                method: 'GET',
                url: 'https://gorest.co.in/public/v2/users/' + id,
                headers: {
                    Authorization: "Bearer 253e55e13faab872ca99b8eca0bb5be3ca0bb2c13237cda59406aed6707be3de"
                }
            }).then((responseGET) => {
                expect(responseGET.status).to.equal(200)
                expect(responseGET.body).has.property("name", "Gulcem Oruc")
            })

        })
    })
})
