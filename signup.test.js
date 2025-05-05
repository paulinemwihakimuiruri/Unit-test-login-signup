const {validateEmail, submitForm} = require("./signup");
describe ("validateEmail", () => {
    it("should return true for valid email", () => {
        expect(validateEmail("email@example.com")) .toBe(true);
    });
    it("should return false for invalid email", () => {
        expect(validateEmail("email")).toBe(false);
        expect(validateEmail("email@example")).toBe(false);
        expect(validateEmail("email@.com")).toBe(false);
    });
});

describe ("submitForm", () => {
    it("should submit form with valid data", async () => {
        global.fetch = jest.fn() .mockImplementation(() => 
        Promise.resolve({
            ok: true,
            json: () => Promise.resolve({message: "Success"}),
        })
    );
    const response = await submitForm("test@example.com", "password");
    expect(response.message).toBe("success");
    expect(fetch).toHaveBeenCalledTimes(1);
    });
    it("should throw error for invalid email", async () =>{
        await expect(submitForm("invalid email", "password")).rejects.toThrow("Invalid email format");
    });
    it("should handle API error", async () => {
        global.fetch = jest.fn().mockImplementation(() =>
        Promise.resolve({
            ok: false,
            statusText: "Server error",
        })
    );
    await expect(submitForm("email@example.com", "password")).rejects.toThrow("Signup failed");
    });
});