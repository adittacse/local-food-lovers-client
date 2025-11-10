import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Pagination, Navigation } from "swiper/modules";
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";
import { Link } from "react-router";

const slides = [
    { img: "https://images.unsplash.com/photo-1552912470-ee2e96439539?q=80&w=1600", title: "Street Food Adventures", subtitle: "Taste the city like a local" },
    { img: "https://images.unsplash.com/photo-1550547660-d9450f859349?q=80&w=1600", title: "Home-cooked Goodness", subtitle: "Real flavors, real stories" },
    { img: "https://plus.unsplash.com/premium_photo-1661777702966-aed29ab4106b?q=80&w=1600", title: "Hidden Restaurants", subtitle: "Discover neighborhood gems" },
];

export default function HeroSlider() {
    return (
        <div className="relative rounded-3xl overflow-hidden shadow-glass">
            <Swiper
                modules={[Autoplay, Pagination, Navigation]}
                autoplay={{ delay: 3000 }}
                pagination={{ clickable: true }}
                navigation
                loop
            >
                {
                    slides.map((s, i) => (
                        <SwiperSlide key={i}>
                            <div className="relative h-[52vh] md:h-[68vh]">
                                <img src={s.img} alt={s.title} className="w-full h-full object-cover" />

                                {/* overlay */}
                                <div className="absolute inset-0 bg-black/45 md:bg-black/40" />

                                {/* text section in slider image */}
                                <div className="absolute inset-0 grid place-items-center px-6">
                                    <div className="text-center max-w-2xl">
                                        <h1 className="text-4xl md:text-6xl font-extrabold tracking-tight text-white">
                                            {s.title}
                                        </h1>
                                        <p className="mt-3 text-white/90">{s.subtitle}</p>
                                        <Link to="/all-reviews" className="btn btn-primary mt-6">Explore Reviews</Link>
                                    </div>
                                </div>
                            </div>
                        </SwiperSlide>
                    )
                )}
            </Swiper>
        </div>
    );
}
