import { useEffect, useRef, useState } from "react";
import "./Letters.css";

const INITIAL = [
    { to: "유채일", msg: "아, 몰라. 데이트라 하던지…", time: "2025-05-16" },
    { to: "권준우", msg: "안 불편하다고 하면~ 채일이랑 오붓하게 누워있어야지.", time: "2025-05-17" },
    { to: "유채일", msg: "…그러게, 지금 아니면 또 언제 이런 데 누워보겠냐.", time: "2025-05-17" },
    { to: "유채일", msg: "뭐, 니가 안 지루하고 즐거운 거면… 운동 데이트든, 이렇게 누워서 쉬는 거든, 한번에 그치지 않고 계속 해주는 거냐? 난 짧은 건 별로 안 좋아하거든.", time: "2025-05-18" },
    { to: "권준우", msg: "네가 하자고 할 때마다 같이 해줄게.", time: "2025-05-18" },
    { to: "유채일", msg: "니가 그렇게 말했으니까, 졸업할 때까진 각오해둬라.", time: "2025-05-19" },
    { to: "유채일", msg: "나중에 우리 집 놀러 와— 밥 맛있게 해줄게. 뭐 좋아하냐?", time: "2025-05-19" },
    { to: "권준우", msg: "갈 때 채일이한테 예쁘게 보여야 또 놀러 가지. 그치?", time: "2025-05-19" },
    { to: "유채일", msg: "이런 데서 계속 마주 보고 있어야 하면… 약간은, 부끄러울 수밖에 없잖아. …나만 그래?", time: "2025-05-20" },
    { to: "권준우", msg: "응, 채일이 네가 재밌었다고 하면 다행이지. 데이트 소리도 좋았다는 거고?", time: "2025-05-20" },
    { to: "권준우", msg: "애들한테 알려줄 생각도 없었으니까, 나중에 또 같이 있자.", time: "2025-05-20" },
    { to: "권준우", msg: "다음에는 도서관 데이트나 한 번 갈까?", time: "2025-05-20" },
    { to: "유채일", msg: "음, 난 잠만보랑 데이트하는 취미는 없는데… 어쩐다? ", time: "2025-05-20" },
    { to: "유채일", msg: "니가 혹시나 딴 애랑 간다고 해도, 딱히 말리진 않겠다만— 나보다 편하고 재밌진 않을 걸?", time: "2025-05-21" },
    { to: "유채일", msg: "나도 니 아니면 따라갈 생각 없거든. 권준우, 넌… 내 동생만큼 편하다 생각해.", time: "2025-05-21" },
    { to: "유채일", msg: "니가 이렇게까지 편해질 줄 알았으면... 진작 친해질 걸 그랬어.", time: "2025-05-21" },
    { to: "권준우", msg: "이때까지 못 친해진 시간만큼 더 붙어있으면 되는 거지, 안 그래? ", time: "2025-05-21" },
    { to: "권준우", msg: "우리 채일이, 나 너무 좋아해서 문제네~", time: "2025-05-21" },
    { to: "유채일", msg: "그러면.. 매일 붙어 있어야 하는 거 아니냐? 감당할 수 있으려나 몰라.", time: "2025-05-21" },
    { to: "권준우", msg: "...... 채일이가 울린 애들이 몇 명이나 되는 거야?", time: "2025-05-21" },
    { to: "유채일", msg: "…그거 좋네. 소원 잔뜩 생각해 둘 거니까. 그 말 꼭 지켜. ", time: "2025-05-21" },
    { to: "유채일", msg: "닌… 눈치 있는 편이냐? 그런 쪽으로.", time: "2025-05-21" },
    { to: "유채일", msg: "니랑 가깝게 닿으면, 왠지 붕 뜬 것 같기도 하고… 울렁거려서, 어떻게 해야 할지 모르겠어.", time: "2025-05-21" },
    { to: "권준우", msg: "감정도, 행동도 모르겠으면 일단 뭐든 지르고 봐도 되는 거잖아?", time: "2025-05-21" },
    { to: "유채일", msg: "그럼… 한번만 안아봐도 되냐-", time: "2025-05-21" },
    { to: "유채일", msg: " …닌 이런 거, 많이 해봤나 보다? 멀쩡한 걸 보면.", time: "2025-05-21" },
    { to: "권준우", msg: "많이 해보진 않았고~ 그냥, 너라서.", time: "2025-05-21" },
    { to: "유채일", msg: "…안 보고 싶었으면, 닐 데리러 오지도 않았겠지. 굳이 말해야 아냐?", time: "2025-05-23" },
    { to: "유채일", msg: "닌 항상 뭐가 좋아서 그렇게 웃냐. 뭐, 보기 좋긴 하다만—", time: "2025-05-23" },
    { to: "권준우", msg: "음~ 너랑 있으니까? 보기 좋다고 하면 더 웃을래.", time: "2025-05-23" },
];

