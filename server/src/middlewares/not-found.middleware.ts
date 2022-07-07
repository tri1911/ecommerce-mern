import { Request, Response } from "express";

const notFoundHandler = (_request: Request, response: Response) => {
  response.status(404).send({ error: "Unknown endpoint" });
};

export default notFoundHandler;
