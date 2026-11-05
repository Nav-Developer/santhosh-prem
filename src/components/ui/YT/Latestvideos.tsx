// // Server-side helpers. Results are cached by Next.js and refreshed every hour.
// const REVALIDATE = 60 * 60;

// /** Latest YouTube uploads via the channel's public RSS feed (no API key). */
// export async function getLatestYouTube(limit = 6): Promise<string[]> {
//   const channelId = process.env.YOUTUBE_CHANNEL_ID;
//   if (!channelId) return [];

//   try {
//     const res = await fetch(
//       `https://www.youtube.com/feeds/videos.xml?channel_id=${channelId}`,
//       { next: { revalidate: REVALIDATE } },
//     );
//     if (!res.ok) return [];
//     const xml = await res.text();

//     return xml
//       .split("<entry>")
//       .slice(1)
//       .map((entry) => entry.match(/<link rel="alternate" href="([^"]+)"/)?.[1])
//       .filter((u): u is string => !!u)
//       .slice(0, limit);
//   } catch {
//     return [];
//   }
// }

// export async function getLatestInstagram(limit = 6): Promise<string[]> {
//   const token = process.env.INSTAGRAM_ACCESS_TOKEN;
//   if (!token) return [];

//   try {
//     const res = await fetch(
//       `https://graph.instagram.com/me/media?fields=permalink,media_type&limit=25&access_token=${token}`,
//       { next: { revalidate: REVALIDATE } },
//     );
//     if (!res.ok) return [];
//     const json: { data?: { permalink: string; media_type: string }[] } =
//       await res.json();

//     return (json.data ?? [])
//       .filter((m) => m.media_type === "VIDEO")
//       .map((m) => m.permalink)
//       .slice(0, limit);
//   } catch {
//     return [];
//   }
// }
