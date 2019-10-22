browser.webRequest.onBeforeRequest.addListener(details => {
    const url = new URL(details.url)
    const encodedOriginalUrl = url.pathname.slice(1)

    const domain = new URL(decodeURIComponent(encodedOriginalUrl)).host
    const isTrustedDomains = [
        "github.com",
        "raw.github.com",
        "raw.githubusercontent.com",
        "qiita-image-store.s3.amazonaws.com"
    ].includes(domain)

    const isGIForWebP = encodedOriginalUrl.endsWith("gif") || encodedOriginalUrl.endsWith("webp")

    return {
        redirectUrl: isTrustedDomains ? decodeURIComponent(encodedOriginalUrl) : `https://images.weserv.nl/?${isGIForWebP ? "n=-1&" : ""}url=${encodedOriginalUrl}`
    }
}, {
    urls: ["https://qiita-user-contents.imgix.net/*"]
}, ["blocking"])