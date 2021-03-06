import { auth } from '@/lib/firebase-admin';
import { getUserSites } from '@/lib/db-admin';

// eslint-disable-next-line import/no-anonymous-default-export
export default async (req: any, res: any) => {
  try {
    console.log('sites api');
    const { uid }: any = await auth.verifyIdToken(req.headers.token);
    const { sites }: any = await getUserSites(uid);
    console.log('res');
    console.log(sites);
   // console.log(res);
    res.status(200).json({ sites });
  } catch (error) {
    res.status(500).json({ error });
  }
};