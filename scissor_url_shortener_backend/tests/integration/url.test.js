const request = require('supertest');
const urlRoute = require('../../routes/url.route');
const urlModel = require('../../models/url.model');
const userModel = require('../../models/users.model');
require('dotenv').config();
const {connect} = require ("../../dbConnect")
const app = require("../../index")
const { default: mongoose } = require('mongoose');


describe('Url Route', () => {
  let token;
  const email = "mannya@gamail.com"
  const urlCode = "abc"

  beforeAll(async () => {
      await connect()
      
      await userModel.create({ 
          password: 'Password123',
          email: email
      });

      const loginResponse = await request(app)
      .post('/login')
      .set('content-type', 'application/json')
      .send({ 
        email: email, 
          password: 'Password123'
      });
      // console.log(loginResponse);
      token = loginResponse._body.token;
      // console.log(token);

  }, 3600000)

  // afterEach(async () => {
  //     await conn.cleanup()
  // })

  afterAll(async () => {
    await userModel.deleteMany();
    await urlModel.deleteMany();
  // Additional cleanup steps if needed
  await mongoose.connection.close();
  }, 3600000)

  it('should create a new blog', async () => {
      // create blog in our db
      const response = await request(app)
      .post(`/`)
      .set('Authorization', `${token}`)
      .send({
          longUrl: "https://chat.openai.com/c/7190261b-41f1-4346-8f6e-fc469c8dc4bf",
          urlCode: urlCode
      })

      // console.log(response);

      expect(response.status).toBe(200)
      expect(response._body).toHaveProperty("longUrl")
      expect(response._body).toHaveProperty("shortUrl")
      expect(response._body).toHaveProperty("urlCode")
      expect(response._body.creator).toEqual(email)
  }, 3600000)

  it('should get all urls', async () => {
    // update a blog in our db
    const response = await request(app)
    .get(`/`)
      .set('Authorization', `${token}`)
      
      // console.log(response);


    expect(response.status).toBe(200)
    expect(response.body).toBeInstanceOf(Array);
}, 3600000)


it('should return a specific url', async () => {
  // update a blog in our db
  const response = await request(app)
  .get(`/${urlCode}`)
  .set('Authorization', `${token}`)

    expect(response.status).toBe(302)
}, 3600000)


});
