import Image from "next/image";
import { useId } from "react";
import type { ImageAsset, Scene } from "@/lib/projects";

export function Space({
  scene = "threshold",
  label = "Photograph placeholder",
  asset,
  className = "",
  eager = false,
}: {
  scene?: Scene;
  label?: string;
  asset?: ImageAsset;
  className?: string;
  eager?: boolean;
}) {
  const id = useId().replace(/:/g, "");
  return (
    <figure className={`space space-${scene} ${className}`}>
      {asset ? (
        <Image
          src={asset.src}
          alt={asset.alt}
          width={asset.width}
          height={asset.height}
          preload={eager}
          sizes="(max-width: 700px) 100vw, 85vw"
          style={
            {
              "--focal": asset.focalPoint ?? "50% 50%",
              "--mobile-focal":
                asset.mobileFocalPoint ?? asset.focalPoint ?? "50% 50%",
            } as React.CSSProperties
          }
        />
      ) : (
        <svg
          viewBox="0 0 1000 1100"
          preserveAspectRatio="xMidYMid slice"
          role="img"
          aria-label={`Abstract ${scene} study. ${label}. Not a completed project.`}
        >
          <defs>
            <linearGradient id={`${id}-wall`} x1="0" x2="1">
              <stop stopColor="#c3c1b5" />
              <stop offset="1" stopColor="#e0ddd1" />
            </linearGradient>
            <linearGradient id={`${id}-inner`} x1="0" x2="1">
              <stop stopColor="#5c6054" />
              <stop offset="1" stopColor="#898b77" />
            </linearGradient>
            <linearGradient id={`${id}-floor`} x1="0" y1="0" x2=".7" y2="1">
              <stop stopColor="#b1ad9c" />
              <stop offset="1" stopColor="#d2cfbd" />
            </linearGradient>
          </defs>
          <rect width="1000" height="1100" fill={`url(#${id}-wall)`} />
          {scene === "threshold" && (
            <>
              <path d="M280 0H850V870H280Z" fill="#4a4d40" />
              <path d="M325 0H810V833H325Z" fill={`url(#${id}-inner)`} />
              <path d="M325 0L385 82V782L325 833Z" fill="#aaa992" />
              <path d="M385 82H810V782H385Z" fill="#8e907e" />
              <path d="M520 213H735V782H520Z" fill="#424c42" />
              <path d="M550 238H735V782H550Z" fill="#b7b8a0" />
              <path d="M550 238L600 274V744L550 782Z" fill="#dbd8bd" />
              <path
                d="M325 833L385 782H810L850 870L1000 1100H0Z"
                fill={`url(#${id}-floor)`}
              />
              <path
                d="M550 782H735L982 1100H409Z"
                fill="#e6dfc6"
                opacity=".65"
              />
              <path d="M280 0H299V870H280Z" fill="#777a69" />
              <path
                d="M0 954L280 870H850L1000 960"
                fill="none"
                stroke="#898b78"
                strokeWidth="1"
              />
            </>
          )}
          {scene === "passage" && (
            <>
              <path d="M0 0H1000L672 285H363Z" fill="#d9d5c8" />
              <path d="M0 0L363 285V759L0 1100Z" fill="#aaa996" />
              <path d="M1000 0L672 285V759L1000 1100Z" fill="#747b69" />
              <path d="M363 285H672V759H363Z" fill="#535c4c" />
              <path d="M420 345H612V759H420Z" fill="#bdbaa1" />
              <path d="M451 372H612V759H451Z" fill="#e2ddc6" />
              <path
                d="M0 1100L363 759H672L1000 1100Z"
                fill={`url(#${id}-floor)`}
              />
              <path
                d="M612 759L783 1100H295L451 759Z"
                fill="#ebe3ca"
                opacity=".6"
              />
              <path
                d="M147 126V970M268 214V846"
                stroke="#828571"
                strokeWidth="10"
              />
            </>
          )}
          {scene === "light" && (
            <>
              <rect width="690" height="860" fill="#b9bcad" />
              <path d="M690 0H1000V1100L690 860Z" fill="#7a8370" />
              <path d="M0 860H690L1000 1100H0Z" fill="#a0a38e" />
              <path d="M190 0H510L690 700V860H465Z" fill="#e5e1cb" />
              <path d="M465 860H690L906 1100H641Z" fill="#d5d2b7" />
              <path d="M0 728H379V857H0Z" fill="#939982" />
              <path d="M0 707H379L413 728H0Z" fill="#c7c7ad" />
              <path d="M379 707L413 728V836L379 857Z" fill="#687360" />
            </>
          )}
          {scene === "detail" && (
            <>
              <rect width="480" height="1100" fill="#b8b3a1" />
              <rect x="480" width="28" height="1100" fill="#454f43" />
              <rect x="508" width="492" height="1100" fill="#8f9983" />
              <path d="M0 690H1000V720H0Z" fill="#4b5547" />
              <path d="M0 720H1000V1100H0Z" fill="#c7c3ae" />
              <path d="M508 0H558L830 690H780Z" fill="#d9d8bb" opacity=".7" />
            </>
          )}
        </svg>
      )}
      <figcaption>
        {asset ? (
          asset.credit
        ) : (
          <>
            <span className="placeholder-mark" aria-hidden="true" />
            Spatial study · {label}
          </>
        )}
      </figcaption>
    </figure>
  );
}
