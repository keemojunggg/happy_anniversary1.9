"use client";

import { useEffect, useRef, useState } from "react";

type FolderType = "eat" | "play" | "love" | null;

export default function Home() {
  const [showCat, setShowCat] = useState(false);
  const [typedText, setTypedText] = useState("");
  const [selectedFolder, setSelectedFolder] =
    useState<FolderType>(null);
  const [currentClipIndex, setCurrentClipIndex] = useState(0);
  const videoRef = useRef<HTMLVideoElement>(null);
  const autoAdvanceRef = useRef(false);
 
useEffect(() => {
    const catTimer = setTimeout(() => {
      setShowCat(true);
    }, 500);

    return () => {
      clearTimeout(catTimer);
    };
  }, []);

  /* =========================
     TYPEWRITER
  ========================= */

  useEffect(() => {
    const messages = [
      "LOVE JIB",
      "Happy Anniversary",
      "1.9M",
    ];

    let messageIndex = 0;
    let characterIndex = 0;
    let deleting = false;

    const typingSpeed = 130;
    const deletingSpeed = 70;

    const pauseAfterTyping = 1800;
    const pauseAfterDeleting = 500;

    let timeout: ReturnType<typeof setTimeout>;

    const type = () => {
      const currentMessage = messages[messageIndex];

      if (!deleting) {
        if (characterIndex < currentMessage.length) {
          characterIndex++;

          setTypedText(
            currentMessage.substring(0, characterIndex)
          );

          timeout = setTimeout(type, typingSpeed);
        } else {
          timeout = setTimeout(() => {
            deleting = true;
            type();
          }, pauseAfterTyping);
        }
      } else {
        if (characterIndex > 0) {
          characterIndex--;

          setTypedText(
            currentMessage.substring(0, characterIndex)
          );

          timeout = setTimeout(type, deletingSpeed);
        } else {
          deleting = false;

          messageIndex =
            (messageIndex + 1) % messages.length;

          characterIndex = 0;

          timeout = setTimeout(
            type,
            pauseAfterDeleting
          );
        }
      }
    };

    timeout = setTimeout(type, 1200);

    return () => {
      clearTimeout(timeout);
    };
  }, []);

  /* =========================
     FOLDER DATA
  ========================= */

  const folders = [
    {
      id: "eat" as FolderType,
      name: "eat",
      color: "purple",
      clips: [
        "/images/eat1.mp4",
        "/images/eat2.mp4",
        "/images/eat3.mp4",
      ],
    },
    {
      id: "play" as FolderType,
      name: "play",
      color: "yellow",
      clips: [
        "/images/play1.mp4",
        "/images/play2.mp4",
        "/images/play3.mp4",
      ],
    },
    {
      id: "love" as FolderType,
      name: "love",
      color: "pink",
      clips: [
        "/images/love.mp4",
      ],
    },
  ];

  const currentFolder = folders.find((f) => f.id === selectedFolder);
  const clips = currentFolder?.clips ?? [];
  const currentClip = clips[currentClipIndex];

  // รีเซ็ตกลับคลิปแรกทุกครั้งที่เลือกโฟลเดอร์ใหม่
  useEffect(() => {
    autoAdvanceRef.current = false;
    setCurrentClipIndex(0);
  }, [selectedFolder]);

  // โหลดคลิปใหม่ทุกครั้งที่ currentClip เปลี่ยน
  // เล่นอัตโนมัติเฉพาะกรณีเล่นต่อจากคลิปก่อนหน้า (ไม่ใช่ตอนเปลี่ยนโฟลเดอร์)
  useEffect(() => {
    if (!videoRef.current || !currentClip) return;

    videoRef.current.load();

    if (autoAdvanceRef.current) {
      videoRef.current.play().catch(() => {});
    }

    autoAdvanceRef.current = false;
  }, [currentClip]);

  const handleVideoEnded = () => {
    if (clips.length <= 1) return;
    autoAdvanceRef.current = true;
    setCurrentClipIndex((prev) => (prev + 1) % clips.length);
  };

  return (
    <main className="page">

      {/* =========================
          BACKGROUND
      ========================= */}

      <div className="grid-background" />


      {/* =========================
          FOLDERS
      ========================= */}

      <div className="folders-container">

        {folders.map((folder) => (
          <button
            key={folder.id}
            className={`folder-item ${
              selectedFolder === folder.id
                ? "folder-selected"
                : ""
            }`}
            onClick={() =>
              setSelectedFolder(folder.id)
            }
          >

            <div className={`folder-icon ${folder.color}`}>

              <div className="folder-tab" />

              <div className="folder-body" />

            </div>

            <span className="folder-name">
              {folder.name}
            </span>

          </button>
        ))}

      </div>


      {/* =========================
          PAINT ICON
      ========================= */}

      <div className="paint-icon">

        <svg
          viewBox="0 0 120 120"
          xmlns="http://www.w3.org/2000/svg"
        >

          <rect
            x="5"
            y="5"
            width="110"
            height="110"
            rx="14"
            className="icon-card"
          />

          <path
            d="
              M60 18
              C34 18 19 36 19 58
              C19 79 35 94 57 94
              C70 94 75 87 75 79
              C75 74 71 70 66 70
              H55
              C50 70 47 66 47 61
              C47 57 50 53 55 53
              H72
              C90 53 101 42 101 31
              C101 23 89 18 76 18
              Z
            "
            className="palette"
          />

          <circle
            cx="39"
            cy="47"
            r="6"
            className="paint-dot"
          />

          <circle
            cx="52"
            cy="34"
            r="6"
            className="paint-dot"
          />

          <circle
            cx="69"
            cy="31"
            r="6"
            className="paint-dot"
          />

          <path
            d="
              M77 38
              C86 34 91 37 91 44
              C91 50 85 54 79 53
              C75 51 74 46 77 38Z
            "
            className="paint-brush"
          />

        </svg>

      </div>


      {/* =========================
          MAIL ICON
      ========================= */}

      <div className="mail-icon">

        <svg
          viewBox="0 0 120 120"
          xmlns="http://www.w3.org/2000/svg"
        >

          <rect
            x="5"
            y="5"
            width="110"
            height="110"
            rx="14"
            className="icon-card"
          />

          <rect
            x="28"
            y="31"
            width="64"
            height="48"
            rx="7"
            className="mail-envelope"
          />

          <path
            d="M29 36 L60 59 L91 36"
            className="mail-fold"
          />

          <path
            d="
              M42 59
              C51 67 55 71 60 71
              C65 71 69 67 78 59
            "
            className="mail-heart-line"
          />

          <path
            d="
              M54 67
              C54 62 49 60 46 63
              C43 65 44 69 47 72
              L60 82
              L73 72
              C76 69 77 65 74 63
              C71 60 66 62 66 67
              C64 64 56 64 54 67
            "
            className="heart"
          />

        </svg>

      </div>


      {/* =========================
          MAIN WINDOW
      ========================= */}

      <section className="window">


        {/* WINDOW HEADER */}

        <div className="window-header">

          <div className="window-title">
            For You &lt;3
          </div>

          <div className="window-buttons">

            <span className="window-button minimize">
              —
            </span>

            <span className="window-button maximize">
              □
            </span>

            <span className="window-button close">
              ×
            </span>

          </div>

        </div>


        {/* WINDOW BODY */}

        <div className="window-body">


          {/* CODE LABEL - BACK BUTTON */}

          <button
            onClick={() => setSelectedFolder(null)}
            className="code-label"
            title="Back to home"
          >

            <span>
              console.log(
            </span>

            <span className="code-yellow">
              &quot;Hello World!&quot;
              
            </span>

            <span>
              );
            </span>

          </button>


          {/* =========================
              CONTENT
          ========================= */}

          <div className="content">


            {/* =========================
                CAT
            ========================= */}

            <div
              className={`cat-wrapper ${
                showCat ? "cat-visible" : ""
              }`}
            >

              <svg
                className="cat-svg"
                viewBox="0 0 430 360"
                xmlns="http://www.w3.org/2000/svg"
              >

                {/* TAIL */}

                <path
                  d="
                    M102 270
                    C58 280 49 232 72 210
                    C87 197 110 206 108 222
                  "
                  fill="none"
                  stroke="#6d3f3f"
                  strokeWidth="11"
                  strokeLinecap="round"
                />


                {/* BODY */}

                <path
                  d="
                    M107 179
                    C102 222 109 277 151 294
                    C188 309 252 301 271 267
                    C289 236 278 184 254 164
                    Z
                  "
                  fill="#ee9140"
                  stroke="#6d3f3f"
                  strokeWidth="9"
                />


                {/* HEAD */}

                <path
                  d="
                    M104 102
                    C101 66 104 43 128 28
                    L151 48
                    C171 38 204 36 226 47
                    L249 27
                    C274 47 279 79 274 114
                    C292 127 302 150 301 178
                    C299 219 269 245 225 250
                    C178 256 129 239 112 205
                    C97 175 96 132 104 102Z
                  "
                  fill="#ee9140"
                  stroke="#6d3f3f"
                  strokeWidth="9"
                />


                {/* EARS */}

                <path
                  d="M124 48 L148 70 L130 78 Z"
                  fill="#f5bb68"
                />

                <path
                  d="M244 47 L225 69 L261 75 Z"
                  fill="#f5bb68"
                />


                {/* EAR DETAILS */}

                <path
                  d="M131 51 L144 66"
                  stroke="#db7936"
                  strokeWidth="5"
                  strokeLinecap="round"
                />

                <path
                  d="M251 52 L230 68"
                  stroke="#db7936"
                  strokeWidth="5"
                  strokeLinecap="round"
                />


                {/* EYES */}

                <circle
                  cx="153"
                  cy="136"
                  r="11"
                  fill="#593534"
                />

                <circle
                  cx="232"
                  cy="136"
                  r="11"
                  fill="#593534"
                />

                <circle
                  cx="157"
                  cy="132"
                  r="3"
                  fill="white"
                  opacity="0.8"
                />

                <circle
                  cx="236"
                  cy="132"
                  r="3"
                  fill="white"
                  opacity="0.8"
                />


                {/* NOSE */}

                <path
                  d="
                    M188 157
                    C191 152 200 152 204 157
                    C204 163 198 166 196 166
                    C192 166 188 163 188 157Z
                  "
                  fill="#d87879"
                />


                {/* MOUTH */}

                <path
                  d="
                    M196 165
                    C196 179 182 182 179 176
                    M196 165
                    C196 179 211 182 215 175
                  "
                  fill="none"
                  stroke="#693738"
                  strokeWidth="4"
                  strokeLinecap="round"
                />


                {/* CHEEKS */}

                <circle
                  cx="131"
                  cy="164"
                  r="10"
                  fill="#f6a5a7"
                />

                <circle
                  cx="252"
                  cy="164"
                  r="10"
                  fill="#f6a5a7"
                />


                {/* CHEEK LINES */}

                <path
                  d="
                    M125 160 L117 156
                    M127 166 L118 165
                    M258 160 L267 156
                    M258 166 L268 165
                  "
                  stroke="#e1787e"
                  strokeWidth="3"
                  strokeLinecap="round"
                />


                {/* CHEST */}

                <path
                  d="
                    M154 208
                    C154 189 178 180 197 183
                    C218 187 235 200 237 218
                    C239 237 223 253 198 253
                    C175 253 156 238 154 208Z
                  "
                  fill="#f3a34d"
                />


                {/* PAW */}

                <path
                  d="
                    M104 229
                    C116 223 132 225 144 237
                    C151 244 148 256 139 259
                    C128 263 111 257 103 248
                  "
                  fill="#ee9140"
                  stroke="#6d3f3f"
                  strokeWidth="8"
                />


                {/* COFFEE */}

                <g transform="translate(50 214)">

                  <ellipse
                    cx="30"
                    cy="7"
                    rx="25"
                    ry="8"
                    fill="#d98a4a"
                    stroke="#6d3f3f"
                    strokeWidth="4"
                  />

                  <path
                    d="
                      M7 9
                      L12 60
                      C16 69 43 69 48 60
                      L53 9Z
                    "
                    fill="#c98c61"
                    stroke="#6d3f3f"
                    strokeWidth="4"
                  />

                  <path
                    d="M15 28 H46"
                    stroke="#f4d3ae"
                    strokeWidth="5"
                  />

                  <path
                    d="M15 40 H45"
                    stroke="#f4d3ae"
                    strokeWidth="5"
                  />

                </g>


                {/* LAPTOP */}

                <g transform="translate(138 205)">

                  <path
                    d="
                      M25 8
                      C24 3 28 0 34 0
                      H185
                      C191 0 195 4 195 9
                      V77
                      H25Z
                    "
                    fill="#c9dceb"
                    stroke="#6d3f3f"
                    strokeWidth="8"
                  />

                  <path
                    d="
                      M7 77
                      H208
                      C215 77 220 82 220 87
                      C220 91 215 94 209 94
                      H18
                      C10 94 4 91 4 86
                      C4 82 8 78 7 77Z
                    "
                    fill="#e87880"
                    stroke="#6d3f3f"
                    strokeWidth="8"
                  />

                  <path
                    d="
                      M119 40
                      C119 31 106 28 100 38
                      C94 28 81 31 81 40
                      C81 53 100 61 100 61
                      C100 61 119 53 119 40Z
                    "
                    fill="#ef777b"
                  />

                </g>

              </svg>

            </div>


            {/* =========================
    SELECTED PHOTO
========================= */}

            <div className="photo-area">

              {selectedFolder ? (
                <div
                  key={selectedFolder}
                  className="folder-photo-popup"
                >

                  <video
                    key={currentClip}
                    ref={videoRef}
                    src={currentClip}
                    className="folder-video"
                    controls
                    playsInline
                    onEnded={handleVideoEnded}
                  />

                  {clips.length > 1 && (
                    <div className="clip-counter">
                      {currentClipIndex + 1} / {clips.length}
                    </div>
                  )}

                  <div className="photo-label">
                    {selectedFolder}
                  </div>

                </div>
              ) : (
                <div className="photo-placeholder">
                  <span>♡</span>
                </div>
              )}

            </div>


            {/* =========================
                TEXT
            ========================= */}

            <div className="message">

              <div className="typewriter-text">

                {typedText}

                <span className="typing-cursor">
                  |
                </span>

              </div>

            </div>

          </div>

        </div>

      </section>

    </main>
  );
}