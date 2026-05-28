async function getVideos() {

    const response = await fetch(`${API_URL}/videos`);

    return await response.json();
}