
export const createError = (msg, status=500) => {
    const err = new Error(msg);
    err.status = status;
    return err;
}