require("dotenv").config();
import { Client, LogLevel } from "@notionhq/client";

const apiToken: string = process.env.NOTION_API_SECRET || "";
const notion = new Client({
	auth: apiToken,
	logLevel: LogLevel.DEBUG,
});

// (async () => {
// 	const listUsersResponse = await notion.users.list();
// 	console.log(JSON.stringify(listUsersResponse, null, 2));
// })();

async function main() {
	const pageId = "21f68408d92147ee80254eeecc2ae46f";
	const title = "This is a long ...";
	const message =
		"This is a long message from whatsapp that im sending here that has a link https://google.com";
	const myPage = await notion.pages.retrieve({
		page_id: pageId,
	});

	const blocksInPage = await notion.blocks.children.list({
		block_id: pageId,
		page_size: 100,
	});

	// const myDatabases = await notion.search({
	// 	query: "Programs",
	// 	filter: {
	// 		property: "object",
	// 		value: "database",
	// 	},
	// });

	const resp = await notion.pages.create({
		parent: {
			page_id: pageId,
		},
		properties: {
			title: {
				title: [
					{
						type: "text",
						text: {
							content: title,
						},
					},
				],
			} as any,
		},
		children: [
			{
				object: "block",
				type: "paragraph",
				paragraph: {
					text: [
						{
							type: "text",
							text: {
								content: message,
							},
							plain_text: message,
						},
					],
				},
			} as any,
		],
	});

	console.log("Blocks in My Page", JSON.stringify(resp, null, 2));
}

main();
