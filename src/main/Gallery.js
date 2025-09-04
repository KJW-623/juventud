import { useEffect, useMemo, useState, useCallback } from "react";
import "./Gallery.css";

/** 바다·청춘·사랑 테마의 타이틀 & 태그 */
const PHOTOS = [
    {
        src: "https://img1.daumcdn.net/thumb/R1280x0/?scode=mtistory2&fname=https%3A%2F%2Fblog.kakaocdn.net%2Fdna%2Fk12Su%2FdJMb9NazfYG%2FAAAAAAAAAAAAAAAAAAAAAI3JStrAc80pnEO6XWQaUaMosXBLC8drnDAvhwdn3hTW%2Ftfile.jpg%3Fcredential%3DyqXZFxpELC7KVnFOS48ylbz2pIh7yKj8%26expires%3D1759244399%26allow_ip%3D%26allow_referer%3D%26signature%3D%252F4xX9bEghrceTF%252F9D%252BorY%252FE1Z7A%253D",
        title: "Azul Dawn",               // 파란 새벽
        tags: ["youth", "kiss"]
    },
    {
        src: "https://img1.daumcdn.net/thumb/R1280x0/?scode=mtistory2&fname=https%3A%2F%2Fblog.kakaocdn.net%2Fdna%2FcjrEjq%2FdJMb862gNAC%2FAAAAAAAAAAAAAAAAAAAAAKFzFm_Ex8k34CLj_cBosOxzl64AN-cYHSdz2RiV8xcb%2Ftfile.png%3Fcredential%3DyqXZFxpELC7KVnFOS48ylbz2pIh7yKj8%26expires%3D1759244399%26allow_ip%3D%26allow_referer%3D%26signature%3DPTqZoI7RpESAHmvX6Q3s1L37snY%253D",
        title: "Mar Amor",                // 바다의 사랑
        tags: ["amor", "sunlit"]
    },
    {
        src: "https://img1.daumcdn.net/thumb/R1280x0/?scode=mtistory2&fname=https%3A%2F%2Fblog.kakaocdn.net%2Fdna%2FbUT4i1%2FdJMb9NazfYH%2FAAAAAAAAAAAAAAAAAAAAABVfyJ4ujT70O8MJqjtdlY7tTdtvoLwHUY6MdmmtIEQd%2Ftfile.jpg%3Fcredential%3DyqXZFxpELC7KVnFOS48ylbz2pIh7yKj8%26expires%3D1759244399%26allow_ip%3D%26allow_referer%3D%26signature%3DzpULpZY0ji0VNcfrPwAWkWBGH9Q%253D",
        title: "Juventud",                // 청춘
        tags: ["youth", "summer"]
    },
    {
        src: "https://img1.daumcdn.net/thumb/R1280x0/?scode=mtistory2&fname=https%3A%2F%2Fblog.kakaocdn.net%2Fdna%2FdrxS1e%2FdJMb862gNAL%2FAAAAAAAAAAAAAAAAAAAAAGResunCe3WCt6IdEHTBfO-Gtp20jd5vPIGHJRhmO4D7%2Ftfile.png%3Fcredential%3DyqXZFxpELC7KVnFOS48ylbz2pIh7yKj8%26expires%3D1759244399%26allow_ip%3D%26allow_referer%3D%26signature%3DPKAYXWdLuopC%252BTeFNm7r82QVyek%253D",
        title: "Eterno Verano",           // 영원한 여름
        tags: [ "verano", "light"]
    },
    {
        src: "https://img1.daumcdn.net/thumb/R1280x0/?scode=mtistory2&fname=https%3A%2F%2Fblog.kakaocdn.net%2Fdna%2FY4zCe%2FdJMb9NazfYI%2FAAAAAAAAAAAAAAAAAAAAAKXuIv0sVWufKoJ5aF0yXWPxwwZVkKhiUd6oDjapRZp1%2Ftfile.png%3Fcredential%3DyqXZFxpELC7KVnFOS48ylbz2pIh7yKj8%26expires%3D1759244399%26allow_ip%3D%26allow_referer%3D%26signature%3D%252BBQ7pC%252BJ65IW0Q4p5OSuHPx6X%252Bo%253D",
        title: "Sea Breeze",              // 바다의 바람
        tags: [ "soft", "blue"]
    },
    {
        src: "https://img1.daumcdn.net/thumb/R1280x0/?scode=mtistory2&fname=https%3A%2F%2Fblog.kakaocdn.net%2Fdna%2Fm0XCG%2FdJMb9NazfYJ%2FAAAAAAAAAAAAAAAAAAAAANQpX5SBJhfH3E7OZ7MIXAsxWw3sAm-w3GXkrGOOFbvy%2Ftfile.jpg%3Fcredential%3DyqXZFxpELC7KVnFOS48ylbz2pIh7yKj8%26expires%3D1759244399%26allow_ip%3D%26allow_referer%3D%26signature%3DNLVs9S3W3pYS5r7C8SuRs4ltEcg%253D",
        title: "Coral Dream",             // 산호의 꿈
        tags: ["dream", "warm"]
    },
    {
        src: "https://img1.daumcdn.net/thumb/R1280x0/?scode=mtistory2&fname=https%3A%2F%2Fblog.kakaocdn.net%2Fdna%2F06v6C%2FdJMb862gNAR%2FAAAAAAAAAAAAAAAAAAAAAKVYev0oCFJ1rKqYPihMHETvgOvxN8E17xm9D8BNF5ex%2Ftfile.png%3Fcredential%3DyqXZFxpELC7KVnFOS48ylbz2pIh7yKj8%26expires%3D1759244399%26allow_ip%3D%26allow_referer%3D%26signature%3DgzJxY5LYHFZdKAFq%252Bhq%252FyIrUKSI%253D",
        title: "Amistad",             // 우정
        tags: ["couple", "rain"]
    },
    {
        src: "https://img1.daumcdn.net/thumb/R1280x0/?scode=mtistory2&fname=https%3A%2F%2Fblog.kakaocdn.net%2Fdna%2FbLajfJ%2FdJMb862gNA0%2FAAAAAAAAAAAAAAAAAAAAALAuaCIrG72Dre8um3XChivIG2lW03IoS8h6ysyqkgmy%2Ftfile.jpg%3Fcredential%3DyqXZFxpELC7KVnFOS48ylbz2pIh7yKj8%26expires%3D1759244399%26allow_ip%3D%26allow_referer%3D%26signature%3D%252FmCfYwo1HS38hRsbSA2Tx%252B0rdFo%253D",
        title: "Cielo Claro",                 // 맑은 하늘
        tags: ["sky", "bright"]
    },
    {
        src: "https://img1.daumcdn.net/thumb/R1280x0/?scode=mtistory2&fname=https%3A%2F%2Fblog.kakaocdn.net%2Fdna%2Fsk2No%2FdJMb9NazfYK%2FAAAAAAAAAAAAAAAAAAAAAIXvwfU_oNF16NL-wND3zRsaBN-ovy5WQFXM2dywhsEg%2Ftfile.jpg%3Fcredential%3DyqXZFxpELC7KVnFOS48ylbz2pIh7yKj8%26expires%3D1759244399%26allow_ip%3D%26allow_referer%3D%26signature%3DhGz9j9TiBDYInokLD%252FypNTqPiRw%253D",
        title: "Ocean Whisper",           // 바다의 속삭임
        tags: ["whisper", "kiss"]
    },
    {
        src: "https://img1.daumcdn.net/thumb/R1280x0/?scode=mtistory2&fname=https%3A%2F%2Fblog.kakaocdn.net%2Fdna%2Fw2PFx%2FdJMb862gNA7%2FAAAAAAAAAAAAAAAAAAAAAHHpCVyxZpgw-oAI0kWqG9L6tLySJoFKOGYJ42uI0c6C%2Ftfile.jpg%3Fcredential%3DyqXZFxpELC7KVnFOS48ylbz2pIh7yKj8%26expires%3D1759244399%26allow_ip%3D%26allow_referer%3D%26signature%3DIBgxiUiZpcXelSHxCBUF9oocjdQ%253D",
        title: "Beso del Sol",            // 태양의 키스
        tags: ["sun", "glow"]
    },
    {
        src: "https://img1.daumcdn.net/thumb/R1280x0/?scode=mtistory2&fname=https%3A%2F%2Fblog.kakaocdn.net%2Fdna%2FkVLAU%2FdJMb9NazfYL%2FAAAAAAAAAAAAAAAAAAAAAOSFPTB_9azf7at6WNAWKD9D8cK2OaH7KzSayPqTk0Ct%2Ftfile.jpg%3Fcredential%3DyqXZFxpELC7KVnFOS48ylbz2pIh7yKj8%26expires%3D1759244399%26allow_ip%3D%26allow_referer%3D%26signature%3DmseYhZHgKt0g1ZGuH75WDqOcEMo%253D",
        title: "Tidal Heart",             // 밀물의 심장
        tags: ["cute", "panda"]
    },
    {
        src: "https://img1.daumcdn.net/thumb/R1280x0/?scode=mtistory2&fname=https%3A%2F%2Fblog.kakaocdn.net%2Fdna%2FbWkWMw%2FdJMb9NazfYM%2FAAAAAAAAAAAAAAAAAAAAAI9aUl_snBruvoIdFBu1kox4IqT2E6SzHeZqaZq3Bi1G%2Ftfile.jpg%3Fcredential%3DyqXZFxpELC7KVnFOS48ylbz2pIh7yKj8%26expires%3D1759244399%26allow_ip%3D%26allow_referer%3D%26signature%3DcYG5X%252FaskYT1BtlRnwMnTG1lqQw%253D",
        title: "Brisa Marina",            // 바닷바람
        tags: ["together", "nap"]
    },
    {
        src: "https://img1.daumcdn.net/thumb/R1280x0/?scode=mtistory2&fname=https%3A%2F%2Fblog.kakaocdn.net%2Fdna%2FDlBu6%2FdJMb862gNBa%2FAAAAAAAAAAAAAAAAAAAAAFU-51ggRk67WUcCVO5R2hmegqy9TnvVFBq88HTAFodh%2Ftfile.png%3Fcredential%3DyqXZFxpELC7KVnFOS48ylbz2pIh7yKj8%26expires%3D1759244399%26allow_ip%3D%26allow_referer%3D%26signature%3DLZleNgPlHRd7C28K0NeY2wnBjLg%253D",
        title: "Luz de Luna",             // 달빛
        tags: ["luna", "night"]
    },
    {
        src: "https://img1.daumcdn.net/thumb/R1280x0/?scode=mtistory2&fname=https%3A%2F%2Fblog.kakaocdn.net%2Fdna%2Fbbwx6s%2FdJMb9NazfYN%2FAAAAAAAAAAAAAAAAAAAAAMyd9-Jbzxv7JpYQMCJRKD7EQApcPp1iYIMd-oTl8Mfu%2Ftfile.jpg%3Fcredential%3DyqXZFxpELC7KVnFOS48ylbz2pIh7yKj8%26expires%3D1759244399%26allow_ip%3D%26allow_referer%3D%26signature%3DSAFP%252Foy7DMd1a4AeuKzmGEZrhsc%253D",
        title: "Amor Salado",             // 짭짤한 사랑(바다 같은 사랑)
        tags: ["love", "animal"]
    },
];

