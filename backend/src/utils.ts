export function slugify(text: string): string {
  return text
    .toLowerCase()
    .trim()
    .replace(/å/g, "a")
    .replace(/ä/g, "a")
    .replace(/ö/g, "o")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/(^-|-$)/g, "");
}

/* 
Funktionen är till för att göra ett textnamn till en URL-vänlig sträng.

toLowerCase gör om all text till gemener, dvs alla småbokstäver.
trim tar bort onödiga mellanslag
replace byter ut svenska bokstäver till deras engelska motsvarhet
 .replace(/[^a-z0-9]+/g, "-") leter efter allt som inte är en bokstav och ersätter det med ett bindestreck. 
 .replace(/(^-|-$)/g, "") tar bort bindestreck i början eller slutet av strängen.
*/
