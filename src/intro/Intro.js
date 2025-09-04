import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "./Intro.css";

export default function Intro() {
    const navigate = useNavigate();

    useEffect(() => {
        const root = document.querySelector(".sea-hero");
        if (root) root.classList.add("is-mounted");
    }, []);

    return (
        <div className="sea-hero" role="main" aria-label="안개 낀 바다 인트로">
            <header className="sea-topbar">
                <nav className="sea-menu">
                    <span className="sea-menu-item is-active">OUR 100 DAYS</span>
                </nav>
            </header>

            <div className="sea-logo" aria-label="브랜드">
                <h1 className="sea-logo-text">Our life began the day we met.</h1>
            </div>

            {/* 하늘/해/안개 */}
            <div className="sea-sky" aria-hidden="true">
                <div className="sea-sun" />
                <div className="sea-fog fog-top" />
                <div className="sea-fog fog-mid" />
            </div>

            {/* 바다(수평선+파도+안개) */}
            <div className="sea-water" aria-hidden="true">
                <div className="sea-glow" />
                <div className="sea-wave w1" />
                <div className="sea-wave w2" />
                <div className="sea-wave w3" />
                <div className="sea-fog fog-low" />
            </div>

            {/* 텍스트 없는 시작 버튼 */}
            <button
                className="sea-scroll"
                onClick={() => navigate("/main")}
                aria-label="메인으로 이동"
                title="Start"
            >
                <span className="sea-chevron" />
            </button>
        </div>
    );
}
