import { useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import "./ErrorPage.css";

export default function ErrorPage({
    code = 404,
    title = "이 곳은 없는 장소야.",
    message = "잠시 바람이 거셌나 봐. 금방 길을 찾을 수 있을 거야.",
}) {
    const navigate = useNavigate?.() || null;
    const heroRef = useRef(null);

    useEffect(() => {
        const el = heroRef.current;
        if (!el) return;
        const id = requestAnimationFrame(() => el.classList.add("is-mounted"));
        return () => cancelAnimationFrame(id);
    }, []);

    const goBack = () => {
        if (navigate) navigate(-1);
        else window.history.back();
    };

    const goHome = () => {
        if (navigate) navigate("/");
        else window.location.href = "/";
    };

    return (
        <section ref={heroRef} className="error-hero" aria-live="polite">
            {/* 하늘/해/안개 */}
            <div className="error-sky">
                <div className="error-sun" />
                <div className="error-fog ft" />
                <div className="error-fog fm" />
                <div className="error-fog fb" />
            </div>

            {/* 본문 카드 */}
            <div className="error-center">
                <div className="error-card" role="alert">
                    <div className="error-badge" aria-hidden="true">{code}</div>
                    <h1 className="error-title">{title}</h1>
                    <p className="error-sub">{message}</p>

                    <div className="error-actions">
                        <button className="error-btn primary" onClick={goBack}>
                            ← 이전 페이지
                        </button>
                        <button className="error-btn ghost" onClick={goHome}>
                            홈으로
                        </button>
                        <button
                            className="error-btn ghost"
                            onClick={() => window.location.reload()}
                        >
                            새로고침
                        </button>
                    </div>
                </div>
            </div>

            {/* 바다/파도 */}
            <div className="error-sea">
                <div className="error-glow" />
                <div className="error-wave w1" />
                <div className="error-wave w2" />
                <div className="error-wave w3" />
            </div>
        </section>
    );
}
