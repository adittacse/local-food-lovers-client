const NewsletterCTA = () => {
    return (
        <section className="my-16">
            <div className="rounded-3xl p-10 bg-base-200/40 border border-base-300 text-center">
                <h3 className="text-2xl md:text-3xl font-bold">
                    Stay Updated with Food Trends
                </h3>
                <p className="opacity-80 mt-2">
                    Get latest reviews and foodie tips straight to your inbox.
                </p>

                <div className="flex justify-center mt-6">
                    <input
                        type="email"
                        placeholder="Enter your email"
                        className="input input-bordered w-64 mr-2"
                    />
                    <button className="btn btn-primary">Subscribe</button>
                </div>
            </div>
        </section>
    );
};

export default NewsletterCTA;
