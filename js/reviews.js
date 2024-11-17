// Static reviews data with varied star ratings
const reviews = [
    { name: "Alex J.", role: "Freelance Designer", text: "ComfortX has completely changed my work experience. I can work for hours without any discomfort!", stars: 4.5 },
    { name: "Jamie L.", role: "Software Engineer", text: "Amazing precision and comfort. I don’t think I can go back to any other mouse.", stars: 4.3 },
    { name: "Sarah K.", role: "Graphic Designer", text: "I love how lightweight and comfortable this mouse is. Perfect for long hours of designing!", stars: 5 },
    { name: "John D.", role: "IT Specialist", text: "Perfect for my home office setup. The comfort and precision are unmatched!", stars: 4.8 },
    { name: "Emily T.", role: "Content Writer", text: "The ergonomic design is great. My wrist doesn’t hurt even after hours of work.", stars: 5 },
    { name: "Chris P.", role: "Photographer", text: "Precise and responsive, exactly what I needed for editing photos.", stars: 5 },
    { name: "Ashley R.", role: "Digital Marketer", text: "Makes my workflow so much smoother. Highly recommended!", stars: 4.4 },
    { name: "Kevin B.", role: "Video Editor", text: "The best mouse for editing. Smooth, precise, and comfortable!", stars: 4.7 },
    { name: "Lara C.", role: "Architect", text: "Amazing build quality and very comfortable to use for long hours.", stars: 5 },
    { name: "Tom H.", role: "UX Designer", text: "A great investment for comfort and productivity.", stars: 4.5 },
    { name: "Nina W.", role: "Project Manager", text: "The perfect combination of style and comfort.", stars: 5 },
    { name: "Mark Q.", role: "Software Developer", text: "It's a game-changer for long coding sessions.", stars: 4.6 },
    { name: "Laura F.", role: "Copywriter", text: "Feels just right. The grip is perfect and my hand doesn’t get tired.", stars: 5 },
    { name: "Ron P.", role: "Engineer", text: "A solid, reliable mouse with great comfort.", stars: 4.4 },
    { name: "Ellie M.", role: "Researcher", text: "It's precise, comfortable, and ideal for extended use.", stars: 5 },
    { name: "Jordan R.", role: "Video Producer", text: "Absolutely perfect for video editing.", stars: 5 },
    { name: "Sophie B.", role: "Teacher", text: "Great for daily use, especially during remote classes.", stars: 5 },
    { name: "Paul S.", role: "Accountant", text: "Easy on the wrist, even after hours.", stars: 4.6 },
    { name: "Tina G.", role: "Animator", text: "Responsive and comfortable, even during intense projects.", stars: 5 },
    { name: "Omar V.", role: "Financial Analyst", text: "Great design and very comfortable.", stars: 4.4 }
];

const reviewsPerPage = 6;
let currentPage = 1;

// Function to display reviews for the current page
function displayReviews() {
    const reviewsContainer = document.getElementById('reviews-container');
    reviewsContainer.innerHTML = "";

    const start = (currentPage - 1) * reviewsPerPage;
    const end = start + reviewsPerPage;
    const currentReviews = reviews.slice(start, end);

    currentReviews.forEach(review => {
        const reviewCard = document.createElement('div');
        reviewCard.className = "col-md-6 mb-4";
        reviewCard.innerHTML = `
            <div class="review-card shadow-sm">
                <h5>${review.name}</h5>
                <small class="text-muted">${review.role}</small>
                <p>"${review.text}"</p>
                <div class="text-warning">${generateStars(review.stars)}</div>
            </div>
        `;
        reviewsContainer.appendChild(reviewCard);
    });
}

// Function to create star ratings
function generateStars(stars) {
    const fullStars = Math.floor(stars);
    const halfStar = stars % 1 !== 0 ? 1 : 0;
    const emptyStars = 5 - fullStars - halfStar;

    return `${'<i class="fas fa-star"></i>'.repeat(fullStars)}
            ${halfStar ? '<i class="fas fa-star-half-alt"></i>' : ''}
            ${'<i class="far fa-star"></i>'.repeat(emptyStars)}`;
}

// Pagination
function setupPagination() {
    const pagination = document.getElementById('pagination');
    pagination.innerHTML = "";

    const totalPages = Math.ceil(reviews.length / reviewsPerPage);

    const prevButton = document.createElement('li');
    prevButton.className = `page-item ${currentPage === 1 ? "disabled" : ""}`;
    prevButton.innerHTML = `<a class="page-link" href="#" onclick="changePage(currentPage - 1)">&laquo; Previous</a>`;
    pagination.appendChild(prevButton);

    for (let i = 1; i <= totalPages; i++) {
        const pageItem = document.createElement('li');
        pageItem.className = `page-item ${i === currentPage ? "active" : ""}`;
        pageItem.innerHTML = `<a class="page-link" href="#" onclick="changePage(${i})">${i}</a>`;
        pagination.appendChild(pageItem);
    }

    const nextButton = document.createElement('li');
    nextButton.className = `page-item ${currentPage === totalPages ? "disabled" : ""}`;
    nextButton.innerHTML = `<a class="page-link" href="#" onclick="changePage(currentPage + 1)">Next &raquo;</a>`;
    pagination.appendChild(nextButton);
}

function changePage(page) {
    const totalPages = Math.ceil(reviews.length / reviewsPerPage);
    if (page < 1 || page > totalPages) return;

    currentPage = page;
    displayReviews();
    setupPagination();
}

displayReviews();
setupPagination();
