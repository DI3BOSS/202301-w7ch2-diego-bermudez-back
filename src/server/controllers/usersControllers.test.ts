import { MongoMemoryServer } from "mongodb-memory-server";
import mongoose from "mongoose";
import User from "../../database/models/User";
import { type UserCredentials } from "../../types.js";
import { app } from "..";
import connectDataBase from "../../database/connectDataBase";
import Request from "supertest";

let server: MongoMemoryServer;

beforeAll(async () => {
  server = await MongoMemoryServer.create();
  await connectDataBase(server.getUri());
});

afterAll(async () => {
  await server.stop();
  await mongoose.connection.close();
});

afterEach(async () => {
  await User.deleteMany();
});

describe("Given a POST 'user/register' endpoint", () => {
  describe("when it receives a request with username 'di3boss' and  password '0pendedDevtool$'", () => {
    test("Then it should respond with status 201 and a object with the created user", async () => {
      const mockedUser: UserCredentials = {
        username: "di3boss",
        password: "0pendedDevtool$",
        email: "test@supertest.com",
        avatar: "nada.jotapege",
      };
      const expectedStatusCode = 201;
      const expectedMessage = "The user has been created";

      // eslint-disable-next-line new-cap
      const response = await Request(app)
        .post("/users/register")
        .send(mockedUser)
        .expect(expectedStatusCode);

      expect(response.body).toHaveProperty("message", expectedMessage);
    });
  });
});
