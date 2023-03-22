# Ordering App Base

This project was created watching these 2 videos:

- [FE Video](https://www.youtube.com/watch?v=Z-hACIsjv4E)
- [BE Video](https://www.youtube.com/watch?v=vIxGDq1SPZQ)

But with Typescript and no paypal integration.

## To run it:

- Copy `.env.example` and rename to `.env`
- Create an atlas account (check instructions [here](https://github.com/engdlee/social-media-app-base))
- Create a cloudinary account
- Create an `unsigned` `upload preset` in cloudinary
- Add the `NEXT_PUBLIC_UPLOAD_PRESET` to the `.env` file
- Add the `MONGODB_URI` to the `.env` file
- Add the `NEXT_PUBLIC_CLOUD_NAME` to the `.env` file
- `ADMIN_USERNAME`, `ADMIN_PASSWORD` and `TOKEN` can be whatever you want
- Add the `NEXT_PUBLIC_URL` to the `.env` file, usually `http://localhost:3000` if you are not running another process in that `port`
- Run `npm i`
- Run `npm run dev`

## To use it:

- Go to `/admin` to `login` and see the current food created and the current orders
- To add more food go to the `homepage` after loggedin, there is a button to add more food
- It can be used to sell any food, this example is for pizza
