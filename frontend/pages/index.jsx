import {useRouter} from "next/router";
import React, {useEffect} from "react";
import LoaderComponent from "../components/LoaderComponent";

export default function Home() {
    const router = useRouter();

    useEffect(() => {
        router.push('/boards');
    }, [router]);

    return (
        <LoaderComponent></LoaderComponent>
    );
}
