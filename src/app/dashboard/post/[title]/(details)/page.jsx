
import { CONFIG } from 'src/global-config';
import { getPost } from 'src/actions/blog-ssr';

import { PostDetailsView } from 'src/sections/blog/view';

// ----------------------------------------------------------------------

export const metadata = { title: `Post details | Dashboard - ${CONFIG.appName}` };

export default async function Page({ params }) {
  const { title } = await params;

  const { post } = await getPost(title);

  return <PostDetailsView post={post} />;
}

// ----------------------------------------------------------------------

/**
 * Static Exports in Next.js
 *
 * 1. Set `isStaticExport = true` in `next.config.{mjs|ts}`.
 * 2. This allows `()` to pre-render dynamic routes at build time.
 *
 * For more details, see:
 * https://nextjs.org/docs/app/building-your-application/deploying/static-exports
 *
 * NOTE: Remove all "()" functions if not using static exports.
 */
//export async function () {
  //const res = await axios.get(endpoints.post.list);
  //const data = CONFIG.isStaticExport ? res.data.posts : res.data.posts.slice(0, 1);

  //return data.map((post) => ({
   // title: kebabCase(post.title),
 // }));
//}
