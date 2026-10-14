
const books = [
    { id: 1, title: "Data Structures Algorithms", author: "Huda Noordean", price: 500 },
    
    { id: 2, title: "Mathematics", author: "Dr. R.D. Sharma", price: 350 },

    
    { id: 3, title: "Python Programming", author:"Aamer Khan", price: 499 },
    
    
    { id: 4, title: " Modern Digital Electronics", author: "R.P.Jain", price: 420 }

];

 let cart = JSON.parse(localStorage.getItem("bookCart") || "[]");

function displayBooks(list = books) {
    const bookList = document.getElementById("book-list");
    bookList.innerHTML = "";

    if (list.length === 0) {
        bookList.textContent = "No books found.";
        return;
    }

    list.forEach(book => {
        bookList.innerHTML += `
            <div class="book">
                <h3>${book.title}</h3>
                <p>Author: ${book.author}</p>
                <p>Price: ₹${book.price}</p>
                <button onclick="addToCart(${book.id})">
                    Add to Cart
                </button>
            </div>
        `;
    });
}

function addToCart(id) {
    const book = books.find(item => item.id === id);
    cart.push(book);
    displayCart();
}

function removeFromCart(index) {
    cart.splice(index, 1);
    displayCart();
}
 
function displayCart() {
    localStorage.setItem("bookCart", JSON.stringify(cart));

    const cartItems = document.getElementById("cart-items");
    const totalElement = document.getElementById("total");
    const countElement = document.getElementById("cart-count");

    if (countElement) {
        countElement.textContent = cart.length;
    }

    if (!cartItems || !totalElement) return;

    cartItems.innerHTML = "";

    if (cart.length === 0) {
        cartItems.textContent = "Your cart is empty.";
        totalElement.textContent = "0";
        return;
    }

    cart.forEach((book, index) => {
        const row = document.createElement("div");
        row.className = "cart-row";

        const details = document.createElement("span");
        details.textContent = `${book.title} — ₹${book.price}`;

        const removeButton = document.createElement("button");
        removeButton.textContent = "Remove";
        removeButton.addEventListener("click", () => {
            cart.splice(index, 1);
            displayCart();
        });

        row.append(details, removeButton);
        cartItems.appendChild(row);
    });

    const total = cart.reduce(
        (sum, book) => sum + Number(book.price), 0
    );

    totalElement.textContent = total;
}

    document.getElementById("cart-count").textContent = cart.length;


document.getElementById("search").addEventListener("input", event => {
    const query = event.target.value.toLowerCase();

    const filteredBooks = books.filter(book =>
        book.title.toLowerCase().includes(query) ||
        book.author.toLowerCase().includes(query)
    );

    displayBooks(filteredBooks);
});

displayBooks();
displayCart();

const registerForm = document.getElementById("register-form");
const loginForm = document.getElementById("login-form");

// Registration
if (registerForm) {
    registerForm.addEventListener("submit", function (event) {
        event.preventDefault();

        const name = document.getElementById("reg-name").value.trim();
        const email = document.getElementById("reg-email").value.trim().toLowerCase();
        const password = document.getElementById("reg-password").value;
        const confirmPassword = document.getElementById("confirm-password").value;
        const message = document.getElementById("register-message");

        if (password !== confirmPassword) {
            message.textContent = "Passwords do not match.";
            return;
        }

        message.textContent =
            "Registration form validated! Backend account creation is not configured yet.";

        console.log("Registration demo:", { name, email });
    });
}

// Login
if (loginForm) {
    loginForm.addEventListener("submit", function (event) {
        event.preventDefault();

        const message = document.getElementById("login-message");

        message.textContent =
            "Form validated! Real account authentication is not configured yet.";
    });
}
