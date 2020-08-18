const request = require("supertest");
const server = require("./server.js");
const db = require("../database/dbConfig.js");

describe("tests for jokes route", () => {
	test("should be json", async () => {
		const res = await request(server).get("/api/jokes");
		expect(res.type).toBe("application/json");
	});

	test("returns 401 if not logged in", () => {
		return request(server)
			.get("/api/jokes")
			.then((jokes) => {
				expect(jokes.status).toEqual(401);
			});
	});
});

describe("tests for auth register", () => {
	beforeEach(async () => {
		await db("users").truncate();
	});

	test("returns json", () => {
		return request(server)
			.post("/api/auth/register")
			.send({ username: "test1", password: "pass1" })
			.then((res) => {
				expect(res.type).toEqual("application/json");
			});
	});
	test("returns status of 201", () => {
		return request(server)
			.post("/api/auth/register")
			.send({ username: "test1", password: "pass1" })
			.then((res) => {
				expect(res.status).toEqual(201);
			});
	});
});

describe("tests for auth login", () => {
	beforeEach(async () => {
		await db("users").truncate();
	});

	test("returns status of 200", () => {
		return request(server)
			.post("/api/auth/register")
			.send({ username: "test1", password: "pass1" })
			.then(() => {
				return request(server)
					.post("/api/auth/login")
					.send({ username: "test1", password: "pass1" })
					.then((res) => {
						expect(res.status).toEqual(200);
					});
			});
	});
	test("returns json", () => {
		return request(server)
			.post("/api/auth/register")
			.send({ username: "test1", password: "pass1" })
			.then(() => {
				return request(server)
					.post("/api/auth/login")
					.send({ username: "test1", password: "pass1" })
					.then((res) => {
						expect(res.type).toEqual('application/json');
					});
			});
	});
});
