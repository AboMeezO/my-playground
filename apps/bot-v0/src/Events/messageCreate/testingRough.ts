import { type Message, type Client, AttachmentBuilder } from "discord.js";

import { Canvas } from "skia-canvas";
import rough from "roughjs";

export default async function (message: Message, client: Client) {
  if (
    message.content !== "!rough" ||
    !message.channel.isTextBased() ||
    !("send" in message.channel)
  ) {
    return;
  }

  const width = 1000;
  const height = 600;

  const canvas = new Canvas(width, height);
  const ctx = canvas.getContext("2d");

  // background
  ctx.fillStyle = "#0f172a";
  ctx.fillRect(0, 0, width, height);

  // title
  ctx.fillStyle = "white";
  ctx.font = "bold 42px Arial";
  ctx.fillText("Monthly Revenue", 50, 60);

  const rc = rough.canvas(canvas as any);

  // chart area
  const chartX = 100;
  const chartY = 500;

  const chartWidth = 750;
  const chartHeight = 350;

  // axes
  rc.line(chartX, chartY, chartX + chartWidth, chartY, {
    stroke: "white",
    strokeWidth: 3,
    roughness: 1.5,
  });

  rc.line(chartX, chartY, chartX, chartY - chartHeight, {
    stroke: "white",
    strokeWidth: 3,
    roughness: 1.5,
  });

  // data
  const data = [
    { label: "Jan", value: 120 },
    { label: "Feb", value: 200 },
    { label: "Mar", value: 160 },
    { label: "Apr", value: 300 },
    { label: "May", value: 250 },
  ];

  const maxValue = 300;

  const barWidth = 80;
  const gap = 50;

  data.forEach((item, index) => {
    const x = chartX + 40 + index * (barWidth + gap);

    const barHeight = (item.value / maxValue) * chartHeight;

    const y = chartY - barHeight;

    // rough bar
    rc.rectangle(x, y, barWidth, barHeight, {
      fill: "#3b82f6",
      fillStyle: "hachure",
      stroke: "white",
      strokeWidth: 2,
      roughness: 2,
      hachureGap: 8,
    });

    // value text
    ctx.fillStyle = "white";
    ctx.font = "24px Arial";

    ctx.fillText(String(item.value), x + 12, y - 10);

    // label text
    ctx.fillText(item.label, x + 10, chartY + 35);
  });

  // grid lines
  for (let i = 1; i <= 5; i++) {
    const y = chartY - (chartHeight / 5) * i;

    rc.line(chartX, y, chartX + chartWidth, y, {
      stroke: "rgba(255,255,255,0.15)",
      strokeWidth: 1,
      roughness: 1,
    });
  }

  const attachment = new AttachmentBuilder(await canvas.toBuffer("png"), {
    name: "chart.png",
  });

  await message.channel.send({
    files: [attachment],
  });
}
