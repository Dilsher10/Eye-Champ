"use client";

const categories = ["Under Rs. 5000", "New Arrivals", "Best Sellers", "Top Rated", "Rectangle", "Oversized", "Cat Eye", "Premium", "On Sale", "Men's"];
const mobileCategories = [...categories, ...categories];

export default function Categories() {
    return (
        <>
            <div className="pills-wrap shell desktop-categories" aria-label="Shop categories">
                {categories.map((x, index) => <button key={`${x}-${index}`}>{x}</button>)}
            </div>

            <div className="pills-wrap shell mobile-categories">
                <div className="pills-track" aria-label="Shop categories carousel">
                    {mobileCategories.map((x, index) => <button key={`${x}-${index}`}>{x}</button>)}
                </div>
            </div>
        </>
    );
}
