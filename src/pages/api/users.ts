import { NextApiRequest, NextApiResponse } from 'next';

export default (request: NextApiRequest, response: NextApiResponse) => {
    const users = [
        { id: 1, name: 'D1' },
        { id: 2, name: 'D2' },
        { id: 3, name: 'D3' },
    ]

    return response.json(users);
}