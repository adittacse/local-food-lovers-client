const stats = [
    { label: "Total Reviews", value: "1,200+" },
    { label: "Active Users", value: "600+" },
    { label: "Food Locations", value: "150+" },
];

const CommunityStats = () => {
    return (
        <section className="mt-16">
            <div className="grid md:grid-cols-3 gap-6 text-center">
                {stats.map((s) => (
                    <div key={s.label} className="card bg-base-200/40 border border-base-300">
                        <div className="card-body">
                            <h3 className="text-3xl font-bold">{s.value}</h3>
                            <p className="opacity-80">{s.label}</p>
                        </div>
                    </div>
                ))}
            </div>
        </section>
    );
};

export default CommunityStats;
