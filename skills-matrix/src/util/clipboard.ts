export async function copyToClipboard(text: string) {
	try {
		if (navigator.clipboard) {
			await copyWithClipboardApi(text);
			return true;
		}
	} catch (e) {
		console.log(`Failed to copy ${e}`);
	}
	try {
		return copyWithExecCommand(text);
	} catch (e) {
		console.log(`failed to copy using fallback`);
	}
	return false;
}

function copyWithClipboardApi(text: string) {
	return navigator.clipboard.writeText(text);
}

function copyWithExecCommand(text: string) {
	const result = document.execCommand('copy');
	if (!result) {
		console.log('Failed to copy using fallback');
	}
}
