import { Request, Response } from "express";
import GenerateAnswer from "../../services/openai";

const answerQuestion = async (req: Request, res: Response) => {
  const { question } = req.body;

  const completion = await GenerateAnswer(question);
  console.log(completion)

  res.status(200).json({answer: completion});
}

export default answerQuestion;