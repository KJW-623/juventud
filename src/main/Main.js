import { useEffect, useRef } from "react";
import "./Main.css";

export default function Main() {
    const heroRef = useRef(null);

    useEffect(() => {
        const el = heroRef.current;
        if (!el) return;
        // 첫 프레임 이후 붙여 자연스러운 페이드
        const id = requestAnimationFrame(() => el.classList.add("is-mounted"));
        return () => cancelAnimationFrame(id);
    }, []);

    return (
        <section ref={heroRef} className="main-hero">
            <div className="m-sky">
                <div className="m-sun" />
            </div>

            {/* 안개 */}
            <div className="m-fog ft" />
            <div className="m-fog fm" />
            <div className="m-fog fb" />

            {/* 허브 */}
            <div className="hub">
                <h1 className="hub-title">Being with you is the happiest moment.</h1>
                <p className="hub-sub">우리는 또, 여기서 오늘.</p>

                <div className="hub-grid">
                    <a className="hub-card hub-gallery" href="/gallery"><h2>Gallery</h2>
                    </a>
                    <a className="hub-card hub-letters" href="/letters"><h2>Letters</h2>
                    </a>
                </div>
            </div>

            {/* 바다 */}
            <div className="m-sea">
                <div className="m-glow" />
                <div className="m-wave w1" />
                <div className="m-wave w2" />
                <div className="m-wave w3" />
            </div>
        </section>
    );
}
