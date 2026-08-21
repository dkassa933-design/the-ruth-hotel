# The Ruth Hotel — full-stack website

Includes a responsive hotel website, booking-request form, Cloudflare Pages Function backend and D1 database schema.

Verified public contact used: +251 918 350 083. Email, social media, rooms, prices and amenities are NOT invented.

## Free internet deployment

Use Cloudflare Pages + Cloudflare D1.

1. Create a free Cloudflare account: https://dash.cloudflare.com/
2. Create a D1 database named `the-ruth-hotel-db`.
3. Open D1 Console and run all of `schema.sql`.
4. Put this folder in a GitHub repository.
5. In Cloudflare: Workers & Pages → Create → Pages → Connect to Git.
6. Select the repository. No framework; build command blank; output directory `/`.
7. In Pages Settings → Functions → D1 bindings, bind variable `DB` to `the-ruth-hotel-db`.
8. In Settings → Variables and Secrets, create `ADMIN_TOKEN` with a long private value.
9. Redeploy.
10. Your free address will be a Cloudflare Pages URL such as `your-project.pages.dev`.

Booking requests are saved in D1. The form is a request-to-book, not live room availability or payment.

Admin requests can be viewed privately at:
`https://YOUR-SITE.pages.dev/api/bookings?token=YOUR_ADMIN_TOKEN`

## Photos

The website deliberately contains photo slots because no authorized hotel photo files were supplied. Replace the slots with The Ruth Hotel's own authorized exterior, room, bed, bathroom, lobby, reception, dining, outdoor and view photos. Do not use generated rooms or unlicensed third-party photos.

## WhatsApp

Do not activate WhatsApp until the hotel confirms that +251 918 350 083 is a WhatsApp number. Then the button can use `https://wa.me/251918350083`.

## Domain

The free Pages URL costs nothing. A custom .com domain normally costs money; add one later if the hotel owns/buys a domain.
