const steps = [
    { title: "Explore Reviews", desc: "Browse honest reviews from real food lovers." },
    { title: "Share Experience", desc: "Add your own food experiences easily." },
    { title: "Help Community", desc: "Guide others to discover great local food." },
];

const HowItWorks = () => {
    return (
        <section className="mt-16">
            <h2 className="text-2xl md:text-3xl font-bold text-center">How It Works</h2>

            <div className="grid md:grid-cols-3 gap-6 mt-10">
                {steps.map((s, i) => (
                    <div key={i} className="card bg-base-200/40 border border-base-300">
                        <div className="card-body text-center">
                            <h3 className="card-title justify-center">{s.title}</h3>
                            <p className="opacity-80">{s.desc}</p>
                        </div>
                    </div>
                ))}
            </div>
        </section>
    );
};

export default HowItWorks;
