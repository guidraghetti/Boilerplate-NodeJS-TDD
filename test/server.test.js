import supertest from "supertest";
import { config } from "dotenv";
import app from "../src/app";
import db from "../src/database/db";
config();

const request = supertest(app);

describe("Test Connections", () => {
  it("Should connect on PORT 3001", () => {
    expect(process.env.PORT).toEqual("3001");
  });
  it.todo("Should connect to database");
  it.todo("Should disconnect database when api is off");
});

describe("User registration", () => {
  it.todo("Registration fields cannot be empty");
  it.todo("Password cannot be empty");
  it.todo("Email cannot be registered more than once ");
});

describe("User login", () => {
  it.todo("Email cannot be empty");
  it.todo("Password cannot be empty");
  it.todo("User cannot login with random data");
  it.todo("Login should return a JWT token");
  it.todo("Should verify if the token is valid");
});
