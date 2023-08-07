The project is supposed to find solution to the following:

```
Create a grid of 50x50. When you click on a cell, all values in the cells in the same row and column are increased  by 1. If a cell is empty, it will get a value of 1. After each change a cell will briefly turn yellow. If 5 consecutive numbers in the Fibonacci sequence are next to each other, these cells will briefly turn green and will be cleared. Use the programming language of your choice.
```

As I'm still exploring React which is very new for me, I decided to make it harder for me by using it. I decided to go with [Next.js](https://nextjs.org/) project bootstrapped with [`create-next-app`](https://github.com/vercel/next.js/tree/canary/packages/create-next-app).

The solution is a kind of brute force method I tried first and in the end seemed to be "fast" enough for me to commit for this simple variant.
The gist of it is that after every click, it checks every cell in the grid and from that cell it goes in all 4 directions to check for the Fibonacci numbers. The numbers are stored in a pregenerated array, so I'm just doing a cell by cell comparison.

Originally, when thinking about the problem, I was planning to use Fibonacci sequence definition (the number is the sum of previous two) for the checks, but I ended up having a problem with identifying the first number of the searched sequence. I'd assume doing sum operations might be faster than accessing array members.

I could also be doing the checks only on the incremented cells instead of all of them and then I would have to do the sequence search in both directions.

One more thing I'd like to note: The checker is considering an empty cell as a zero and therefore it takes it into account as part of the sequence. So it clears the empty-1-1-2-3 row. It could definitely be fixed by replacing the initial/cleared value by null for example, if needed.

## Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js/) - your feedback and contributions are welcome!

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/deployment) for more details.
