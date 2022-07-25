import firebase from './firebase';

const firestore = firebase.firestore();

export function createUser(uid, data) {
	return firestore
		.collection('sellers')
		.doc(uid)
		.set({uid, ...data}, {merge: true})
}

export function createSite(data) {
	const site = firestore.collection('sites').doc();
	site.set(data);

	return site;
}

export function createFeedback(data) {
	return firestore.collection('feedback')
		.add(data);
}

export function deleteFeedback(id) {
	return firestore.collection('feedback').doc(id).delete();
}

// pellet thing

export async function createAd(data): Promise<any> {
	const site = firestore.collection('ads').doc();
	await site.set(data);

	return Promise.resolve(site);
}

export async function editAd(data, id): Promise<any> {
	const site = firestore.collection('ads').doc(id);
	await site.set(data, {merge: true});

	return Promise.resolve(site);
}