const request = require("supertest");
const server = require('./server.js');

describe("routes to endpoints properly", () => {
	test("gets api/auth endpoint", async () => {
    const res = await request(server).post("/api/auth");
    expect(res.status).toBe(200);
	});

	test("should be json", async () => {
		const res = await request(server).get("/");
		expect(res.type).toBe("application/json");
	});
});