const { getPaginationData } = require("../../dist/middleware/notes/pages");
describe("getPagination middleware", () => {
    const mockNext = jest.fn();
    const mockRequest = (data) => {
        req = {}
        req.query = {
            p:data
        }
        req.pages = jest.fn().mockReturnValue(req)
        return req
    };
    const mockResponse = {};
    test('next is called', async()=>{
        const req = mockRequest("1");
        const res = mockResponse;
        getPaginationData(req, res, mockNext);
        expect(mockNext).toHaveBeenCalled()
    })
    test("gets page data with string", async () => {
        const req = mockRequest('1');
        const res = mockResponse;
        getPaginationData(req, res, mockNext);
        expect(req.pages).toStrictEqual({
            currentPage:1,
            notesPerPage:18,
        })
    });
    test("gets page data with number and defaults", async () => {
        const req = mockRequest(1);
        const res = mockResponse;
        getPaginationData(req, res, mockNext);
        expect(req.pages).toStrictEqual({
            currentPage: 0,
            notesPerPage: 18,
        });
    });
});
