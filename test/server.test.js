import supertest from "supertest";
import { config } from "dotenv";
import app from "../src/app";
import { db, dbConfig } from "../src/database/db";
config();

const request = supertest(app);

describe("Test Connections", () => {
  test("Should connect on PORT 3001", () => {
    return request.get("/").then((res) => {
      expect(res.statusCode).toEqual(200);
    });
  });
  test("Should connect to database", (done) => {
    db.connect(process.env.MONGO_URI_TEST, dbConfig, (error, result) => {
      if (error) {
        done(error);
        return;
      }
      expect(result.connections[0].name).toEqual(process.env.DB_NAME_TEST);
      done();
    });
  });
  test("Should disconnect database", (done) => {
    db.connection.close(false, (error, result) => {
      if (error) {
        done(error);
        return;
      }
      expect(result).toBeUndefined();
      done();
    });
  });
  test("Should render Swagger", () => {
    return request
      .get("/swagger")
      .then((res) => {
        console.log(res);
        expect(res.statusCode).toEqual(301);
      })
      .catch((err) => {
        console.log(err);
      });
  });
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
