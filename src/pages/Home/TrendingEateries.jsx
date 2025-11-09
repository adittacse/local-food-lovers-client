import React from 'react';

const TrendingEateries = () => {
    const items = [
        {name:'Spicy Lane', area:'Old Town', img:'https://images.unsplash.com/photo-1455619452474-d2be8b1e70cd?q=80&w=1200'},
        {name:'Curry Corner', area:'River View', img:'https://images.unsplash.com/photo-1596797038530-2c107229654b?q=80&w=1200'},
        {name:'Noodle Hub', area:'Market Street', img:'https://images.unsplash.com/photo-1585032226651-759b368d7246?q=80&w=1200'},
    ];

    return (
        <section className="mt-16">
            <h2 className="text-2xl md:text-3xl font-bold text-center">Trending Eateries</h2>
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6 mt-6">
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