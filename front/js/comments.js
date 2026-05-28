async function getComments(videoId) {

    try {

        const response = await fetch(
            `${API_URL}/comments/${videoId}`
        );

        const data =
            await response.json();

        if (!Array.isArray(data)) {
            return [];
        }

        return data;

    } catch (error) {

        console.error(error);

        return [];
    }
}


async function addComment(
    videoId,
    text
) {

    try {

        const response = await fetch(
            `${API_URL}/comments`,
            {

                method: "POST",

                headers: {
                    "Content-Type": "application/json"
                },

                body: JSON.stringify({

                    video_id: videoId,

                    author:
                        localStorage.getItem("username"),

                    text: text

                })

            }
        );

        return await response.json();

    } catch (error) {

        console.error(error);

        return {
            error: "Ошибка комментария"
        };
    }
}