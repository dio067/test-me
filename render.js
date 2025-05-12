import path from "path";
import jsdom from "jsdom";
const { JSDOM } = jsdom;

export default async (filename) => {
	const filePath = path.join(process.cwd(), filename);

	const dom = await JSDOM.fromFile(filePath, {
		runScripts: "dangerously",
		resources: "usable",
	});
	return dom;
};
