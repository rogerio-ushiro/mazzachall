
export class DuplicateDataError extends Error {
    constructor(message: string) {
        super(message);
        this.name = "DuplicateDataError";
    }
}