const FEATURED_LETTER = {
    to: "유채일",
    time: "2025-09-05",
    msg: `채일아,
내가 이렇게 펜을 들어서 편지를 쓰는 건 아무래도 처음인 것 같지?
그만큼 뭔가 조금은~ 어색하다고 생각이 들지만, 응. 그래도 꽤 괜찮을 것 같다는 생각에 한 번쯤은.
우리가 처음 만나고, 조금 시간이 흘러서 서로에게 조금 더 소중해지기로 했을 때가 아직도 기억나.

어리광도, 귀찮은 행동도 많이 하는데 다 받아주니까 고마운 것도 있고...
평소에도 좋아한다는 말 많이 하지만, 그래도 이렇게 전하는 건 조오금 다르지 않나 싶어서.

유채일, 채일아.
내가 진짜 많이 좋아하고, 사랑해. 평소에는 좀 많이 가벼워 보이긴 하지만...
늘 말하는 건 진심에 꾹꾹 담아서 말하고 있으니까.

이렇게 적으니까 조오금... 많이 낯간지럽긴 하다, 응.
오늘도 즐겁게 시간 보내자?
많이 사랑해.

— 권준우`,
};

export default function Letters() {
    const [letters] = useState(INITIAL);
    const [open, setOpen] = useState(null);
    const dialogRef = useRef(null);

    useEffect(() => {
        const onKey = (e) => e.key === "Escape" && setOpen(null);
        window.addEventListener("keydown", onKey);
        return () => window.removeEventListener("keydown", onKey);
    }, []);

    const openRead = (item) => setOpen(item);
    const onCardKey = (e, item) => {
        if (e.key === "Enter" || e.key === " ") {
            e.preventDefault();
            openRead(item);
        }
    };

    return (
        <main className="letters-wrap" role="main" aria-label="쪽지">
            <header className="letters-hero">
                <h1 className="lh-title">Letters</h1>
                <p className="lh-sub">우리가 쌓아온 시간, 우리가 쌓아갈 시간</p>
            </header>

            <section className="letters-grid">
                {letters.map((n, i) => (
                    <article
                        className="postcard"
                        key={i}
                        role="button"
                        tabIndex={0}
                        aria-label={`${n.to}에게 보낸 쪽지 열기`}
                        onClick={() => openRead(n)}
                        onKeyDown={(e) => onCardKey(e, n)}
                    >
                        <div className="pc-stamp" aria-hidden="true" />
                        <h3 className="pc-to">{n.to}</h3>
                        <p className="pc-msg">{n.msg}</p>
                        <time className="pc-time">{n.time}</time>
                    </article>
                ))}

                {/* ▶ 미리 쓴 ‘편지 모양’ 카드 (내용 미리보기 없음) */}
                <article
                    className="envelope-card letter"
                    role="button"
                    tabIndex={0}
                    aria-label={`${FEATURED_LETTER.title} 열기`}
                    onClick={() => openRead(FEATURED_LETTER)}
                    onKeyDown={(e) => onCardKey(e, FEATURED_LETTER)}
                >
                    <div className="env-body">
                        <div className="env-flap" aria-hidden="true" />
                        <div className="env-copy">
                            <span className="env-to">To. {FEATURED_LETTER.to}</span>
                            <span className="env-hint">열어보기</span>
                        </div>
                    </div>
                </article>
            </section>

            {/* 읽기 모달 */}
            {open && (
                <div className="lm-wrap" role="dialog" aria-modal="true" aria-label="쪽지 보기">
                    <div className="lm-backdrop" onClick={() => setOpen(null)} />
                    <div className="lm-dialog" ref={dialogRef}>
                        <button className="lm-close" aria-label="닫기" onClick={() => setOpen(null)}>×</button>

                        <div className="lm-meta">
                            <div className="lm-to">{open.to}</div>
                            <time className="lm-date">{open.time}</time>
                        </div>

                        <div className="lm-content">{open.msg}</div>
                    </div>
                </div>
            )}
        </main>
    );
}