export default function Gallery() {
    const [open, setOpen] = useState(false);
    const [idx, setIdx] = useState(0);
    const photo = useMemo(() => PHOTOS[idx] || null, [idx]);

    const openModal = useCallback((i) => { setIdx(i); setOpen(true); }, []);
    const closeModal = useCallback(() => setOpen(false), []);
    const next = useCallback(() => setIdx((i) => (i + 1) % PHOTOS.length), []);
    const prev = useCallback(() => setIdx((i) => (i - 1 + PHOTOS.length) % PHOTOS.length), []);

    /* ESC / ← → */
    useEffect(() => {
        if (!open) return;
        const onKey = (e) => {
            if (e.key === "Escape") closeModal();
            if (e.key === "ArrowRight") next();
            if (e.key === "ArrowLeft") prev();
        };
        window.addEventListener("keydown", onKey);
        return () => window.removeEventListener("keydown", onKey);
    }, [open, closeModal, next, prev]);

    return (
        <main className="gallery-wrap" role="main" aria-label="갤러리">
            <header className="gallery-hero">
                <h1 className="gh-title">Gallery</h1>
                <p className="gh-sub">우리가 쌓아온 시간, 우리가 쌓아갈 시간</p>
            </header>

            <section className="album-grid">
                {PHOTOS.map((p, i) => (
                    <button
                        key={i}
                        type="button"
                        className="polaroid"
                        onClick={() => openModal(i)}
                        title={p.title || "open"}
                    >
                        <div className="p-thumb">
                            <img
                                src={p.src}
                                alt={p.title || `photo-${i + 1}`}
                                loading="lazy"
                                onError={(e) => (e.currentTarget.style.opacity = "0")}
                            />
                        </div>
                        <footer className="p-caption">
                            {(p.tags || []).map((t, j) => (
                                <span className="chip" key={j}>#{t}</span>
                            ))}
                        </footer>
                    </button>
                ))}
            </section>

            {open && photo && (
                <div className="g-overlay" onClick={closeModal} role="dialog" aria-modal="true">
                    <div className="g-dialog" onClick={(e) => e.stopPropagation()}>
                        <button className="g-close" onClick={closeModal} aria-label="닫기">×</button>
                        <button className="g-nav prev" onClick={prev} aria-label="이전">❮</button>
                        <button className="g-nav next" onClick={next} aria-label="다음">❯</button>

                        <figure className="g-figure">
                            <img className="g-image" src={photo.src} alt={photo.title || "photo"} />
                            {photo.title && <figcaption className="g-title">{photo.title}</figcaption>}
                        </figure>
                    </div>
                </div>
            )}
        </main>
    );
}
