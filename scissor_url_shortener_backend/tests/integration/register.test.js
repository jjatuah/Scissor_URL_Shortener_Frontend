const request = require('supertest');
const express = require('express');
const registerRoute = require('../../routes/register.route');
const userModel = require('../../models/users.model');
const tokenGenerator = require('../../tokenGenerator');

jest.mock('../../models/users.model');
jest.mock('../../tokenGenerator');

const app = express();
app.use(express.json());
app.use('/register', registerRoute);

describe('Register Route', () => {
  afterEach(() => {
    jest.resetAllMocks();
  });

  it('should return status 201 and a token on successful registration', async () => {
    // Mock data
    const email = 'test@example.com';
    const password = 'password123';
    const token = 'mockToken';

    // Mock the userModel.findOne method to return null (user does not exist)
    userModel.findOne.mockResolvedValue(null);

    // Mock the userModel.create method to return a new user
    const newUser = {
      _id: 'mockUserId',
      email: email,
      password: password,
    };
    userModel.create.mockResolvedValue(newUser);

    // Mock the tokenGenerator method to return a token
    tokenGenerator.mockResolvedValue(token);

    // Send a POST request to the register route
    const response = await request(app)
      .post('/register')
      .send({ email, password });

    // Assert the response
    expect(response.status).toBe(201);
    expect(response.body.message).toBe('Registered');
    expect(response.body.token).toBe(token);

    // Verify that userModel.create was called with the expected arguments
    expect(userModel.create).toHaveBeenCalledWith({
      email: email,
      password: password,
    });

    // Verify that tokenGenerator was called with the expected arguments
    expect(tokenGenerator).toHaveBeenCalledWith(newUser._id, newUser.email);
  });

  it('should return status 200 and a message when user already exists', async () => {
    // Mock data
    const email = 'test@example.com';
    const password = 'password123';

    // Mock the userModel.findOne method to return an existing user
    const existingUser = {
      _id: 'mockUserId',
      email: email,
      password: password,
    };
    userModel.findOne.mockResolvedValue(existingUser);

    // Send a POST request to the register route
    const response = await request(app)
      .post('/register')
      .send({ email, password });

    // Assert the response
    expect(response.status).toBe(200);
    expect(response.text).toBe('User already exists. Proceed to login');

    // Verify that userModel.findOne was called with the expected arguments
    expect(userModel.findOne).toHaveBeenCalledWith({ email: email });
  });

  it('should return status 500 and an error message on unexpected error', async () => {
    // Mock data
    const email = 'test@example.com';
    const password = 'password123';
    const errorMessage = 'Internal server error';

    // Mock the userModel.findOne method to throw an error
    userModel.findOne.mockRejectedValue(new Error(errorMessage));

    // Send a POST request to the register route
    const response = await request(app)
      .post('/register')
      .send({ email, password });

    // Assert the response
    expect(response.status).toBe(500);

    // Verify that userModel.findOne was called with the expected arguments
    expect(userModel.findOne).toHaveBeenCalledWith({ email: email });
  });
});
