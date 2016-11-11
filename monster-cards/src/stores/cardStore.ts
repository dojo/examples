import createStore, { CrudOptions, UpdateResults } from 'dojo-stores/store/createStore';
import createObservableStoreMixin, {
	ObservableStore, ObservableStoreOptions
} from 'dojo-stores/store/mixins/createObservableStoreMixin';
import { putCard } from './../actions/widgetStoreActions';

export interface Card {
	id: string;
	cardType: 'momentum' | 'mayhem';
	name: string;
	tagline: string;
	description: string;
	score: number;
	imageClass: string;
	favouriteCount: number;
}

type CardStoreFactory =
	<T, O extends CrudOptions, U extends UpdateResults<T>>(options?: ObservableStoreOptions<T, O>) => ObservableStore<T, O, U>

const cardStoreFactory: CardStoreFactory = createStore.mixin(createObservableStoreMixin());

const cards: Card[] = [
	{ id: 'card-momentum-1', cardType: 'momentum', name: 'Brainstorming', description: 'People\'s best ideas often come to them when they\'re alone, but so do their worst. Your team brainstorms to build on each other\'s great ideas.', score: 1, tagline: '', imageClass: 'Cards-Momentum1', favouriteCount: 0 },
	{ id: 'card-momentum-2', cardType: 'momentum', name: 'Clear Objectives', description: 'You tell your team that knowing the goal of the task is far more important than understanding the specific words of the request.', score: 3, tagline: '', imageClass: 'Cards-Momentum2', favouriteCount: 0 },
	{ id: 'card-momentum-3', cardType: 'momentum', name: 'Code Conventions', description: 'While tabs are superior to spaces in every way, the most important thing is that everyone on the project is structuring their code the same way.', score: 1, tagline: '', imageClass: 'Cards-Momentum3', favouriteCount: 0 },
	{ id: 'card-momentum-4', cardType: 'momentum', name: 'Code Reviews', description: 'The major benefit of your code review initiative wasn\'t reducing errors, but in the camaraderie it built between engineers.', score: 4, tagline: '', imageClass: 'Cards-Momentum4', favouriteCount: 0 },
	{ id: 'card-momentum-5', cardType: 'momentum', name: 'Collaboration', description: 'Through collaboration, your team sees more of the big picture then most, enabling them to make better decisions.', score: 1, tagline: '', imageClass: 'Cards-Momentum5', favouriteCount: 0 },
	{ id: 'card-momentum-6', cardType: 'momentum', name: 'Communication', description: 'Your team communicates effectively, helping to avoid last minute scrambles and missed milestones.', score: 3, tagline: '', imageClass: 'Cards-Momentum6', favouriteCount: 0 },
	{ id: 'card-momentum-7', cardType: 'momentum', name: 'Decision Makers', description: 'Your team feels empowered to make important real-time decisions, removing minor roadblocks before they impact the entire project.', score: 4, tagline: '', imageClass: 'Cards-Momentum7', favouriteCount: 0 },
	{ id: 'card-momentum-8', cardType: 'momentum', name: 'Delegation', description: 'You let your team know that you don\'t have to be involved in every decision. You trust them to use their judgement.', score: 2, tagline: '', imageClass: 'Cards-Momentum8', favouriteCount: 0 },
	{ id: 'card-momentum-9', cardType: 'momentum', name: 'Design Iteration', description: 'Your designers and developers iterate together to make sure that what\'s being designed and built delivers the best possible experience', score: 2, tagline: '', imageClass: 'Cards-Momentum9', favouriteCount: 0 },
	{ id: 'card-momentum-10', cardType: 'momentum', name: 'Donuts!', description: 'Let\'s be honest, we all revert to a childlike state when in the presence of sprinkled donuts.', score: 3, tagline: '', imageClass: 'Cards-Momentum10', favouriteCount: 0 },
	{ id: 'card-momentum-11', cardType: 'momentum', name: 'Feedback', description: 'You encourage the team to raise issues as they see them instead of letting them fester, even if the issue is you.', score: 2, tagline: '', imageClass: 'Cards-Momentum11', favouriteCount: 0 },
	{ id: 'card-momentum-12', cardType: 'momentum', name: 'Focused Meetings', description: 'You convinced "The Inviter" that the entire development team didn\'t need to attend the weekly marketing meeting.', score: 1, tagline: '', imageClass: 'Cards-Momentum12', favouriteCount: 0 },
	{ id: 'card-momentum-13', cardType: 'momentum', name: 'Future Proofing', description: 'Your team not only solves the immediate problem, but works hard to ensure they aren\'t creating new ones down the road.', score: 1, tagline: '', imageClass: 'Cards-Momentum13', favouriteCount: 0 },
	{ id: 'card-momentum-14', cardType: 'momentum', name: 'Hackathon', description: 'At the monthly hackathon you organized, the team came up with a clever way to improve the performance of your app.', score: 3, tagline: '', imageClass: 'Cards-Momentum14', favouriteCount: 0 },
	{ id: 'card-momentum-15', cardType: 'momentum', name: 'Integrated Teams', description: 'The project really started humming when you created small integrated teams of designers and engineers focused on specific features of the project.', score: 1, tagline: '', imageClass: 'Cards-Momentum15', favouriteCount: 0 },
	{ id: 'card-momentum-16', cardType: 'momentum', name: 'Leadership', description: 'You have built a team that believes leadership is a quality present in everyone and not inhereted from the top-down.', score: 4, tagline: '', imageClass: 'Cards-Momentum16', favouriteCount: 0 },
	{ id: 'card-momentum-17', cardType: 'momentum', name: 'Modern Tools', description: 'Moving to a modern toolchain cut down your build & deploy step from 12 minutes to 15 seconds.', score: 1, tagline: '', imageClass: 'Cards-Momentum17', favouriteCount: 0 },
	{ id: 'card-momentum-18', cardType: 'momentum', name: 'Open Source', description: 'Despite the Legal team\'s fears of exploits and foreign hackers, they finally agreed to let you use "Open Software", as long as you "close it up".', score: 2, tagline: '', imageClass: 'Cards-Momentum18', favouriteCount: 0 },
	{ id: 'card-momentum-19', cardType: 'momentum', name: 'Planning', description: 'Knowing you could not control the other team, you influenced them by leading by example and demonstrating you had a viable plan to follow.', score: 2, tagline: '', imageClass: 'Cards-Momentum19', favouriteCount: 0 },
	{ id: 'card-momentum-20', cardType: 'momentum', name: 'Prioritization', description: 'You looked the VP right in the eye and told him that if everything is a top priority, nothing is.', score: 2, tagline: '', imageClass: 'Cards-Momentum20', favouriteCount: 0 },
	{ id: 'card-momentum-21', cardType: 'momentum', name: 'Recognition', description: 'When a VP thanked you for your good work on the latest demo, you asked the VP to thank your team in person, as well.', score: 4, tagline: '', imageClass: 'Cards-Momentum21', favouriteCount: 0 },
	{ id: 'card-momentum-22', cardType: 'momentum', name: 'Recruiting', description: 'Hiring a great team has become your best recruiting tool. Smart people want to work with other smart people.', score: 1, tagline: '', imageClass: 'Cards-Momentum22', favouriteCount: 0 },
	{ id: 'card-momentum-23', cardType: 'momentum', name: 'Requirements', description: 'Your team reviews each requirement in detail before starting each milestone to identify any gray areas that can be quickly clarified.', score: 3, tagline: '', imageClass: 'Cards-Momentum23', favouriteCount: 0 },
	{ id: 'card-momentum-24', cardType: 'momentum', name: 'Reusable Code', description: 'You save the orginization months of development hours by setting up a shared code repository', score: 2, tagline: '', imageClass: 'Cards-Momentum24', favouriteCount: 0 },
	{ id: 'card-momentum-25', cardType: 'momentum', name: 'Solid Architecture', description: 'Your architecture weathered the storm of changing business needs, letting your team focus on quickly delivering business value.', score: 1, tagline: '', imageClass: 'Cards-Momentum25', favouriteCount: 0 },
	{ id: 'card-momentum-26', cardType: 'momentum', name: 'Testing Plan', description: 'Your team \'miraculously\' knew if their code was working before they shipped it, avoiding rework.', score: 4, tagline: '', imageClass: 'Cards-Momentum26', favouriteCount: 0 },
	{ id: 'card-momentum-27', cardType: 'momentum', name: 'The A-Team', description: 'Your team has been called in to save the day in a flailing project, and they turn it around, but you still \'don\'t pity the fool!', score: 1, tagline: '', imageClass: 'Cards-Momentum27', favouriteCount: 0 },
	{ id: 'card-momentum-28', cardType: 'momentum', name: 'Unit Testing', description: 'Woah! The new developer on the team made their first commit in under a day, and the unit tests saved them from breaking the build.', score: 1, tagline: '', imageClass: 'Cards-Momentum28', favouriteCount: 0 },
	{ id: 'card-momentum-29', cardType: 'momentum', name: 'Work/Life Balance', description: 'Your team offered to work the weekend to get ahead of the game, but you let them know that personal time was more important.', score: 1, tagline: '', imageClass: 'Cards-Momentum29', favouriteCount: 0 },
	{ id: 'card-momentum-30', cardType: 'momentum', name: 'Workshops', description: 'Technology moves fast, but you\'ve invested in your team by providing ongoing education. Your team is up to speed while others are stagnating.', score: 2, tagline: '', imageClass: 'Cards-Momentum30', favouriteCount: 0 },
	{ id: 'card-mayhem-1', cardType: 'mayhem', name: 'Blunderer', description: 'The build broke...again! Some people on your team know just enough to be dangerous.', score: 1, tagline: '', imageClass: 'Cards-Mayhem1', favouriteCount: 0 },
	{ id: 'card-mayhem-2', cardType: 'mayhem', name: 'Brain Drain', description: 'The only person who understands how your legacy app works just left for a hot, new startup.', score: 3, tagline: '', imageClass: 'Cards-Mayhem2', favouriteCount: 0 },
	{ id: 'card-mayhem-3', cardType: 'mayhem', name: 'Dead-Line', description: 'The VP of Sales informs you that your project will need to be finished a few weeks early. No biggie, right?', score: 1, tagline: '', imageClass: 'Cards-Mayhem3', favouriteCount: 0 },
	{ id: 'card-mayhem-4', cardType: 'mayhem', name: 'Dr. Deflector', description: 'Features were announced that aren\'t even on the roadmap. Somehow, it\'s your fault they won\'t be included.', score: 4, tagline: '', imageClass: 'Cards-Mayhem4', favouriteCount: 0 },
	{ id: 'card-mayhem-5', cardType: 'mayhem', name: 'Gen. Death March', description: 'Despite your plea for more time, the only thing you received was permission to work harder.', score: 1, tagline: '', imageClass: 'Cards-Mayhem5', favouriteCount: 0 },
	{ id: 'card-mayhem-6', cardType: 'mayhem', name: 'Grim Repo', description: 'The wrong branch was merged into production. Untangling this mess is going to be a nightmare.', score: 3, tagline: '', imageClass: 'Cards-Mayhem6', favouriteCount: 0 },
	{ id: 'card-mayhem-7', cardType: 'mayhem', name: 'King of Confusion', description: 'At a recent meeting to get everyone on the same page, it turned out that nobody was even in the same book.', score: 4, tagline: '', imageClass: 'Cards-Mayhem7', favouriteCount: 0 },
	{ id: 'card-mayhem-8', cardType: 'mayhem', name: 'Landmine', description: 'Half of the requirements say "TBD Later". It\'s well past later and nobody has determined anything.', score: 2, tagline: '', imageClass: 'Cards-Mayhem8', favouriteCount: 0 },
	{ id: 'card-mayhem-9', cardType: 'mayhem', name: 'Pet Pony', description: 'Just like a six-year-old who wants a pony, stakeholders want their new ideas implemented NOW!', score: 2, tagline: '', imageClass: 'Cards-Mayhem9', favouriteCount: 0 },
	{ id: 'card-mayhem-10', cardType: 'mayhem', name: 'Scope Creep', description: 'Apparently, a "few small changes" means 17 new user stories.', score: 3, tagline: '', imageClass: 'Cards-Mayhem10', favouriteCount: 0 },
	{ id: 'card-mayhem-11', cardType: 'mayhem', name: 'Slingshot', description: 'DevOps changed the authentication scheme but how it affects your project is "not their problem".', score: 2, tagline: '', imageClass: 'Cards-Mayhem11', favouriteCount: 0 },
	{ id: 'card-mayhem-12', cardType: 'mayhem', name: 'The Eraser', description: 'The only thing complete about the UI design is how completely lacking it is in detail.', score: 1, tagline: '', imageClass: 'Cards-Mayhem12', favouriteCount: 0 },
	{ id: 'card-mayhem-13', cardType: 'mayhem', name: 'The Gambler', description: 'The closer the deadline gets, the more liberal your team becomes with the definition of "done".', score: 1, tagline: '', imageClass: 'Cards-Mayhem13', favouriteCount: 0 },
	{ id: 'card-mayhem-14', cardType: 'mayhem', name: 'The Horde', description: 'Instead of more time to meet your requirements, you got a dozen untrained interns to "help".', score: 3, tagline: '', imageClass: 'Cards-Mayhem14', favouriteCount: 0 },
	{ id: 'card-mayhem-15', cardType: 'mayhem', name: 'The Inventor', description: 'When discussing what framework to use, an enthusiastic voice says, "We\'ll just roll our own!"', score: 1, tagline: '', imageClass: 'Cards-Mayhem15', favouriteCount: 0 },
	{ id: 'card-mayhem-16', cardType: 'mayhem', name: 'The Inviter', description: 'You and your team have been invited to daily meetings to discuss your "lack of progress".', score: 4, tagline: '', imageClass: 'Cards-Mayhem16', favouriteCount: 0 },
	{ id: 'card-mayhem-17', cardType: 'mayhem', name: 'The Juggler', description: 'Flimsy dates, changing priorities and bad assumptions are the pillars of your project manager\'s master plan!', score: 1, tagline: '', imageClass: 'Cards-Mayhem17', favouriteCount: 0 },
	{ id: 'card-mayhem-18', cardType: 'mayhem', name: 'Sigh-Low', description: 'While on a conference call it becomes painfully clear...two different teams just completed the same work.', score: 2, tagline: '', imageClass: 'Cards-Mayhem18', favouriteCount: 0 },
	{ id: 'card-mayhem-19', cardType: 'mayhem', name: 'Caveman Coder', description: 'You brought in a contractor, who smashed your code until it "worked" and then he committed it to master.', score: 2, tagline: '', imageClass: 'Cards-Mayhem19', favouriteCount: 0 }
];

const cardStore = cardStoreFactory();

export function bindActions() {
	return cardStore.add(cards).then(function(cards) {
		return putCard.do(cards);
	});
}

export default cardStore;
