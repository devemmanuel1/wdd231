const currentYear = new Date().getFullYear();
const lastModifiedDate = new Date(document.lastModified);

document.getElementById('currentyear').innerText = currentYear;
document.getElementById('lastModified').innerText = "Last Modified: " + lastModifiedDate;

const courses = [
    { code: "CSE 110", completed: true, category: "CSE" },
    { code: "WDD 130", completed: true, category: "WDD" },
    { code: "CSE 111", completed: false, category: "CSE" },
    { code: "CSE 210", completed: true, category: "CSE" },
    { code: "WDD 131", completed: false, category: "WDD" },
    { code: "WDD 231", completed: false, category: "WDD" }
];

const coursesContainer = document.getElementById("coursesContainer");

function renderCourses(filter) {
    coursesContainer.innerHTML = "";
    let filteredCourses = courses;

    if (filter !== "all") {
        filteredCourses = courses.filter(course => course.category === filter);
    }

    filteredCourses.forEach(course => {
        const courseDiv = document.createElement("div");
        courseDiv.classList.add("course");
        if (course.completed) {
            courseDiv.classList.add("completed");
        }
        courseDiv.textContent = course.code;
        coursesContainer.appendChild(courseDiv);
    });
}

window.filterCourses = (category) => {
    renderCourses(category);
};

// Initial render
renderCourses("all");