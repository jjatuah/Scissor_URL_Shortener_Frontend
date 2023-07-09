const request = require('supertest');
const urlRoute = require('../../routes/url.route');
const urlModel = require('../../models/url.model');
const userModel = require('../../models/users.model');
require('dotenv').config();
const { connect } = require('../../dbConnect');
const app = require('../../index');
const { default: mongoose } = require('mongoose');

describe('Url Route', () => {
  let token;
  let createdUrlID; // To store the ID of the created url
  let createdUserID; // To store the ID of the created user

  const email = 'masn@gamail.com';
  const urlCode = 'abc';

  beforeAll(async () => {
    await connect();

    const createdUser = await userModel.create({
      password: 'Password123',
      email: email,
    });

    createdUserID = createdUser._id.toString()

    const loginResponse = await request(app)
      .post('/login')
      .set('content-type', 'application/json')
      .send({
        email: email,
        password: 'Password123',
      });

    token = loginResponse._body.token;
  }, 3600000);

  afterAll(async () => {
    // Delete the specific test data
    if (createdUrlID) {
      await urlModel.deleteOne({ _id: createdUrlID });
      createdUrlID = null;
    }

    // Delete the user created for the test
    if (createdUserID) {
      await userModel.deleteOne({ _id: createdUserID });
      createdUserID = null;
    }

    // Additional cleanup steps if needed
    await mongoose.connection.close();
  }, 3600000);

  it('should create a new blog', async () => {
    const response = await request(app)
      .post('/')
      .set('Authorization', `${token}`)
      .send({
        longUrl: 'https://chat.openai.com/c/7190261b-41f1-4346-8f6e-fcc469c8dc4bf',
        urlCode: urlCode,
      });

    expect(response.status).toBe(200);
    expect(response.body).toHaveProperty('longUrl');
    expect(response.body).toHaveProperty('shortUrl');
    expect(response.body).toHaveProperty('urlCode');
    expect(response.body.creator).toEqual(email);

    createdUrlID = response.body._id; // Store the ID of the created url for deletion
  }, 3600000);

  it('should get all urls', async () => {
    const response = await request(app)
      .get('/')
      .set('Authorization', `${token}`);

    expect(response.status).toBe(200);
    expect(response.body).toBeInstanceOf(Array);
  }, 3600000);

  it('should return a specific url', async () => {
    const response = await request(app)
      .get(`/${urlCode}`)

    expect(response.status).toBe(302);
  }, 3600000);
});
