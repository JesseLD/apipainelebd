import request from "supertest";
import server from "../../server";

describe("User routes test", () => {
  it("Should return a 200 status on all users", async () => {
    const response = await request(server)
      .get("/v0/Users")
      .set("Authorization", "");
    expect(response.status).toBe(200);
  });

  it("Should return a 200 status on single user", async () => {
    const response = await request(server)
      .get("/v0/Users/1")
      .set("Authorization", "");
    expect(response.status).toBe(200);
  });

  it("Should return a 200 status on post", async () => {
    const response = await request(server)
      .post("/v0/Users")
      .send({
        email: "mock@mail.com",
        password: "mymocksimplepassword",
      })
      .set("Authorization", "");
    expect(response.status).toBe(200);
  });

  it("Should return a 200 status on put", async () => {
    const response = await request(server)
      .put("/v0/Users")
      .send({
        id: 1,
        email: "mock@mail.com",
        password: "mymocksimplepassword",
      })
      .set("Authorization", "");
    expect(response.status).toBe(200);
  });

  it("Should return a 200 status on delete", async () => {
    const response = await request(server)
      .delete("/v0/Users/1")
      .set("Authorization", "");
    expect(response.status).toBe(200);
  });

  it("Should return a 401 to get route", async () => {
    const response = await request(server).get("/v0/Users");
    expect(response.status).toBe(401);
  });

  it("Should return a 400 status on create user post", async () => {
    const response = await request(server)
      .post("/v0/Users")
      .send({
        email: "mock@mail.com",
      })
      .set("Authorization", "");
    expect(response.status).toBe(400);
  });

  it("Should return a 400 status on update user put", async () => {
    const response = await request(server)
      .put("/v0/Users")
      .send({
        id: 1,
      })
      .set("Authorization", "");
    expect(response.status).toBe(400);
  });

  it("Should return a 404 status on a invalid route", async () => {
    const response = await request(server)
      .post("/v0/invalidRoute")
      .send({
        email: "mock@mail.com",
      })
      .set("Authorization", "");
    expect(response.status).toBe(404);
  });
});

afterAll((done) => {
  server.close(() => {
    console.log("> [Test Server] encerrado");
    done();
  });
});
