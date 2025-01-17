import axios from 'axios';
import { toast } from 'react-toastify';
import {addLine} from "../services/Lines/line.service";

jest.mock('axios');
jest.mock('react-toastify');

describe('addLine method - unit test', () => {
    const mockToken = 'mockToken';
    const lineData = { number: '123', name: 'Test Line' };

    beforeEach(() => {
        localStorage.setItem('token', mockToken);
    });

    afterEach(() => {
        jest.clearAllMocks();
    });

    it('should successfully add a line', async () => {
        const mockResponse = { data: { id: 1, ...lineData } };
        axios.post.mockResolvedValueOnce(mockResponse);

        const response = await addLine(lineData);

        expect(axios.post).toHaveBeenCalledWith(expect.any(String), {
            number: '123',
            name: 'Test Line',
        }, expect.any(Object));

        expect(toast.success).toHaveBeenCalledWith('Dodano nową linię', {
            position: 'top-right',
            theme: "colored",
        });
        expect(response).toEqual(mockResponse.data);
    });

    it('should handle errors when adding a line', async () => {
        axios.post.mockRejectedValueOnce(new Error('Network Error'));

        await addLine(lineData);

        expect(toast.error).toHaveBeenCalledWith('Linia nie została utworzona', {
            position: 'top-right',
            theme: "colored",
        });
    });
});
