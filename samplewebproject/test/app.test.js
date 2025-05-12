import assert from "assert";

it("has a text input", async () => {
	const dom = await render("index.html");

	const input = dom.window.document.querySelector("input");

	assert(input);
});

it("shows a succsess message with a vaild email", async () => {
	const dom = await render("index.html");

	const input = dom.window.document.querySelector("input");
	input.value = "jda;jfkd@gmail.com";
	dom.widnow.document
		.querySelector("form")
		.dispatchEvent(new dom.window.Event("submit"));

	const h1 = dom.window.document.querySelector("h1");

	console.log("contents of h1", h1.innerHTML);
});
