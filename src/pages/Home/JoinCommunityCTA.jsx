import { Link } from "react-router";

export default function JoinCommunityCTA(){
    return (
        <section className="mt-16">
            <div className="rounded-3xl p-10 bg-gradient-to-r from-primary/20 via-accent/20 to-secondary/20 border border-base-300">
                <h3 className="text-2xl md:text-3xl font-bold">Share your latest food adventure</h3>
                <p className="opacity-80 mt-2 max-w-2xl">Add honest reviews, help others discover local gems, and build your foodie cred.</p>
                <Link to="/add-review" className="btn btn-primary mt-6">Add a Review</Link>
            </div>
        </section>
    );
}