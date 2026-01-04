const points = [
    "Real user reviews",
    "Local food focus",
    "Community driven platform",
    "No fake ratings",
];

const WhyChooseUs = () => {
    return (
        <section className="mt-16">
            <h2 className="text-2xl md:text-3xl font-bold text-center">
                Why Choose Local Food Lovers
            </h2>

            <div className="grid md:grid-cols-2 gap-6 mt-10 max-w-4xl mx-auto">
                {points.map((p, i) => (
                    <div key={i} className="p-6 bg-base-200/40 rounded-xl border border-base-300">
                        <p className="font-medium">{p}</p>
                    </div>
                ))}
            </div>
        </section>
    );
};

export default WhyChooseUs;
