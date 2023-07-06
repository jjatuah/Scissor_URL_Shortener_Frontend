const jwt = require('jsonwebtoken');
const tokenGenerator = require('../../tokenGenerator');
require('dotenv').config();

// Mock the jwt.sign method
jest.mock('jsonwebtoken', () => ({
  sign: jest.fn(),
}));

describe('tokenGenerator', () => {
  it('should generate a token with the provided id and email', async () => {
    // Mock the jwt.sign method to return a fake token
    const fakeToken = 'fakeToken';
    jwt.sign.mockReturnValue(fakeToken);

    // Define the input parameters
    const id = 'mockUserId';
    const email = 'test@example.com';

    // Call the tokenGenerator function
    const result = await tokenGenerator(id, email);

    // Verify that jwt.sign was called with the correct arguments
    expect(jwt.sign).toHaveBeenCalledWith(
      { id: id, email: email },
      process.env.SECRET_KEY,
      { expiresIn: '1d' }
    );

    // Verify that the result is the fake token
    expect(result).toBe(fakeToken);
  });

  it('should handle errors and return undefined', async () => {
    // Mock the jwt.sign method to throw an error
    jwt.sign.mockImplementation(() => {
      throw new Error('Fake error');
    });

    // Call the tokenGenerator function
    const result = await tokenGenerator('mockUserId', 'test@example.com');

    // Verify that jwt.sign was called with the correct arguments
    expect(jwt.sign).toHaveBeenCalledWith(
      expect.any(Object),
      process.env.SECRET_KEY,
      { expiresIn: '1d' }
    );

    // Verify that the result is undefined
    expect(result).toBeUndefined();
  });
});
