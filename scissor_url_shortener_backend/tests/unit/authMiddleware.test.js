const jwt = require('jsonwebtoken');
const authMiddleware = require('../../authMiddleware');
require('dotenv').config();

// Mock the jwt.verify method
jest.mock('jsonwebtoken', () => ({
  verify: jest.fn(),
}));

describe('authMiddleware', () => {
  it('should call the next function if a valid token is provided', () => {
    // Mock the jwt.verify method to return decoded data
    const decodedData = { email: 'test@example.com' };
    jwt.verify.mockReturnValue(decodedData);

    // Mock the req and res objects
    const req = {
      header: jest.fn().mockReturnValue('fakeToken'),
    };
    const res = {};
    const next = jest.fn();

    // Call the authMiddleware function
    authMiddleware(req, res, next);

    // Verify that jwt.verify was called with the correct arguments
    expect(jwt.verify).toHaveBeenCalledWith('fakeToken', process.env.SECRET_KEY);

    // Verify that req.user is set to the decoded email
    expect(req.user).toBe(decodedData.email);

    // Verify that next was called
    expect(next).toHaveBeenCalled();
  });

  it('should return a 401 status and an error message if no token is provided', () => {
    // Mock the req and res objects
    const req = {
      header: jest.fn().mockReturnValue(undefined),
    };
    const res = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn(),
    };
    const next = jest.fn();

    // Call the authMiddleware function
    authMiddleware(req, res, next);

    // Verify that res.status and res.json were called with the correct arguments
    expect(res.status).toHaveBeenCalledWith(401);
    expect(res.json).toHaveBeenCalledWith({ message: 'You are Unauthorized. Login or Register' });

    // Verify that next was not called
    expect(next).not.toHaveBeenCalled();
  });

  it('should return a 401 status and an error message if an invalid token is provided', () => {
    // Mock the jwt.verify method to throw an error
    jwt.verify.mockImplementation(() => {
      throw new Error('Fake error');
    });

    // Mock the req and res objects
    const req = {
      header: jest.fn().mockReturnValue('invalidToken'),
    };
    const res = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn(),
    };
    const next = jest.fn();

    // Call the authMiddleware function
    authMiddleware(req, res, next);

    // Verify that jwt.verify was called with the correct arguments
    expect(jwt.verify).toHaveBeenCalledWith('invalidToken', process.env.SECRET_KEY);

    // Verify that res.status and res.json were called with the correct arguments
    expect(res.status).toHaveBeenCalledWith(401);
    expect(res.json).toHaveBeenCalledWith({ message: 'Invalid Token' });

    // Verify that next was not called
    expect(next).not.toHaveBeenCalled();
  });
});
