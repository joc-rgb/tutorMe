import  {prisma} from '../../../lib/prisma';
import type { NextApiRequest, NextApiResponse } from 'next';

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  const { email,name,
     secret } = req.body;

     console.log(req.body)
  // 1
  if (req.method !== 'POST') {
    return res.status(403).json({ message: 'Method not allowed' });
  }
  // 2
  if (secret !== process.env.AUTH0_HOOK_SECRET) {
    return res.status(403).json({ message: `You must provide the secret 🤫` });
  }
  // 3
  try {
    // 4
    if (email) {
    
  
    await prisma.user.create({
      data: { email:email as string, name: name as string },
    });
    return res.status(200).json({
      message: `User with email: ${email} has been created successfully!`,
    });}
  } catch (error) {
    console.log(error)
  }  
};

export default handler;