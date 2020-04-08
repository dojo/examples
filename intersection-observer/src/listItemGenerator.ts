/*
 * Nonsense content generation to keep our infinite list interesting.
 */

const titles = [
	'Double Your Profit with These [number] tips on [subject]',
	'[number] Easy Ways You Can Turn [subject] Into Success',
	'Can You Pass The [subject] Test?',
	'Why Ignoring [subject] Will Cost You Time And Sales',
	'[number] Methods Of [subject] [goal]',
	"What [organization] Doesn't Want You To Know About [subject]",
	'The Aliens Are Sneaking [subject] Into America. What You Need To Know For [better]',
	'Clear And Unbiased Facts About [subject] (Without All The Hype)',
	'[subject] Is Bound To Make An Impact On Your [location]',
	'At Last, The Secret To [subject] Revealed',
	'Take The Stress Out Of [subject]',
	'[number] Easy Ways To Make [subject] [better]',
	'Lies About [subject]',
	'Top [number] Ways To Buy Used [subject]',
	'Improve Your [subject] In [number] Days',
	'[better] [subject] In [number] Easy Steps',
	'Proof That [subject] Are Exactly What You Are Looking For',
	'[subject] Becoming A Challenge? [number] Tips for [subject] [better]',
	"The [organization]'s Secret Campaign Against [subject]",
	"Drone Overhead? Why [organization] Can't Have You Panic"
];

const subjects = ['Waning Gibbous', 'Government Test Sites', 'Tin Foil Hats', 'Cats'];

const goals = ['Success', 'Domination', 'Happiness'];

const locations = ['Life', 'Business', "Mother's Basement", 'Cat'];

const betters = ['Faster', 'Stronger', 'Successful'];

const organizations = ['The Government', 'The CIA', 'The FBI', 'Math Teachers'];

function generateArticleTitle() {
	const template = titles[Math.floor(Math.random() * titles.length)];

	return template.replace(/\[[^\]]+\]/g, (match) => {
		switch (match) {
			case '[number]':
				return String(Math.round(Math.random() * 14) + 1);
			case '[subject]':
				return subjects[Math.floor(Math.random() * subjects.length)];
			case '[goal]':
				return goals[Math.floor(Math.random() * goals.length)];
			case '[location]':
				return locations[Math.floor(Math.random() * locations.length)];
			case '[better]':
				return betters[Math.floor(Math.random() * betters.length)];
			case '[organization]':
				return organizations[Math.floor(Math.random() * organizations.length)];
		}

		return match;
	});
}

/**
 * Grabs content for our list. This is async because it could be pulling data from a server.
 */
export function getListItems(count = 10): Promise<{ title: string; summary: string }[]> {
	const articles: any[] = [];

	for (let i = 0; i < count; i++) {
		const sentences = Math.round(Math.random() * 3);

		let summary = generateArticleTitle();
		for (let j = 0; j < sentences; j++) {
			summary += '. ' + generateArticleTitle();
		}

		articles.push({
			title: generateArticleTitle(),
			summary
		});
	}

	return new Promise<{ title: string; summary: string }[]>((resolve) => {
		setTimeout(() => {
			resolve(articles);
		}, 300);
	});
}
