import request from "supertest";
import express from "express";
import onboardRoutes from "./onboard.routes.js";
import OnboardRepository from "./onboard.repository.js";

const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use("/api/onboard", onboardRoutes);

const repository = new OnboardRepository();

describe("Onboard Endpoints", () => {
  // Set up test database before all tests
  beforeAll(async () => {
    await repository.initializeTable();
  });

  // Clean up test data before each test
  beforeEach(async () => {
    await repository.clearAll();
  });

  // Close database connection after all tests
  afterAll(async () => {
    // Database connection stays open and is reused
  });

  describe("POST /api/onboard - Create onboard request", () => {
    test("should create a new onboard request with valid data", async () => {
      const response = await request(app).post("/api/onboard").send({
        name: "John Doe",
        currentFloor: 1,
        dropOffFloor: 5,
      });

      expect(response.statusCode).toBe(201);
      expect(response.body).toHaveProperty("id");
      expect(response.body.name).toBe("John Doe");
      expect(response.body.currentFloor).toBe(1);
      expect(response.body.dropOffFloor).toBe(5);
    });

    test("should return 422 if name is missing", async () => {
      const response = await request(app).post("/api/onboard").send({
        currentFloor: 1,
        dropOffFloor: 5,
      });

      expect(response.statusCode).toBe(422);
      expect(response.body.message).toContain("name is required");
    });

    test("should return 422 if currentFloor is missing", async () => {
      const response = await request(app).post("/api/onboard").send({
        name: "John Doe",
        dropOffFloor: 5,
      });

      expect(response.statusCode).toBe(422);
      expect(response.body.message).toContain("currentFloor is required");
    });

    test("should return 422 if dropOffFloor is missing", async () => {
      const response = await request(app).post("/api/onboard").send({
        name: "John Doe",
        currentFloor: 1,
      });

      expect(response.statusCode).toBe(422);
      expect(response.body.message).toContain("dropOffFloor is required");
    });

    test("should return 422 if currentFloor is not a number", async () => {
      const response = await request(app).post("/api/onboard").send({
        name: "John Doe",
        currentFloor: "not a number",
        dropOffFloor: 5,
      });

      expect(response.statusCode).toBe(422);
      expect(response.body.message).toContain("currentFloor must be a number");
    });

    test("should return 422 if dropOffFloor is not a number", async () => {
      const response = await request(app).post("/api/onboard").send({
        name: "John Doe",
        currentFloor: 1,
        dropOffFloor: "not a number",
      });

      expect(response.statusCode).toBe(422);
      expect(response.body.message).toContain("dropOffFloor must be a number");
    });

    test("should return 422 if name is an empty string", async () => {
      const response = await request(app).post("/api/onboard").send({
        name: "   ",
        currentFloor: 1,
        dropOffFloor: 5,
      });

      expect(response.statusCode).toBe(422);
      expect(response.body.message).toContain("name is required");
    });
  });

  describe("GET /api/onboard - Get all onboard requests", () => {
    test("should retrieve all onboard requests", async () => {
      // First create a request
      await request(app).post("/api/onboard").send({
        name: "Jane Smith",
        currentFloor: 2,
        dropOffFloor: 8,
      });

      // Then retrieve all
      const response = await request(app).get("/api/onboard");

      expect(response.statusCode).toBe(200);
      expect(Array.isArray(response.body)).toBe(true);
      expect(response.body.length).toBeGreaterThan(0);
      expect(response.body[0]).toHaveProperty("id");
      expect(response.body[0]).toHaveProperty("name");
      expect(response.body[0]).toHaveProperty("currentFloor");
      expect(response.body[0]).toHaveProperty("dropOffFloor");
    });

    test("should return an empty array if no records exist", async () => {
      const response = await request(app).get("/api/onboard");

      expect(response.statusCode).toBe(200);
      expect(Array.isArray(response.body)).toBe(true);
    });
  });

  describe("DELETE /api/onboard/:id - Delete onboard request", () => {
    test("should delete an onboard request by id", async () => {
      // First create a request
      const createResponse = await request(app).post("/api/onboard").send({
        name: "Mike Johnson",
        currentFloor: 3,
        dropOffFloor: 10,
      });

      const id = createResponse.body.id;

      // Then delete it
      const deleteResponse = await request(app).delete(`/api/onboard/${id}`);

      expect(deleteResponse.statusCode).toBe(200);
      expect(deleteResponse.body).toHaveProperty("deleted");
      expect(deleteResponse.body.deleted).toBe(1);
    });

    test("should return 404 if trying to delete non-existent record", async () => {
      const response = await request(app).delete("/api/onboard/99999");

      expect(response.statusCode).toBe(404);
      expect(response.body.message).toContain("Record not found");
    });

    test("should return 404 if id is invalid", async () => {
      const response = await request(app).delete("/api/onboard/invalid");

      expect(response.statusCode).toBe(404);
    });
  });

  describe("Integration tests", () => {
    test("should create, retrieve, and delete an onboard request", async () => {
      // Create
      const createResponse = await request(app).post("/api/onboard").send({
        name: "Test User",
        currentFloor: 1,
        dropOffFloor: 7,
      });

      expect(createResponse.statusCode).toBe(201);
      const id = createResponse.body.id;

      // Retrieve all
      const getAllResponse = await request(app).get("/api/onboard");
      expect(getAllResponse.statusCode).toBe(200);
      const createdRecord = getAllResponse.body.find((r) => r.id === id);
      expect(createdRecord).toBeDefined();
      expect(createdRecord.name).toBe("Test User");

      // Delete
      const deleteResponse = await request(app).delete(`/api/onboard/${id}`);
      expect(deleteResponse.statusCode).toBe(200);
      expect(deleteResponse.body.deleted).toBe(1);
    });
  });
});
