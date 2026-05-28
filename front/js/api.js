async function getVideos() {

    try {

        const response = await fetch(
            `${API_URL}/videos`
        );

        const data =
            await response.json();

        if (!Array.isArray(data)) {

            return [];

        }

        return data;

    } catch {

        return [];

    }
}


async function deleteVideo(videoId) {

    const response = await fetch(
        `${API_URL}/videos/${videoId}`,
        {
            method: "DELETE"
        }
    );

    return await response.json();
}