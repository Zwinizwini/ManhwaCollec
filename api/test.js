

export default async function test(req, res) {
    const {name} = req.query
    const response = await fetch("https://comick-source-api.notaspider.dev/api/search", {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({
            query: name,
            source: "all"
        })
    })
    const text = await response.text()
    const results = text
        .split('\n')
        .filter(line => line.trim())
        .map(line => JSON.parse(line))

    return res.status(200).json(results)
}