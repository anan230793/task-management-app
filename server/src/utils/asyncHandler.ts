import { NextFunction, Request, Response } from 'express';

export const asyncHandler =
  <TReq extends Request = Request, TRes extends Response = Response>(
    fn: (req: TReq, res: TRes, next: NextFunction) => Promise<unknown>,
  ) =>
  (req: TReq, res: TRes, next: NextFunction): void => {
    Promise.resolve(fn(req, res, next)).catch(next);
  };