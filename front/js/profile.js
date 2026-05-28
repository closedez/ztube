async function deleteVideo(videoId) {

    const response = await fetch(
        `${API_URL}/videos/${videoId}`,
        {
            method: "DELETE"
        }
    );

    return await response.json();
}