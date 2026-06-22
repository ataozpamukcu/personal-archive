import { ImageResponse } from "next/og";

export const size = {
  width: 32,
  height: 32,
};

export const contentType = "image/png";

export default function Icon() {
  return new ImageResponse(
    (
      <div
        style={{
          alignItems: "center",
          background: "#171715",
          color: "#f7f7f3",
          display: "flex",
          fontFamily: "Georgia, serif",
          fontSize: 15,
          height: "100%",
          justifyContent: "center",
          letterSpacing: "-1px",
          width: "100%",
        }}
      >
        AO
      </div>
    ),
    size,
  );
}
