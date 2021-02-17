const searchInput = document.getElementById("search");
const todos = document.querySelector(".list");
const form = document.querySelector("form");
const btn = form.querySelector("button");

const demoLists = [
	{ text: "Practice Javascript" },
	{ text: "Contribute to Joey" },
	{ text: "Improve perf for 360" },
];

const newLists = [];
let filteredList = [];
let hasRendered = false;

const onAdd = (event) => {
	event.preventDefault();
	const li = document.createElement("li");
	const checkbox = document.createElement("checkbox");
	const span = document.createElement("span");
	li.insertAdjacentElement("afterbegin", checkbox);
	li.insertAdjacentElement("beforeend", span);
	const item = form.item.value.trim();
	if (item.length) {
		span.textContent = item;
		newLists.push(li);
		todos.append(li);
		form.reset();
	}
};

const render = (items, demo = false) => {
	if (!demo) {
		items.forEach((item) => {
			todos.append(item);
		});
	}

	items.forEach((item) => {
		const list = document.createElement("li");
		list.textContent = item.text;
		newLists.push(list);
		todos.appendChild(list);
	});
};

const onSearch = (event) => {
	const searchValue = event.target.value.trim().toLowerCase();
	if (searchValue) {
		hasRendered = false;
		filteredList = newLists
			.filter(
				(item) => !item.textContent.toLowerCase().includes(searchValue)
			)
			.forEach((item) => {
				item.classList.add("filter");
			});

		filteredList = newLists
			.filter((item) => item.textContent.toLowerCase().includes(searchValue))
			.forEach((item) => {
				item.classList.remove("filter");
			});
	}
	if (searchValue.length === 0) {
		newLists.forEach((item) => item.classList.remove("filter"));
	}
};

if (todos.childElementCount === 0) {
	render(demoLists, true);
}

form.addEventListener("submit", onAdd);
searchInput.addEventListener("keyup", onSearch);
