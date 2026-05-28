async function uploadVideo(
    title,
    file,
    thumbnail
) {

    const formData = new FormData();

    formData.append("title", title);

    formData.append("video", file);

    formData.append(
        "thumbnail",
        thumbnail
    );

    formData.append(
        "author",
        localStorage.getItem("username")
    );

    const response = await fetch(
        `${API_URL}/upload`,
        {

            method: "POST",

            body: formData

        }
    );

    return await response.json();
}