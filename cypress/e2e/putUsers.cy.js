
import payload from '../config/payload.json'
import putBody from '../fixtures/put.json'

describe('API TEST-3 PUT', () => {
    function randomEmailGeneration() {
        const randomString = Math.random().toString(36).substring(2, 10)
        const email = randomString + "@email.com"
        return email
    }


    it('PUT-1 Fixture file', () => {


        let randomEmail = randomEmailGeneration()
        cy.request({
            method: 'PUT', // Use POST instead of GET
            url: "https://gorest.co.in/public/v2/users/7528136", // Correct API endpoint
            headers: {
                Authorization: "Bearer 253e55e13faab872ca99b8eca0bb5be3ca0bb2c13237cda59406aed6707be3de"
            },
            body: putBody


        }).then((response) => {
            cy.log(JSON.stringify(response.body));
            expect(response.status).to.equal(200); // Ensure successful creation
            expect(response.body).to.have.property("name", "Gulcem Oruc");
            expect(response.body).to.have.property("email", "gulustest@test.com");
        });
    });

})