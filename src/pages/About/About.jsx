import React from 'react';

const About = () => {
    return (
        <div className="py-20 px-4 md:px-10 lg:px-20 max-w-6xl mx-auto">
            <div className="text-center mb-12">
                <h1 className="text-3xl md:text-4xl font-bold mb-4">
                    About <span className="primary-text">Local Food Lovers</span>
                </h1>
                <p className="opacity-70 max-w-3xl mx-auto">
                    Discover, review, and share your favorite food experiences with a
                    growing community of food lovers.
                </p>
            </div>

            {/* Content */}
            <div className="grid md:grid-cols-2 gap-10 items-center">
                {/* Left */}
                <div className="space-y-5">
                    <h2 className="text-2xl font-semibold">
                        What is Local Food Lovers?
                    </h2>
                    <p className="opacity-80 leading-relaxed">
                        Local Food Lovers is a community-driven platform where users can
                        explore food reviews, share their dining experiences, and discover
                        the best local restaurants around them.
                    </p>
                    <p className="opacity-80 leading-relaxed">
                        Our goal is to help food enthusiasts make informed decisions by
                        providing authentic reviews, ratings, and real user feedback.
                    </p>
                </div>

                {/* Right */}
                <div className="card bg-base-100 shadow-lg">
                    <div className="card-body space-y-4">
                        <h3 className="text-xl font-semibold">Why Choose Us?</h3>

                        <ul className="list-disc list-inside space-y-2 opacity-80">
                            <li>Real user-generated food reviews</li>
                            <li>Powerful search, filter, and sorting options</li>
                            <li>Personalized dashboard for managing reviews</li>
                            <li>Favorites system for saving loved foods</li>
                            <li>Secure authentication with Firebase</li>
                        </ul>
                    </div>
                </div>
            </div>

            <div className="mt-16 text-center">
                <p className="opacity-70">
                    Built with ❤️ to support local restaurants and food lovers.
                </p>
            </div>
        </div>
    );
};

export default About;