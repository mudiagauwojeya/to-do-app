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

const createListItem = () => {
	const li = document.createElement("li");
	const checkbox = document.createElement("input");
	checkbox.setAttribute("type", "checkbox");
	const span = document.createElement("span");
	li.prepend(checkbox);
	li.append(span);

	return li;
};

const onAdd = (event) => {
	event.preventDefault();
	const item = form.item.value.trim();
	if (item.length) {
		const li = createListItem();
		li.querySelector("span").textContent = item;
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
		const li = createListItem();
		li.querySelector("span").textContent = item.text;
		newLists.push(li);
		todos.appendChild(li);
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

const onDelete = (event) => {
	if (event.toElement.nodeName === "INPUT") {
		const checkbox = event.toElement;
		const span = checkbox.nextElementSibling;
		if (checkbox.checked) {
			checkbox.parentElement.remove();
			newLists.map((li, index) => {
				if (li.innerText === span.innerText) {
					newLists.splice(index, 1);
				}
			});
		}
	}
};

form.addEventListener("submit", onAdd);
searchInput.addEventListener("keyup", onSearch);
todos.addEventListener("click", onDelete);
