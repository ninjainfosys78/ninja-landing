// The CMS this used to fetch banners from (cms.ninjainfosys.com) has been
// unreliable, causing slow page loads and retries. Every page already has a
// static local fallback image, so this now just resolves to that immediately
// instead of hitting the network — no CMS dependency, no loading delay.
export async function getBannerByImgName(_imgName: string): Promise<string | null> {
  return null;
}
