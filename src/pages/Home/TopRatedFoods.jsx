const foods = [
    "Biriyani",
    "Burger",
    "Pizza",
    "Street Fuchka",
    "Noodles",
    "Kacchi",
];

const TopRatedFoods = () => {
    return (
        <section className="mt-16">
            <h2 className="text-2xl md:text-3xl font-bold text-center">
                Top Rated Foods
            </h2>

            <div className="flex flex-wrap justify-center gap-4 mt-8">
                {foods.map((food) => (
                    <span
                        key={food}
                        className="px-5 py-2 rounded-full bg-base-200 border border-base-300 font-medium"
                    >
                        {food}
                    </span>
                ))}
            </div>
        </section>
    );
};

export default TopRatedFoods;
