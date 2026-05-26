import {
  AttachmentBuilder,
  Colors,
  ContainerBuilder,
  MediaGalleryBuilder,
  MediaGalleryItemBuilder,
  MessageFlags,
  SeparatorBuilder,
  SeparatorSpacingSize,
} from "discord.js";

import type { Message, Client } from "discord.js";

import { resolveAsset, GenTitleImage } from "#Utilities";

function createGallery(url: string) {
  return new MediaGalleryBuilder().addItems(
    new MediaGalleryItemBuilder().setURL(url),
  );
}

async function getTitleAttachment() {
  try {
    return await GenTitleImage({
      text: "Welcome to the Ticket",
      fontSize: 20,
      returnType: "attachment",
    });
  } catch (error) {
    console.error("Error generating title image:", error);

    return new AttachmentBuilder(resolveAsset("Media/title.png")).setName(
      "title.png",
    );
  }
}

export default async function (message: Message, client: Client) {
  if (
    message.content !== "!container" ||
    !message.channel.isTextBased() ||
    !("send" in message.channel)
  ) {
    return;
  }

  const titleAttachment = await getTitleAttachment();

  const bodyAttachment = new AttachmentBuilder(
    resolveAsset("Media/body.png"),
  ).setName("body.png");

  const container = new ContainerBuilder()
    .setAccentColor(Colors.Aqua)
    .addMediaGalleryComponents(createGallery("attachment://title.png"))
    .addSeparatorComponents(
      new SeparatorBuilder().setSpacing(SeparatorSpacingSize.Small),
    )
    .addMediaGalleryComponents(createGallery("attachment://body.png"));

  await message.channel.send({
    flags: MessageFlags.IsComponentsV2,
    components: [container],
    files: [titleAttachment, bodyAttachment],
  });
}
