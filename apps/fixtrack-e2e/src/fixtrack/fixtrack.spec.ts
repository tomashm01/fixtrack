import axios from 'axios';

describe('GET /api/user', () => {
  it('should return a message', async () => {
    const res = await axios.get(`/api/user`);

    expect(res.status).toBe(200);;
    expect(res.data).toEqual('Devuelve algo');
  });
})
