import { generateGuid } from '$lib/generateGuid';

function sufferCards<T>(cards: T[]) {
	return [...cards, ...cards]
		.sort(() => Math.random() - 0.5)
		.map((flag) => ({ ...flag, id: generateGuid() }));
}

export default sufferCards;
