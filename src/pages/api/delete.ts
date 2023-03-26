import aws from "aws-sdk";
import { NextApiRequest, NextApiResponse } from "next";
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
  const params = {
    Bucket: 'tutorme',
    Key: req.query.key as string,
  };
  
    await s3.deleteObject(params).promise();
    console.log(`Successfully deleted image: ${req.query.key}`);
    res.statusCode = 200;
    res.end(JSON.stringify(res));
  } catch (error) {
    console.log(`Error deleting image: ${error}`);
  }
}

// Call the deleteImage function with the image key
//deleteImage("your-image-key.jpg");
