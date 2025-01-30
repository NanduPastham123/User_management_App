const { getAllUsers } = require("../controllers/userController");
const { User } = require("../models");
const { getCache, setCache } = require("../controllers/cacheController");

jest.mock("../models", () => ({
  User: {
    findAll: jest.fn(),
  },
}));

jest.mock("../controllers/cacheController", () => ({
  getCache: jest.fn(),
  setCache: jest.fn(),
}));

const mockRequest = () => ({});
const mockResponse = () => {
  const res = {};
  res.status = jest.fn().mockReturnValue(res);
  res.json = jest.fn().mockReturnValue(res);
  return res;
};
const mockNext = jest.fn();

describe("getAllUsers Controller", () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  it("should return cached users if available", async () => {
    const cachedUsers = JSON.stringify([
      { id: 1, name: "John Doe", email: "john.doe@gmail.com" },
    ]);

    getCache.mockResolvedValue(cachedUsers);

    const req = mockRequest();
    const res = mockResponse();

    await getAllUsers(req, res, mockNext);

    expect(getCache).toHaveBeenCalledWith("users");
    expect(res.status).toHaveBeenCalledWith(200);
    expect(res.json).toHaveBeenCalledWith(JSON.parse(cachedUsers));
    expect(User.findAll).not.toHaveBeenCalled();
  });

  it("should fetch users from the database and cache them if not in cache", async () => {
    const dbUsers = [
      { id: 1, name: "John Doe", email: "john.doe@gmail.com" },
      { id: 2, name: "Jane Doe", email: "jane.doe@gmail.com" },
    ];

    getCache.mockResolvedValue(null);
    User.findAll.mockResolvedValue(dbUsers);
    setCache.mockResolvedValue(true); // Ensure setCache is mocked properly

    const req = mockRequest();
    const res = mockResponse();

    await getAllUsers(req, res, mockNext);

    expect(getCache).toHaveBeenCalledWith("users");
    expect(User.findAll).toHaveBeenCalledTimes(1);
    expect(setCache).toHaveBeenCalledWith("users", dbUsers);
    expect(res.status).toHaveBeenCalledWith(200);
    expect(res.json).toHaveBeenCalledWith(dbUsers);
  });

  it("should call next(error) if an error occurs", async () => {
    const error = new Error("Database error");
    getCache.mockRejectedValue(error);

    const req = mockRequest();
    const res = mockResponse();

    await getAllUsers(req, res, mockNext);

    expect(mockNext).toHaveBeenCalledWith(error);
  });
});
