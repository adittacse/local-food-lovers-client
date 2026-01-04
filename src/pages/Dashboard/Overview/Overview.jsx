import { useContext, useEffect, useState } from "react";
import AuthContext from "../../../contexts/AuthContext.jsx";
import useAxiosSecure from "../../../hooks/useAxiosSecure.jsx";
import Loading from "../../../components/Loading/Loading.jsx";
import {
    BarChart,
    Bar,
    XAxis,
    YAxis,
    Tooltip,
    ResponsiveContainer,
} from "recharts";

export default function DashboardHome() {
    const { user } = useContext(AuthContext);
    const axiosSecure = useAxiosSecure();

    const [loading, setLoading] = useState(true);
    const [stats, setStats] = useState({
        totalReviews: 0,
        totalFavorites: 0,
    });

    const [chartData, setChartData] = useState([]);

    useEffect(() => {
        if (!user) return;

        setLoading(true);

        Promise.all([
            axiosSecure.get(`/reviews?reviewerEmail=${user.email}`),
            axiosSecure.get(`/favorites?favoriteUserEmail=${user.email}`),
        ])
            .then(([reviewsRes, favoritesRes]) => {
                const reviews = reviewsRes.data || [];
                const favorites = favoritesRes.data || [];

                setStats({
                    totalReviews: reviews.length,
                    totalFavorites: favorites.length,
                });

                // simple chart data
                setChartData([
                    { name: "Reviews", count: reviews.length },
                    { name: "Favorites", count: favorites.length },
                ]);

                setLoading(false);
            })
            .catch(() => setLoading(false));
    }, [user, axiosSecure]);

    if (loading) {
        return (
            <div className="grid place-items-center min-h-[300px]">
                <Loading />
            </div>
        );
    }

    return (
        <div className="space-y-8">
            {/* 🔹 Header */}
            <div>
                <h1 className="text-2xl md:text-3xl font-bold">
                    Welcome back, {user?.displayName || "User"} 👋
                </h1>
                <p className="opacity-70 mt-1">
                    Here’s what’s happening with your account
                </p>
            </div>

            {/* 🔹 Overview Cards */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="card bg-base-100 shadow">
                    <div className="card-body">
                        <h2 className="card-title text-lg">My Reviews</h2>
                        <p className="text-4xl font-bold text-primary">
                            {stats.totalReviews}
                        </p>
                        <p className="opacity-70 text-sm">
                            Total reviews you have posted
                        </p>
                    </div>
                </div>

                <div className="card bg-base-100 shadow">
                    <div className="card-body">
                        <h2 className="card-title text-lg">My Favorites</h2>
                        <p className="text-4xl font-bold text-secondary">
                            {stats.totalFavorites}
                        </p>
                        <p className="opacity-70 text-sm">
                            Reviews you marked as favorite
                        </p>
                    </div>
                </div>
            </div>

            {/* 🔹 Chart */}
            <div className="card bg-base-100 shadow">
                <div className="card-body">
                    <h2 className="card-title text-lg mb-4">
                        Activity Overview
                    </h2>

                    <div className="h-[300px] w-full">
                        <ResponsiveContainer width="100%" height="100%">
                            <BarChart data={chartData}>
                                <XAxis dataKey="name" />
                                <YAxis allowDecimals={false} />
                                <Tooltip />
                                <Bar dataKey="count" fill="#632ee3" radius={[6, 6, 0, 0]} />
                            </BarChart>
                        </ResponsiveContainer>
                    </div>
                </div>
            </div>
        </div>
    );
}
