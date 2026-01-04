import { FaEnvelope, FaMapMarkerAlt, FaPhoneAlt } from "react-icons/fa";

const Contact = () => {
    return (
        <div className="py-20 px-4 md:px-10 lg:px-20 max-w-6xl mx-auto">

            <div className="text-center mb-12">
                <h1 className="text-3xl md:text-4xl font-bold mb-4">
                    Contact <span className="primary-text">Us</span>
                </h1>
                <p className="opacity-70 max-w-2xl mx-auto">
                    Have questions, feedback, or suggestions? We’d love to hear from you.
                </p>
            </div>

            {/* Content */}
            <div className="grid md:grid-cols-2 gap-10">
                {/* Left: Contact Info */}
                <div className="space-y-6">
                    <h2 className="text-2xl font-semibold">Get in Touch</h2>

                    <p className="opacity-80 leading-relaxed">
                        Local Food Lovers is always open to feedback and collaboration.
                        Reach out to us using the information below.
                    </p>

                    <div className="flex items-center gap-4">
                        <FaEnvelope className="text-xl text-primary" />
                        <span className="opacity-80">
                            support@localfoodlovers.com
                        </span>
                    </div>

                    <div className="flex items-center gap-4">
                        <FaPhoneAlt className="text-xl text-primary" />
                        <span className="opacity-80">
                            +880 1XXX-XXXXXX
                        </span>
                    </div>

                    <div className="flex items-center gap-4">
                        <FaMapMarkerAlt className="text-xl text-primary" />
                        <span className="opacity-80">
                            Dhaka, Bangladesh
                        </span>
                    </div>
                </div>

                {/* Right: Contact Form */}
                <div className="card bg-base-100 shadow-lg">
                    <div className="card-body">
                        <h3 className="text-xl font-semibold mb-4">
                            Send Us a Message
                        </h3>

                        <form className="space-y-4">
                            <div>
                                <label className="label">
                                    <span className="label-text">Your Name</span>
                                </label>
                                <input
                                    type="text"
                                    placeholder="Enter your name"
                                    className="input input-bordered w-full"
                                    required
                                />
                            </div>

                            <div>
                                <label className="label">
                                    <span className="label-text">Email Address</span>
                                </label>
                                <input
                                    type="email"
                                    placeholder="Enter your email"
                                    className="input input-bordered w-full"
                                    required
                                />
                            </div>

                            <div>
                                <label className="label">
                                    <span className="label-text">Message</span>
                                </label>
                                <textarea
                                    rows="4"
                                    placeholder="Write your message"
                                    className="textarea textarea-bordered w-full"
                                    required
                                ></textarea>
                            </div>

                            <button className="btn btn-primary w-full mt-2">
                                Send Message
                            </button>
                        </form>
                    </div>
                </div>
            </div>

            <div className="mt-16 text-center">
                <p className="opacity-70">
                    We usually respond within 24 hours.
                </p>
            </div>
        </div>
    );
};

export default Contact;