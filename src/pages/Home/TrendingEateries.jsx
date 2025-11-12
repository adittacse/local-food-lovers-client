import React from "react";

const TrendingEateries = () => {
    const items = [
        {name:"Spicy Lane", area:"Old Town", img:"https://i.ibb.co.com/YKpGrmb/Spicy-Lane.jpg"},
        {name:"Curry Corner", area:"River View", img:"https://i.ibb.co.com/FckCw5h/Curry-Corner.jpg"},
        {name:"Noodle Hub", area:"Market Street", img:"https://i.ibb.co.com/v4FzdyL1/Noodles.jpg"},
    ];

    return (
        <section className="mt-16">
            <h2 className="text-2xl md:text-3xl font-bold text-center">Trending Eateries</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mt-10">
                {items.map(x=> (
                    <div key={x.name} className="card bg-base-200/40 border border-base-300">
                        <figure className="aspect-[16/10]"><img src={x.img} alt={x.name} className="w-full h-full object-cover"/></figure>
                        <div className="card-body">
                            <h3 className="card-title">{x.name}</h3>
                            <p className="opacity-80">{x.area}</p>
                        </div>
                    </div>
                ))}
            </div>
        </section>
    );
};

export default TrendingEateries;