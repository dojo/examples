import createMemoryStore, { MemoryStore } from 'dojo-stores/createMemoryStore';
import { putCard } from './../actions/widgetStoreActions';

export interface Card {
	id: string;
	cardType: 'momentum' | 'mayhem';
	name: string;
	tagline: string;
	description: string;
	score: number;
	cardImage: string;
	favouriteCount: number;
}

export type Store = MemoryStore<Card>;

const cardStore: Store = createMemoryStore<Card>({
	data: [
		{ id: 'card-1', cardType: 'momentum', name: 'Brainstorming', description: 'People\'s best ideas often come to them when they\'re alone, but so do their worst. Your team brainstorms to build on each other\'s great ideas.', score: 1, tagline: '', cardImage: 'images/horde.png', favouriteCount: 0 },
		{ id: 'card-2', cardType: 'momentum', name: 'Clear Objectives', description: 'You tell your team that knowing the goal of the task is far more important than understanding the specific words of the request.', score: 3, tagline: '', cardImage: 'images/landmine.png', favouriteCount: 0 },
		{ id: 'card-3', cardType: 'momentum', name: 'Code Conventions', description: 'While tabs are superior to spaces in every way, the most important thing is that everyone on the project is structuring their code the same way.', score: 1, tagline: '', cardImage: 'images/horde.png', favouriteCount: 0 },
		{ id: 'card-4', cardType: 'momentum', name: 'Code Reviews', description: 'The major benefit of your code review initiative wasn\'t reducing errors, but in the camaraderie it built between engineers.', score: 4, tagline: '', cardImage: 'images/landmine.png', favouriteCount: 0 },
		{ id: 'card-5', cardType: 'momentum', name: 'Code Reviews', description: 'The major benefit of your code review initiative wasn\'t reducing errors, but in the camaraderie it built between engineers.', score: 4, tagline: '', cardImage: 'images/horde.png', favouriteCount: 0 },
		{ id: 'card-6', cardType: 'momentum', name: 'Collaboration', description: 'Through collaboration, your team sees more of the big picture then most, enabling them to make better decisions.', score: 1, tagline: '', cardImage: 'images/horde.png', favouriteCount: 0 },
		{ id: 'card-7', cardType: 'momentum', name: 'Communication', description: 'Your team communicates effectively, helping to avoid last minute scrambles and missed milestones.', score: 3, tagline: '', cardImage: 'images/landmine.png', favouriteCount: 0 },
		{ id: 'card-8', cardType: 'momentum', name: 'Decision Makers', description: 'Your team feels empowered to make important real-time decisions, removing minor roadblocks before they impact the entire project.', score: 4, tagline: '', cardImage: 'images/horde.png', favouriteCount: 0 },
		{ id: 'card-9', cardType: 'momentum', name: 'Delegation', description: 'You let your team know that you don\'t have to be involved in every decision. You trust them to use their judgement.', score: 2, tagline: '', cardImage: 'images/landmine.png', favouriteCount: 0 },
		{ id: 'card-10', cardType: 'momentum', name: 'Design Iteration', description: 'Your designers and developers iterate together to make sure that what\'s being designed and built delivers the best possible experience', score: 2, tagline: '', cardImage: 'images/horde.png', favouriteCount: 0 },
		{ id: 'card-11', cardType: 'momentum', name: 'Donuts!', description: 'Let\'s be honest, we all revert to a childlike state when in the presence of sprinkled donuts.', score: 3, tagline: '', cardImage: 'images/horde.png', favouriteCount: 0 },
		{ id: 'card-12', cardType: 'momentum', name: 'Feedback', description: 'You encourage the team to raise issues as they see them instead of letting them fester, even if the issue is you.', score: 2, tagline: '', cardImage: 'images/landmine.png', favouriteCount: 0 },
		{ id: 'card-13', cardType: 'momentum', name: 'Focused Meetings', description: 'You convinced "The Inviter" that the entire development team didn\'t need to attend the weekly marketing meeting.', score: 1, tagline: '', cardImage: 'images/horde.png', favouriteCount: 0 },
		{ id: 'card-14', cardType: 'momentum', name: 'Future Proofing', description: 'Your team not only solves the immediate problem, but works hard to ensure they aren\'t creating new ones down the road.', score: 1, tagline: '', cardImage: 'images/landmine.png', favouriteCount: 0 },
		{ id: 'card-15', cardType: 'momentum', name: 'Hackathon', description: 'At the monthly hackathon you organized, the team came up with a clever way to improve the performance of your app.', score: 3, tagline: '', cardImage: 'images/horde.png', favouriteCount: 0 },
		{ id: 'card-16', cardType: 'momentum', name: 'Integrated Teams', description: 'The project really started humming when you created small integrated teams of designers and engineers focused on specific features of the project.', score: 1, tagline: '', cardImage: 'images/horde.png', favouriteCount: 0 },
		{ id: 'card-17', cardType: 'momentum', name: 'Leadership', description: 'You have built a team that believes leadership is a quality present in everyone and not inhereted from the top-down.', score: 4, tagline: '', cardImage: 'images/horde.png', favouriteCount: 0 },
		{ id: 'card-18', cardType: 'momentum', name: 'Modern Tools', description: 'Moving to a modern toolchain cut down your build & deploy step from 12 minutes to 15 seconds.', score: 1, tagline: '', cardImage: 'images/horde.png', favouriteCount: 0 },
		{ id: 'card-19', cardType: 'momentum', name: 'Modern Tools', description: 'Moving to a modern toolchain cut down your build & deploy step from 12 minutes to 15 seconds.', score: 1, tagline: '', cardImage: 'images/horde.png', favouriteCount: 0 },
		{ id: 'card-20', cardType: 'momentum', name: 'Open Source', description: 'Despite the Legal team\'s fears of exploits and foreign hackers, they finally agreed to let you use "Open Software", as long as you "close it up".', score: 2, tagline: '', cardImage: 'images/horde.png', favouriteCount: 0 },
		{ id: 'card-21', cardType: 'momentum', name: 'Planning', description: 'Knowing you could not control the other team, you influenced them by leading by example and demonstrating you had a viable plan to follow.', score: 2, tagline: '', cardImage: 'images/horde.png', favouriteCount: 0 },
		{ id: 'card-22', cardType: 'momentum', name: 'Prioritization', description: 'You looked the VP right in the eye and told him that if everything is a top priority, nothing is.', score: 2, tagline: '', cardImage: 'images/horde.png', favouriteCount: 0 },
		{ id: 'card-23', cardType: 'momentum', name: 'Recognition', description: 'When a VP thanked you for your good work on the latest demo, you asked the VP to thank your team in person, as well.', score: 4, tagline: '', cardImage: 'images/horde.png', favouriteCount: 0 },
		{ id: 'card-24', cardType: 'momentum', name: 'Recruiting', description: 'Hiring a great team has become your best recruiting tool. Smart people want to work with other smart people.', score: 1, tagline: '', cardImage: 'images/horde.png', favouriteCount: 0 },
		{ id: 'card-25', cardType: 'momentum', name: 'Requirements', description: 'Your team reviews each requirement in detail before starting each milestone to identify any gray areas that can be quickly clarified.', score: 3, tagline: '', cardImage: 'images/horde.png', favouriteCount: 0 },
		{ id: 'card-26', cardType: 'momentum', name: 'Reusable Code', description: 'You save the orginization months of development hours by setting up a shared code repository', score: 2, tagline: '', cardImage: 'images/horde.png', favouriteCount: 0 },
		{ id: 'card-27', cardType: 'momentum', name: 'Reusable Code', description: 'You save the orginization months of development hours by setting up a shared code repository', score: 2, tagline: '', cardImage: 'images/horde.png', favouriteCount: 0 },
		{ id: 'card-28', cardType: 'momentum', name: 'Solid Architecture', description: 'Your architecture weathered the storm of changing business needs, letting your team focus on quickly delivering business value.', score: 1, tagline: '', cardImage: 'images/horde.png', favouriteCount: 0 },
		{ id: 'card-29', cardType: 'momentum', name: 'Testing Plan', description: 'Your team \'miraculously\' knew if their code was working before they shipped it, avoiding rework.', score: 4, tagline: '', cardImage: 'images/horde.png', favouriteCount: 0 },
		{ id: 'card-30', cardType: 'momentum', name: 'The A-Team', description: 'Your team has been called in to save the day in a flailing project, and they turn it around, but you still \'don\'t pity the fool!', score: 1, tagline: '', cardImage: 'images/horde.png', favouriteCount: 0 },
		{ id: 'card-31', cardType: 'momentum', name: 'Unit Testing', description: 'Woah! The new developer on the team made their first commit in under a day, and the unit tests saved them from breaking the build.', score: 1, tagline: '', cardImage: 'images/horde.png', favouriteCount: 0 },
		{ id: 'card-32', cardType: 'momentum', name: 'Work/Life Balance', description: 'Your team offered to work the weekend to get ahead of the game, but you let them know that personal time was more important.', score: 1, tagline: '', cardImage: 'images/horde.png', favouriteCount: 0 },
		{ id: 'card-33', cardType: 'momentum', name: 'Workshops', description: 'Technology moves fast, but you\'ve invested in your team by providing ongoing education. Your team is up to speed while others are stagnating.', score: 2, tagline: '', cardImage: 'images/horde.png', favouriteCount: 0 },
		{ id: 'card-34', cardType: 'momentum', name: 'Workshops', description: 'Technology moves fast, but you\'ve invested in your team by providing ongoing education. Your team is up to speed while others are stagnating.', score: 2, tagline: '', cardImage: 'images/horde.png', favouriteCount: 0 }
	]
});

export interface ChangeRecord {
	beforeAll: Card[];
	afterAll: Card[];
	deletes: string[];
	puts: Card[];
}

export function bindActions() {
	return cardStore.observe().subscribe((options: any) => {
			const changeRecord = <ChangeRecord> options;

			return putCard.do(changeRecord);
	});
}

export default cardStore;
