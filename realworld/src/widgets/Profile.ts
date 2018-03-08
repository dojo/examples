import { WidgetBase } from '@dojo/widget-core/WidgetBase';
import { v, w } from '@dojo/widget-core/d';
import { Link } from '@dojo/routing/Link';
import FeedsContainer from '../containers/FeedsContainer';
import { FollowUserPayload } from '../processes/interfaces';

export interface ProfileProperties {
	username: string;
	bio: string;
	image: string;
	type: string;
	following: boolean;
	currentUser: string;
	followUser: (opts: FollowUserPayload) => void;
}

export class Profile extends WidgetBase<ProfileProperties> {
	private _onFollowUser() {
		const { followUser, following, username } = this.properties;
		followUser({ username, following });
	}

	// prettier-ignore
	protected render() {
		let { currentUser, username, bio, image, type, following } = this.properties;
		const isCurrentUser = currentUser === username;

		return v('div', { classes: 'profile-page' }, [
			v('div', { classes: 'user-info' }, [
				v('div', { classes: 'container' }, [
					v('div', { classes: 'row' }, [
						v('div', { classes: ['col-xs-12', 'col-md-10', 'offset-md-1'] }, [
							v('img', { src: image, classes: 'user-img' }),
							v('h4', [username]),
							v('p', [bio]),
							isCurrentUser
								? w(Link, {
									to: 'settings',
									classes: ['btn', 'btn-sm', 'btn-outline-secondary', 'action-btn']
								}, [v('i', { classes: 'ion-edit' }), ' Edit Profile Settings'])
								: v('button', {
									onclick: this._onFollowUser,
									classes: [
										'btn',
										'btn-sm',
										following ? 'btn-secondary' : 'btn-outline-secondary',
										'action-btn'
									]
								}, [
									v('i', { classes: 'ion-plus-round' }),
									following ? ' UnFollow ' : ' Follow ',
									username
								])
						])
					])
				])
			]),
			v('div', { classes: 'container' }, [
				v('div', { classes: 'row' }, [w(FeedsContainer, { key: username, type, username })])
			])
		]);
	}
}
