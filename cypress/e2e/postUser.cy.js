
import payload from '../config/payload.json'

describe('API TEST-2 POST', () => {
    function randomEmailGeneration() {
        const randomString = Math.random().toString(36).substring(2, 10)
        const email = randomString + "@email.com"
        return email
    }


    it('POST-1 Fixture file', () => {
        cy.fixture('user').then((responseObject) => {
            responseObject.email = randomEmailGeneration()
           
            cy.request({
                method: 'POST', // Use POST instead of GET
                url: "https://gorest.co.in/public/v2/users", // Correct API endpoint
                headers: {
                    Authorization: "Bearer 253e55e13faab872ca99b8eca0bb5be3ca0bb2c13237cda59406aed6707be3de"
                },
                body: responseObject


            }).then((response) => {
                cy.log(JSON.stringify(response.body));
                expect(response.status).to.equal(201); // Ensure successful creation
                expect(response.body).to.have.property("name", "DuruVildan20");
                expect(response.body).to.have.property("gender", "female");
                expect(response.body).to.have.property("status", "active");
                expect(response.body.id).to.not.be.null; // Ensure an ID is returned
            });
        });
    });

    it('POST-2 with payload', () => {
        payload.email = randomEmailGeneration()
        cy.request({
            method: 'POST', // Use POST instead of GET
            url: "https://gorest.co.in/public/v2/users", // Correct API endpoint
            headers: {
                Authorization: "Bearer 253e55e13faab872ca99b8eca0bb5be3ca0bb2c13237cda59406aed6707be3de"
            },
            body: payload
        }).then((response) => {
            cy.log(JSON.stringify(response.body));
            expect(response.status).to.equal(201); // Ensure successful creation
            expect(response.body).to.have.property("name", "DuruVildan20");
            expect(response.body).to.have.property("gender", "female");
            expect(response.body).to.have.property("status", "active");
            expect(response.body.id).to.not.be.null; // Ensure an ID is returned

            let userId = response.body.id;

            cy.request({
                method: 'GET',
                url: "https://gorest.co.in/public/v2/users",
                headers: {
                    Authorization: "Bearer, 253e55e13faab872ca99b8eca0bb5be3ca0bb2c13237cda59406aed6707be3de"
                }
            }).then((getResponse) => {
                expect(getResponse.status).to.be.equal(200)
                expect(getResponse.body.id).to.not.be.null
            })
        });
    });

    it('POST-3 Invalid Header', () => {
        payload.email = randomEmailGeneration()
        cy.request({
            method: 'POST', // Use POST instead of GET
            url: "https://gorest.co.in/publc/v2/users", // API is not correct public
            headers: {
                Authorization: "Bearer 253e55e13faab872ca99b8eca0bb5be3ca0bb2c13237cda59406aed6707be3de"
            },
            body: payload,
            failOnStatusCode:false
        }).then((response) => {
            expect(response.status).to.equal(404); // Ensure successful creation 
        });
    });

    it('POST-4 Negative Case || Wrong Data', () => {
        payload.email =null
        cy.request({
            method: 'POST', // Use POST instead of GET
            url: "https://gorest.co.in/public/v2/users", // Correct API endpoint but email is
            headers: {
                Authorization: "Bearer 253e55e13faab872ca99b8eca0bb5be3ca0bb2c13237cda59406aed6707be3de"
            },
            body: payload,
            failOnStatusCode:false
        }).then((response) => {
            expect(response.status).to.equal(422); //email should not be empty 
        });
    });
})

