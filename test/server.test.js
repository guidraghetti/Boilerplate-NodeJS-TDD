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
let token;
let userId;

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
  test("Login should return a JWT token", async () => {
    const res = await request
      .post("/auth/login")
      .send({ email: testUser.email, password: testUser.password });
    expect(res.statusCode).toEqual(200);
    expect(res.body.user.email).toEqual(testUser.email);
    expect(res.body.user.name).toEqual(testUser.name);
    expect(res.body.user.token).toBeDefined();
    token = res.body.user.token;
    userId = res.body.user._id;
  });
});

describe("Test protected routes", () => {
  test("Shouldn't return all users without token", () => {
    return request.get("/user/getAll").then((res) => {
      expect(res.statusCode).toEqual(401);
      expect(res.body.error).toEqual("Unauthorized!");
    });
  });
  test("Shouldn't return specific user (passing id) without token", () => {
    return request.get(`/user/${userId}`).then((res) => {
      expect(res.statusCode).toEqual(401);
      expect(res.body.error).toEqual("Unauthorized!");
    });
  });

  test("Should return all users with token", () => {
    return request
      .get("/user/getAll")
      .set("authorization", "Bearer " + token)
      .then((res) => {
        expect(res.statusCode).toEqual(200);
        expect(res.body[0]).toHaveProperty("_id");
        expect(res.body[0]).toHaveProperty("name");
        expect(res.body[0]).toHaveProperty("email");
      });
  });

  test("Shouldn't return all users with false token", () => {
    return request
      .get("/user/getAll")
      .set("authorization", "Bearer " + token + "fjdfldskfjdslkfjdslkds")
      .then((res) => {
        expect(res.statusCode).toEqual(401);
        expect(res.body.error).toEqual("Unauthorized!");
      });
  });
  test("Shoud return error with invalid id", () => {
    return request
      .get(`/user/aaaaaaaaaaaaaaaaaaaaaaaa`)
      .set("authorization", "Bearer " + token)
      .then((res) => {
        expect(res.statusCode).toEqual(400);
        expect(res.body.error).toEqual("Invalid Id!");
      });
  });
  test("Shoud return specific user with token", () => {
    return request
      .get(`/user/${userId}`)
      .set("authorization", "Bearer " + token)
      .then((res) => {
        expect(res.statusCode).toEqual(200);
        expect(res.body).toHaveProperty("_id");
        expect(res.body).toHaveProperty("name");
        expect(res.body).toHaveProperty("email");
      });
  });
});

describe("All tests about books", () => {
  test("Should user add a book that he own to his profile", () => {
    const book = {
      userId,
      name: "Harry Potter",
      genre: "Fiction",
      type: "own",
      year: 2001,
    };

    return request
      .post(`/book/post`)
      .send(book)
      .set("authorization", "Bearer " + token)
      .then((res) => {
        expect(res.statusCode).toEqual(200);
        expect(res.body.books.length).toBeGreaterThan(0);
      });
  });
  test("Should user add a book that he like to buy to his profile", () => {
    const book1 = {
      userId,
      name: "Harry Potter Philosofal",
      genre: "Fiction",
      type: "like",
      year: 2003,
    };
    return request
      .post("/book/post")
      .send(book1)
      .set("authorization", "Bearer " + token)
      .then((res) => {
        expect(res.statusCode).toEqual(200);
        expect(res.body.books.length).toBeGreaterThan(0);
      });
  });
  test("Should return all books owned by some user", () => {
    return request
      .get(`/book/${userId}?type=own`)
      .set("authorization", "Bearer " + token)
      .then((res) => {
        expect(res.statusCode).toEqual(200);
        expect(res.body.userId).toEqual(userId);
        res.body.books.forEach((book) => {
          expect(book).toHaveProperty("name");
          expect(book).toHaveProperty("year");
          expect(book).toHaveProperty("genre");
          // expect(book).toHaveProperty("cover");
        });
      });
  });
  test("Should return all books that some user like to buy", () => {
    return request
      .get(`/book/${userId}?type=like`)
      .set("authorization", "Bearer " + token)
      .then((res) => {
        expect(res.statusCode).toEqual(200);
        expect(res.body.userId).toEqual(userId);
        res.body.books.forEach((book) => {
          expect(book).toHaveProperty("name");
          expect(book).toHaveProperty("year");
          expect(book).toHaveProperty("genre");
        });
      });
  });
  test("Should return error if user doesn't exist", () => {
    return request
      .get(`/book/aaaaaaaaaaaaaaaaaaaaaaaa/?type=own`)
      .set("authorization", "Bearer " + token)
      .then((res) => {
        expect(res.statusCode).toEqual(400);
        expect(res.body.error).toEqual("User not found!");
      });
  });

  it.todo("Should return error user if user id is incorrect");
  it.todo("Should return all books by genre");
  it.todo("Should return error if genre doesn't exist");
  it.todo("Should return the number of books by genre");

  afterAll(async () => {
    await db.connection.db.dropDatabase();
    await db.connection.close(false);
  });
});
