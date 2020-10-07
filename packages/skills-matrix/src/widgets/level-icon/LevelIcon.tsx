import { RenderResult } from '@dojo/framework/core/interfaces';
import { create, tsx } from '@dojo/framework/core/vdom';

import { Level } from '../../interfaces';

export interface LevelIconProperties {
	level?: Level;
	small?: boolean;
	onClick?: (level: Level) => void;
}

const factory = create().properties<LevelIconProperties>();

const SMALLSIZE = 16;
const NORMALSIZE = 22;

type IconFactory = (size: number) => RenderResult;

const LevelIcons: IconFactory[] = [
	function none(size) {
		return (
			<svg
				width={String(size)}
				height={String(size)}
				viewBox="0 0 22 22"
				preserveAspectRatio="xMidYMid meet"
				fill="none"
				xmlns="http://www.w3.org/2000/svg"
			>
				<path
					d="M21 11C21 16.5228 16.5228 21 11 21C5.47715 21 1 16.5228 1 11C1 5.47715 5.47715 1 11 1C16.5228 1 21 5.47715 21 11Z"
					fill="white"
					stroke="#D7D7D7"
					stroke-width="2"
					stroke-miterlimit="10"
				/>
			</svg>
		);
	},
	function basic(size) {
		return (
			<svg
				width={String(size)}
				height={String(size)}
				viewBox="0 0 22 22"
				fill="none"
				xmlns="http://www.w3.org/2000/svg"
			>
				<path
					d="M21 11C21 16.5228 16.5228 21 11 21C5.47715 21 1 16.5228 1 11C1 5.47715 5.47715 1 11 1C16.5228 1 21 5.47715 21 11Z"
					fill="white"
					stroke="#1ABC9C"
					stroke-width="2"
					stroke-miterlimit="10"
				/>
				<path d="M11 11H21.5V10L20 6.5L17 3L14 1.5L11 1V11Z" fill="#1ABC9C" />
				<circle cx="11" cy="11" r="11" fill="#1ABC9C" />
				<path
					d="M13.5761 10.632C14.0561 10.784 14.4321 11.04 14.7041 11.4C14.9761 11.752 15.1121 12.188 15.1121 12.708C15.1121 13.444 14.8241 14.012 14.2481 14.412C13.6801 14.804 12.8481 15 11.7521 15H7.40811V6.6H11.5121C12.5361 6.6 13.3201 6.796 13.8641 7.188C14.4161 7.58 14.6921 8.112 14.6921 8.784C14.6921 9.192 14.5921 9.556 14.3921 9.876C14.2001 10.196 13.9281 10.448 13.5761 10.632ZM9.34011 8.064V10.044H11.2721C11.7521 10.044 12.1161 9.96 12.3641 9.792C12.6121 9.624 12.7361 9.376 12.7361 9.048C12.7361 8.72 12.6121 8.476 12.3641 8.316C12.1161 8.148 11.7521 8.064 11.2721 8.064H9.34011ZM11.6081 13.536C12.1201 13.536 12.5041 13.452 12.7601 13.284C13.0241 13.116 13.1561 12.856 13.1561 12.504C13.1561 11.808 12.6401 11.46 11.6081 11.46H9.34011V13.536H11.6081Z"
					fill="white"
				/>
			</svg>
		);
	},
	function proficient(size) {
		return (
			<svg
				width={String(size)}
				height={String(size)}
				viewBox="0 0 22 22"
				fill="none"
				xmlns="http://www.w3.org/2000/svg"
			>
				<path
					d="M21 11C21 16.5228 16.5228 21 11 21C5.47715 21 1 16.5228 1 11C1 5.47715 5.47715 1 11 1C16.5228 1 21 5.47715 21 11Z"
					fill="white"
					stroke="#2ECC71"
					stroke-width="2"
					stroke-miterlimit="10"
				/>
				<path d="M11 11H21.5V10L20 6.5L17 3L14 1.5L11 1V11Z" fill="#2ECC71" />
				<path d="M11 11H21.5V12L20 15.5L17 19L14 20.5L11 21V11Z" fill="#2ECC71" />
				<circle cx="11" cy="11" r="11" fill="#2ECC71" />
				<path
					d="M11.2375 6.6C11.9815 6.6 12.6255 6.724 13.1695 6.972C13.7215 7.22 14.1455 7.572 14.4415 8.028C14.7375 8.484 14.8855 9.024 14.8855 9.648C14.8855 10.264 14.7375 10.804 14.4415 11.268C14.1455 11.724 13.7215 12.076 13.1695 12.324C12.6255 12.564 11.9815 12.684 11.2375 12.684H9.54547V15H7.60147V6.6H11.2375ZM11.1295 11.1C11.7135 11.1 12.1575 10.976 12.4615 10.728C12.7655 10.472 12.9175 10.112 12.9175 9.648C12.9175 9.176 12.7655 8.816 12.4615 8.568C12.1575 8.312 11.7135 8.184 11.1295 8.184H9.54547V11.1H11.1295Z"
					fill="white"
				/>
			</svg>
		);
	},
	function expert(size) {
		return (
			<svg
				width={String(size)}
				height={String(size)}
				viewBox="0 0 22 22"
				fill="none"
				xmlns="http://www.w3.org/2000/svg"
			>
				<path
					d="M21 11C21 16.5228 16.5229 21 11 21C5.47715 21 1 16.5228 1 11C1 5.47715 5.47715 1 11 1C16.5229 1 21 5.47715 21 11Z"
					fill="#3498DB"
					stroke="#3498DB"
					stroke-width="2"
					stroke-miterlimit="10"
				/>
				<circle cx="11" cy="11" r="11" fill="#3498DB" />
				<path
					d="M14.4746 13.44V15H7.97061V6.6H14.3186V8.16H9.90261V9.984H13.8026V11.496H9.90261V13.44H14.4746Z"
					fill="white"
				/>
			</svg>
		);
	}
];

export const LevelIcon = factory(function ({ properties }) {
	const { level = Level.None, small = false, onClick } = properties();
	return (
		<span
			onclick={() => {
				onClick && onClick(level);
			}}
		>
			{LevelIcons[level]?.(small ? SMALLSIZE : NORMALSIZE)}
		</span>
	);
});
