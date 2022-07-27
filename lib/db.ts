import firebase from './firebase';

const firestore = firebase.firestore();

export function createUser(uid: any, data: any) {
	return firestore
		.collection('sellers')
		.doc(uid)
		.set({uid, ...data}, {merge: true})
}

export function createSite(data: any) {
	const site = firestore.collection('sites').doc();
	site.set(data);

	return site;
}

export function createFeedback(data: any) {
	return firestore.collection('feedback')
		.add(data);
}

export function deleteFeedback(id: any) {
	return firestore.collection('feedback').doc(id).delete();
}

// pellet thing

export async function createAd(data: any): Promise<any> {
	const site = firestore.collection('ads').doc();
	await site.set(data);

	return Promise.resolve(site);
}

export async function editAd(data: any, id: any): Promise<any> {
	const site = firestore.collection('ads').doc(id);
	await site.set(data, {merge: true});

	return Promise.resolve(site);
}