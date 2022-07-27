import { getSellerAds } from '@/lib/db-admin';
import { auth } from '@/lib/firebase-admin';

// eslint-disable-next-line import/no-anonymous-default-export
export default async (req: any, res: any) => {
  try {
    console.log('sites api');
    const { uid } = await auth.verifyIdToken(req.headers.token);
    const { ads }: any = await getSellerAds(uid);
    console.log('res');
    console.log(ads);
   // console.log(res);
    res.status(200).json({ ads });
  } catch (error) {
    res.status(500).json({ error });
  }
};