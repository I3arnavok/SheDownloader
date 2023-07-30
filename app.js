const express = require("express");
const ytdl = require("ytdl-core");
const ffmpeg = require("fluent-ffmpeg");
const ffmpegPath = require("@ffmpeg-installer/ffmpeg").path;
require("fluent-ffmpeg");

ffmpeg.setFfmpegPath(ffmpegPath);





const app = express();

// A letöltési útvonal kezelése
app.get("/download", async (req, res) => {
  // A lekérdezés paramétereinek kinyerése
  const { URL, format } = req.query;

  try {
    // A videó címének lekérése
    const info = await ytdl.getInfo(URL);
    // A videó címének formázása
    const title = info.videoDetails.title.replace(/[^\w\s]/gi, "");

    // A válasz fejlécének beállítása
    res.header(
      "Content-Disposition",
      `attachment; filename="${title}.${format}"`
    );

    // A videó letöltése és konvertálása
    const stream = ytdl(URL, { filter: "audioonly" });
    if (format === "mp3") {
      ffmpeg(stream)
        .audioBitrate(128)
        .toFormat("mp3")
        .pipe(res);
    } else if (format === "mkv") {
        ffmpeg(stream)
          .videoCodec("libx264")
          .audioCodec("aac")
          .toFormat("mkv")
          .pipe(res);
      }
       else {
      res.status(400).send("Érvénytelen formátum.");
    }
  } catch (err) {
    res.status(500).send("Hiba történt a videó információinak lekérése közben.");
  }
});

// A szerver indítása
const port = process.env.PORT || 3000;
app.listen(port, () => {
  console.log(`A szerver fut a ${port} porton.`);
});
