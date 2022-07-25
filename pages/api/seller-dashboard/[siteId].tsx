/* eslint-disable import/no-anonymous-default-export */
import { getSellerAd } from '@/lib/db-admin';
import { db } from '@/lib/firebase-admin';

export default async (req, res) => {
  const siteId = req.query.siteId;
  const { ad, error } = await getSellerAd(siteId);

  if (error) {
    res.status(500).json({ error });
  }

  res.status(200).json({ ad });
};