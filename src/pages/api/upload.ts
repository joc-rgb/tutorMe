import aws from 'aws-sdk'
import type { NextApiRequest, NextApiResponse } from 'next'

export default async function handler(req:NextApiRequest,res:NextApiResponse){
  try {
    // 1.
    const s3 = new aws.S3({
      accessKeyId: process.env.APP_AWS_ACCESS_KEY,
      secretAccessKey: process.env.APP_AWS_SECRET_KEY,
      region: process.env.APP_AWS_REGION,
      signatureVersion: 'v4',
    })

    // 2.
    aws.config.update({
      accessKeyId: process.env.APP_AWS_ACCESS_KEY,
      secretAccessKey: process.env.APP_AWS_SECRET_KEY,
      region: process.env.APP_AWS_REGION,
      
    })

    // 3.
    const preSignedUrl = await s3.getSignedUrl("putObject",{
      Bucket: process.env.AWS_S3_BUCKET_NAME,
      Key: req.query.file,
      Expires: 60, // seconds
      
    })

    // 4.
    return res.status(200).json({
      "url": preSignedUrl
  })
  } catch (error) {
    console.log(error)
  }
}