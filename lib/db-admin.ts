import { compareDesc, parseISO } from 'date-fns';

import {db} from './firebase-admin';

export async function getAllFeedback(siteId) {
  try {
    const snapshot = await db
      .collection('feedback')
      .where('siteId', '==', siteId)
      .get();

    const feedback = [];

    snapshot.forEach((doc) => {
      feedback.push({ id: doc.id, ...doc.data() });
    });

    // maybe we can do this with firestore directly?
    feedback.sort((a, b) =>
      compareDesc(parseISO(a.createdAt), parseISO(b.createdAt))
    );

    return { feedback };
  } catch (error) {
    return { error };
  }
}

export async function getAllSites() {
  const snapshot = await db.collection('sites').get();

  const sites = [];

  snapshot.forEach((doc) => {
    sites.push({ id: doc.id, ...doc.data() });
  });

  return { sites };
}

export async function getUserSites(uid) {
  const sitesRef = db.collection('sites');
  const snapshot = await sitesRef
    .where('authorId', '==', uid)
    .orderBy('createdAt')
    .get();
  if (snapshot.empty) {
    return;
  }  

  const sites = [];
  snapshot.forEach((doc) => {
    sites.push({ id: doc.id, ...doc.data() });
  });

  return { sites };
}

export async function getUserFeedback(uid) {
  const snapshot = await db
    .collection('feedback')
    .where('authorId', '==', uid)
    .get();

  const feedback = [];

  snapshot.forEach((doc) => {
    feedback.push({ id: doc.id, ...doc.data() });
  });

  return { feedback };
}

export async function getUser(uid) {
  const snapshot = await db
    .collection('sellers')
    .where('uid', '==', uid)
    .get();

  const userOld = [];

  snapshot.forEach((doc) => {
    userOld.push({ ...doc.data() });
  });

  return { userOld };
}

// pellet thing

export async function getSellerAds(uid) {
  const sitesRef = db.collection('ads');
  const snapshot = await sitesRef
    .where('sellerId', '==', uid)
    .orderBy('createdAt')
    .get();
  if (snapshot.empty) {
    return;
  }  

  const ads = [];
  snapshot.forEach((doc) => {
    ads.push({ id: doc.id, ...doc.data() });
  });

  return { ads };
}

export async function getAllSellerAds() {
  const snapshot = await db.collection('ads').get();

  const ads = [];

  snapshot.forEach((doc) => {
    ads.push({ id: doc.id, ...doc.data() });
  });

  return { ads };
}


export async function getSellerAd(adId) {
  try {
    const snapshot = await db
      .collection('ads')
      .doc(adId)
      .get()
    

    const feedback = [];

    // snapshot.forEach((doc) => {
    //   feedback.push({ id: doc.id, ...doc.data() });
    // });

    // // maybe we can do this with firestore directly?
    // feedback.sort((a, b) =>
    //   compareDesc(parseISO(a.createdAt), parseISO(b.createdAt))
    // );
    console.log('snapping');
    console.log(snapshot.data());

    return { ad: snapshot.data() };
  } catch (error) {
    return { error };
  }
}