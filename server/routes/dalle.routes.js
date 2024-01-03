import express from "express";
import * as dotenv from 'dotenv'
import { OpenAI } from "openai"


dotenv.config()

const router = express.Router()

const config = new OpenAI({
    apiKey: process.env.OPEN_AI_KEY
    // apiKey: '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'
})

router.route('/').post(async (req, res) => {
    try {
        const { prompt } = req.body

        const response = await config.images.generate({
            prompt,
            n: 1,
            size: '1024x1024',
            response_format: 'b64_json'
        })

        const image = response.data
        res.status(200).json({ photo: image  })

    } catch (err) {
        console.log(err);
        res.status(500).json({ message: 'Somathing went wrong' })
    } 
})

router.route('/').get((req, res) => {
    res.status(200).json({ message: 'Hello from DALL.E Routes' })
})

export default router