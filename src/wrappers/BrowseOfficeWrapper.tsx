import { useEffect, useState } from "react";
import OfficeCard from "../components/OfficeCard";
import { Office } from "../types/type";
import axios from "axios";
import { Link } from "react-router-dom";

export default function BrowseOfficeWrapper() {

    const [offices, setOffices] = useState<Office[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        axios
            .get("http://127.0.0.1:8000/api/offices", {
                headers: {
                    "X_API_KEY": "qwerty123456",
                },
            })
            .then((response) => {
                setOffices(response.data.data);
                setLoading(false);
            })
            .catch((error) => {
                setError(error);
                setLoading(false);
            });
    }, []);

    if (loading) {
        return <div>Loading...</div>;
    }

    if (error) {
        return <div>Error loading data: {error}</div>;
    }

    return (
        <section
            id="Fresh-Space"
            className="flex flex-col gap-[30px] w-full max-w-[1130px] mx-auto mt-[100px] mb-[120px]"
        >
            <h2 className="font-bold text-[32px] leading-[48px] text-nowrap text-center">
                Browse Our Fresh Space.
                <br />
                For Your Better Productivity.
            </h2>
            <div className="grid grid-cols-3 gap-[30px]">
                {offices.map((office) => (
                    <Link to={`/office/${office.slug}`}>
                        <OfficeCard key={office.id} office={office} />
                    </Link>
                ))}
            </div>
        </section>
    );
}