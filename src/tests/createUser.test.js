const { DataTypes } = require("sequelize");
const SequelizeMock = require("sequelize-mock");

// Initialize a new Sequelize mock instance
const dbMock = new SequelizeMock();

// Mock the User model
const UserMock = dbMock.define(
  "User",
  {
    name: "jane mill",
    email: "jane.mill@gmail.com",
    password: "hashedpassword123",
  },
  {
    timestamps: true,
  }
);

describe("User Model", () => {
  /**
   * ✅ TEST: Ensure User model has correct attributes
   */
  it("should have name, email, and password fields", () => {
    const user = UserMock.build();

    expect(user).toHaveProperty("name");
    expect(user).toHaveProperty("email");
    expect(user).toHaveProperty("password");
  });

  /**
   * ✅ TEST: Ensure email field is unique
   */
  it("should not allow duplicate emails", async () => {
    await UserMock.create({
      name: "Alice",
      email: "alice@gmail.com",
      password: "password123",
    });

    await expect(
      UserMock.create({
        name: "Bob",
         email: "alice@gmail.com", // Duplicate email
        // email: "bob.1234@gmail.com",
        password: "password456",
      })
    ).rejects.toThrow();
  });

  /**
   * ✅ TEST: Successfully create a new user
   */
  it("should create a user successfully", async () => {
    const user = await UserMock.create({
      name: "Jane Doe",
      email: "jane.doe@gmail.com",
      password: "hashedpassword456",
    });

    expect(user.name).toBe("Jane Doe");
    expect(user.email).toBe("jane.doe@gmail.com");
  });
});
