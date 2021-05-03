import supertest from "supertest";
import { config } from "dotenv";
import app from "../src/app";
import { db, dbConfig } from "../src/database/db";
config();

const request = supertest(app);
const testUser = {
  name: "Guilherme",
  email: `guidraghetti${Date.now()}@gmail.com`,
  password: "dragui@123",
};

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
        expect(res.statusCode).toEqual(301);
      })
      .catch((err) => {
        console.log(err);
      });
  });
});

describe("User registration", () => {
  const emptyUser = {
    name: " ",
    email: " ",
    password: " ",
  };
  beforeAll(async () => {
    await db.connect(process.env.MONGO_URI_TEST, dbConfig);
  });

  test("Should register an user", () => {
    return request
      .post("/auth/register")
      .send(testUser)
      .then((res) => {
        expect(res.statusCode).toEqual(201);
        expect(res.body.user.email).toEqual(testUser.email);
        expect(res.body.user.name).toEqual(testUser.name);
      });
  });
  test("Register fields cannot be empty", () => {
    return request
      .post("/auth/register")
      .send(emptyUser)
      .then((res) => {
        expect(res.statusCode).toEqual(400);
        expect(res.body.error).toEqual(
          "Todos os campos devem estar preenchidos!"
        );
      });
  });
  test("Email cannot be registered more than once", () => {
    return request
      .post("/auth/register")
      .send(testUser)
      .then((res) => {
        expect(res.statusCode).toEqual(400);
        expect(res.body.error).toEqual("E-mail já cadastrado!");
      });
  });
});

describe("User login", () => {
  const userLogin = {
    email: "guidraghetti@gmail.com",
    password: "draghetti@123",
  };
  const emptyUserLogin = {
    email: " ",
    password: " ",
  };
  test("Login fields cannot be empty", () => {
    return request
      .post("/auth/login")
      .send({ email: emptyUserLogin.email, password: userLogin.password })
      .then((res) => {
        expect(res.statusCode).toEqual(400);
        expect(res.body.error).toEqual("E-mail/senha inválidos!");
      });
  });
  test("Cannot login if user email hasn't in database", () => {
    const userLogin = {
      email: "joaofjdljkfdjl@gmail.com",
      password: "jlfksdfjldskfjds",
    };
    return request
      .post("/auth/login")
      .send(userLogin)
      .then((res) => {
        expect(res.statusCode).toEqual(401);
        expect(res.body.error).toEqual("E-mail inválido!");
      });
  });
  test("Cannot login if user password is incorrect", () => {
    const userLogin = {
      email: testUser.email,
      password: "jdfkdlfjdslfkdsjflds",
    };
    return request
      .post("/auth/login")
      .send(userLogin)
      .then((res) => {
        expect(res.statusCode).toEqual(401);
        expect(res.body.error).toEqual("Senha inválida!");
      });
  });
  it.todo("Login should return a JWT token");
  it.todo("Should verify if the token is valid");
});
afterAll(async () => {
  await db.connection.db.dropDatabase();
  await db.connection.close(false);
});
