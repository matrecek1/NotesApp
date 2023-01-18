import { Request, Response, NextFunction } from "express";
import { addDate } from '../../src/middleware/notes/addDate'

describe("AddDate middleware", () => {
    let mockRequest: Partial<Request>;
    let mockResponse: Partial<Response>;
    let nextFunction: NextFunction = jest.fn();
    beforeEach(() => {
        mockRequest = {
            body: {
                note: {
                    title: "Note"
                }
            }
        };
        mockResponse = {
            // json: jest.fn()
        };
    });
    test('adds date', async () => {
        const expectedResponse = {
            "error": "Missing JWT token from the 'Authorization' header"
        };
        addDate(mockRequest as Request, mockResponse as Response, nextFunction);
        expect(mockRequest.body.note.dateOfCreation instanceof Date).toBeTruthy();
    });
    test('other keys not changed', async () => {
        addDate(mockRequest as Request, mockResponse as Response, nextFunction);
        expect(mockRequest.body.note.title).toStrictEqual("Note");
    })

})

