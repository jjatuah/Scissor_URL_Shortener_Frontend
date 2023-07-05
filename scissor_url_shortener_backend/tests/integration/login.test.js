const request = require('supertest');
const express = require('express');
const loginRoute = require('../../routes/login.route');
const userModel = require('../../models/users.model');
const bcrypt = require('bcryptjs');
const tokenGenerator = require('../../tokenGenerator');

jest.mock('../../models/users.model');
jest.mock('bcryptjs');
jest.mock('../../tokenGenerator');

const app = express();
app.use(express.json());
app.use('/login', loginRoute);

describe('Login Route', () => {
  afterEach(() => {
    jest.resetAllMocks();
  });

  it('should return status 200 and a token on successful login', async () => {
    // Mock data
    const email = 'test@example.com';
    const password = 'password123';
    const token = 'mockToken';

    // Mock the userModel.findOne method to return a user
    const user = {
      _id: 'mockUserId',
      email: email,
      password: 'hashedPassword',
    };
    userModel.findOne.mockResolvedValue(user);

    // Mock the bcrypt.compare method to return true (password match)
    bcrypt.compare.mockResolvedValue(true);

    // Mock the tokenGenerator method to return a token
    tokenGenerator.mockResolvedValue(token);

    // Send a POST request to the login route
    const response = await request(app)
      .post('/login')
      .send({ email, password });

    // Assert the response
    expect(response.status).toBe(200);
    expect(response.body.message).toBe('Logged in');
    expect(response.body.token).toBe(token);

    // Verify that userModel.findOne was called with the expected arguments
    expect(userModel.findOne).toHaveBeenCalledWith({ email: email });

    // Verify that bcrypt.compare was called with the expected arguments
    expect(bcrypt.compare).toHaveBeenCalledWith(password, user.password);

    // Verify that tokenGenerator was called with the expected arguments
    expect(tokenGenerator).toHaveBeenCalledWith(user._id, user.email);
  });

  it('should return status 400 and an error message for invalid password', async () => {
    // Mock data
    const email = 'test@example.com';
    const password = 'password123';

    // Mock the userModel.findOne method to return a user
    const user = {
      _id: 'mockUserId',
      email: email,
      password: 'hashedPassword',
    };
    userModel.findOne.mockResolvedValue(user);

    // Mock the bcrypt.compare method to return false (password mismatch)
    bcrypt.compare.mockResolvedValue(false);

    // Send a POST request to the login route
    const response = await request(app)
      .post('/login')
      .send({ email, password });

    // Assert the response
    expect(response.status).toBe(400);
    expect(response.text).toBe('Invalid Password');

    // Verify that userModel.findOne was called with the expected arguments
    expect(userModel.findOne).toHaveBeenCalledWith({ email: email });

    // Verify that bcrypt.compare was called with the expected arguments
    expect(bcrypt.compare).toHaveBeenCalledWith(password, user.password);
  });

  it('should return status 400 and an error message for invalid email', async () => {
    // Mock data
    const email = 'test@example.com';
    const password = 'password123';

    // Mock the userModel.findOne method to return null (user not found)
    userModel.findOne.mockResolvedValue(null);

    // Send a POST request to the login route
    const response = await request(app)
      .post('/login')
      .send({ email, password });

    // Assert the response
    expect(response.status).toBe(400);
    expect(response.text).toBe('Invalid Email');

    // Verify that userModel.findOne was called with the expected arguments
    expect(userModel.findOne).toHaveBeenCalledWith({ email: email });
  });

  it('should return status 400 and an error message for unexpected error', async () => {
    // Mock data
    const email = 'test@example.com';
    const password = 'password123';

    // Mock the userModel.findOne method to throw an error
    userModel.findOne.mockRejectedValue(new Error('Unexpected error'));

    // Send a POST request to the login route
    const response = await request(app)
      .post('/login')
      .send({ email, password });

    // Assert the response
    expect(response.status).toBe(400);
    expect(response.text).toBe('Unexpected error occurred');

    // Verify that userModel.findOne was called with the expected arguments
    expect(userModel.findOne).toHaveBeenCalledWith({ email: email });
  });
});
