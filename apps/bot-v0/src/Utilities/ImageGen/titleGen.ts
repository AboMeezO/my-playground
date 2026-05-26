import { Canvas, FontLibrary, loadImage } from "skia-canvas";
import { TitleGenParams } from "#Types";
import { resolveAsset } from "#Utilities";
import { Attachment, AttachmentBuilder } from "discord.js";
FontLibrary.use("Excalifont", resolveAsset("Fonts/Excalifont-Regular.woff2"));
export default async function GenTitleImage({
  text,
  fontSize = 24,
  returnType = "attachment",
}: TitleGenParams) {
  const image = await loadImage(resolveAsset("Media/title.png"));

  const canvas = new Canvas(image.width, image.height);
  const ctx = canvas.getContext("2d");
  ctx.drawImage(image, 0, 0);

  ctx.fillStyle = "#ffffff";
  ctx.font = `${fontSize}px Excalifont`;
  ctx.textBaseline = "middle";

  const metrics = ctx.measureText(text);
  const textWidth = metrics.width;
  const fontHeight =
    metrics.actualBoundingBoxAscent + metrics.actualBoundingBoxDescent;
  const x = 40;
  const y = canvas.height / 2;
  const paddingX = 12;
  const paddingY = 8;

  ctx.fillStyle = "#1f2326";
  ctx.fillRect(
    x - paddingX,
    y - metrics.actualBoundingBoxAscent - paddingY,
    textWidth + paddingX * 2,
    fontHeight + paddingY * 2,
  );

  ctx.fillStyle = "#ffffff";
  ctx.fillText(text, x, y);

  const imageBuffer = await canvas.toBuffer("png");
  return returnType === "attachment"
    ? new AttachmentBuilder(imageBuffer, { name: "title.png" })
    : imageBuffer;
}
