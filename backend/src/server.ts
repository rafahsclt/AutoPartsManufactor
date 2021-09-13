import "reflect-metadata";
import "express-async-errors"

import express, { NextFunction, Request, Response } from 'express'
import cors from "cors";

import { routes } from './routes'

import { AppError } from './errors/AppError';
import uploadConfig from './config/upload'

import './database'

const app = express()

app.use(express.json())
app.use(cors())

app.use('/avatar', express.static(uploadConfig.avatarFolder))
app.use('/files', express.static(uploadConfig.defaultDirectory))
app.use(routes)

routes.use((err: Error, req: Request, resp: Response, next: NextFunction) => {
  if(err instanceof AppError) {
    return resp.status(err.statusCode).json({ error: err.message })
  }

  return resp.status(500).json({
    status: "error",
    message: `Internal server error. - ${err.message}`
  })
})

app.listen(3333, () => {
  console.log('Server running at port 3333')
})