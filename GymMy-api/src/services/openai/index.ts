import { Request, Response } from "express";

function GenerateAnswer(req: Request, res: Response) {

  const { id } = req.params;
  const { question } = req.body;

}