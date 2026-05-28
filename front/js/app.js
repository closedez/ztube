const API_URL = "http://127.0.0.1:5000/api";



const root = ReactDOM.createRoot(
    document.getElementById("root")
);

function App(){

    const [videos,setVideos] =
        React.useState([]);

    const [selectedVideo,setSelectedVideo] =
        React.useState(null);

    const [search,setSearch] =
        React.useState("");

    const [profileUser,setProfileUser] =
        React.useState(null);

    const [showUpload,setShowUpload] =
        React.useState(false);

    const [avatar,setAvatar] =
        React.useState("");

    const [isLogged,setIsLogged] =
        React.useState(
            !!localStorage.getItem(
                "username"
            )
        );

    const currentUser =
        localStorage.getItem(
            "username"
        );

    React.useEffect(()=>{

        loadVideos();

        if(currentUser){

            loadAvatar();
        }

    },[]);

    async function loadVideos(){

        try{

            const res = await fetch(
                `${API_URL}/videos`
            );

            const data =
                await res.json();

            setVideos(
                Array.isArray(data)
                    ? data.reverse()
                    : []
            );

        }catch(err){

            console.log(err);
        }
    }

    async function loadAvatar(){

        try{

            const res = await fetch(
                `${API_URL}/user/${currentUser}`
            );

            const data =
                await res.json();

            if(data.avatar){

                setAvatar(data.avatar);
            }

        }catch(err){

            console.log(err);
        }
    }

    async function uploadAvatar(e){

        const file =
            e.target.files[0];

        if(!file) return;

        const form =
            new FormData();

        form.append(
            "username",
            currentUser
        );

        form.append(
            "avatar",
            file
        );

        try{

            const res = await fetch(

                `${API_URL}/avatar`,

                {
                    method:"POST",
                    body:form
                }
            );

            const data =
                await res.json();

            setAvatar(data.avatar);

        }catch(err){

            console.log(err);
        }
    }

    async function likeVideo(id){

    try{

        await fetch(

            `${API_URL}/videos/like/${id}`,

            {
                method:"POST",

                headers:{
                    "Content-Type":"application/json"
                },

                body:JSON.stringify({
                    username: currentUser
                })
            }
        );

        loadVideos();

    }catch(err){

        console.log(err);
    }
}

    async function dislikeVideo(id){

    try{

        const res = await fetch(

            `${API_URL}/videos/dislike/${id}`,

            {
                method:"POST",

                headers:{
                    "Content-Type":"application/json"
                },

                body:JSON.stringify({
                    username: currentUser
                })
            }
        );

        const data = await res.json();

        console.log(data);

        loadVideos();

    }catch(err){

        console.log(err);
    }
}

    async function uploadVideo(e){

        e.preventDefault();

        const form =
            new FormData();

        form.append(
            "title",
            e.target.title.value
        );

        form.append(
            "author",
            currentUser
        );

        form.append(
            "video",
            e.target.video.files[0]
        );

        if(
            e.target.thumbnail.files[0]
        ){

            form.append(
                "thumbnail",
                e.target.thumbnail.files[0]
            );
        }

        await fetch(
            `${API_URL}/upload`,
            {
                method:"POST",
                body:form
            }
        );

        setShowUpload(false);

        loadVideos();
    }

    function logout(){

        localStorage.removeItem(
            "username"
        );

        setIsLogged(false);

        window.location.reload();
    }

    if(!isLogged){

        return React.createElement(
            "div",
            {
                style:{
                    width:"100%",
                    height:"100vh",
                    display:"flex",
                    justifyContent:"center",
                    alignItems:"center",
                    flexDirection:"column",
                    gap:"20px",
                    background:"#050505",
                    color:"#fff"
                }
            },

            React.createElement(
                "h1",
                {
                    style:{
                        fontSize:"64px",
                        margin:"0"
                    }
                },

                "zTube"
            ),

            React.createElement(
                "button",
                {
                    className:"header-btn",

                    onClick:async()=>{

                        const username =
                            prompt("Логин");

                        const password =
                            prompt("Пароль");

                        const res = await fetch(

                            `${API_URL}/login`,

                            {
                                method:"POST",

                                headers:{
                                    "Content-Type":
                                        "application/json"
                                },

                                body:JSON.stringify({
                                    username,
                                    password
                                })
                            }
                        );

                        const data =
                            await res.json();

                        if(data.error){

                            alert(data.error);

                            return;
                        }

                        localStorage.setItem(
                            "username",
                            data.username
                        );

                        window.location.reload();
                    }
                },

                "Войти"
            ),

            React.createElement(
                "button",
                {
                    className:"create-btn",

                    onClick:async()=>{

                        const username =
                            prompt("Логин");

                        const password =
                            prompt("Пароль");

                        const res = await fetch(

                            `${API_URL}/register`,

                            {
                                method:"POST",

                                headers:{
                                    "Content-Type":
                                        "application/json"
                                },

                                body:JSON.stringify({
                                    username,
                                    password
                                })
                            }
                        );

                        const data =
                            await res.json();

                        if(data.error){

                            alert(data.error);

                            return;
                        }

                        localStorage.setItem(
                            "username",
                            username
                        );

                        window.location.reload();
                    }
                },

                "Регистрация"
            )
        );
    }

    const filteredVideos =
        videos.filter(video=>{

            const q =
                search.toLowerCase();

            return (

                (video.title || "")
                    .toLowerCase()
                    .includes(q)

                ||

                (video.author || "")
                    .toLowerCase()
                    .includes(q)
            );
        });

    const profileVideos =
        videos.filter(video=>

            video.author === profileUser
        );

    return React.createElement(
        "div",
        {
            className:"app"
        },

        React.createElement(
            "div",
            {
                className:"header"
            },

            React.createElement(
                "div",
                {
                    className:"header-left"
                },

                React.createElement(
                    "div",
                    {
                        className:"logo",

                        onClick:()=>{

                            setProfileUser(null);
                        }
                    },

                    "zTube"
                ),

                React.createElement(
                    "input",
                    {
                        className:"search-input",

                        placeholder:"Поиск видео...",

                        value:search,

                        onChange:(e)=>

                            setSearch(
                                e.target.value
                            )
                    }
                )
            ),

            React.createElement(
                "div",
                {
                    className:"header-right"
                },

                React.createElement(
                    "img",
                    {
                        className:"header-avatar",

                        src:

                            avatar

                            ?

                            `${API_URL}/avatar/view/${avatar}`

                            :

                            "https://cdn-icons-png.flaticon.com/512/149/149071.png",

                            style:{
            width:"46px",
            height:"46px",
            borderRadius:"50%",
            objectFit:"cover",
            flexShrink:"0"
                    }
                }
                ),

                React.createElement(
                    "label",
                    {
                        className:"header-btn"
                    },

                    "Аватар",

                    React.createElement(
                        "input",
                        {
                            type:"file",

                            hidden:true,

                            onChange:
                                uploadAvatar
                        }
                    )
                ),

                React.createElement(
                    "button",
                    {
                        className:"header-btn",

                        onClick:()=>

                            setProfileUser(
                                currentUser
                            )
                    },

                    "Мой профиль"
                ),

                React.createElement(
                    "button",
                    {
                        className:
                            "header-btn logout-btn",

                        onClick:logout
                    },

                    "Выйти"
                ),

                React.createElement(
                    "button",
                    {
                        className:
                            "header-btn create-btn",

                        onClick:()=>

                            setShowUpload(true)
                    },

                    "+ Создать видео"
                )
            )
        ),

        profileUser &&

        React.createElement(
            "div",
            {
                className:"profile-header"
            },

            React.createElement(
                "img",
                {
                    className:"profile-avatar",

                    src:

                        avatar

                        ?

                        `${API_URL}/avatar/view/${avatar}`

                        :

                        "https://cdn-icons-png.flaticon.com/512/149/149071.png"
                }
            ),

            React.createElement(
                "div",
                null,

                React.createElement(
                    "div",
                    {
                        className:"profile-name"
                    },

                    profileUser
                ),

                React.createElement(
                    "p",
                    null,

                    `Видео: ${profileVideos.length}`
                )
            )
        ),

        showUpload &&

        React.createElement(
            "div",
            {
                className:"video-modal",

                onClick:()=>setShowUpload(false)
            },

            React.createElement(
                "div",
                {
                    className:"modal-content",

                    onClick:(e)=>
                        e.stopPropagation()
                },

                React.createElement(
                    "form",
                    {
                        className:"upload-form",

                        onSubmit:
                            uploadVideo
                    },

                    React.createElement(
                        "input",
                        {
                            name:"title",

                            placeholder:"Название"
                        }
                    ),

                    React.createElement(
                        "input",
                        {
                            type:"file",

                            name:"video"
                        }
                    ),

                    React.createElement(
                        "input",
                        {
                            type:"file",

                            name:"thumbnail"
                        }
                    ),

                    React.createElement(
                        "button",
                        {
                            type:"submit"
                        },

                        "Опубликовать"
                    )
                )
            )
        ),

        React.createElement(
            "div",
            {
                className:"video-grid"
            },

            (profileUser
                ? profileVideos
                : filteredVideos
            ).map(video=>

                React.createElement(
                    "div",
                    {
                        key:video.id,

                        className:"video-card",

                        onClick:()=>

                            setSelectedVideo(video)
                    },

                    React.createElement(
                        "img",
                        {
                            className:"video-thumb",

                            src:
                                video.thumbnail
                                ?
                                `${API_URL}/stream/${video.thumbnail}`
                                :
                                "https://placehold.co/600x400/111/444?text=No+Preview"
                        }
                    ),

                    React.createElement(
                        "div",
                        {
                            className:"video-info"
                        },

                        React.createElement(
                            "img",
                            {
                                className:"video-avatar",

                                src:

                                    video.avatar

                                    ?

                                    `${API_URL}/avatar/view/${video.avatar}`

                                    :

                                    "https://cdn-icons-png.flaticon.com/512/149/149071.png"
                            }
                        ),

                        React.createElement(
                            "div",
                            {
                                className:"video-details"
                            },

                            React.createElement(
                                "div",
                                {
                                    className:"video-title"
                                },

                                video.title
                            ),

                            React.createElement(
    "div",
    {
        className:"video-author",

        onClick:(e)=>{

            e.stopPropagation();

            setProfileUser(
                video.author
            );

            fetch(
                `${API_URL}/user/${video.author}`
            )
            .then(res=>res.json())
            .then(data=>{

                if(data.avatar){

                    setAvatar(
                        data.avatar
                    );

                }else{

                    setAvatar("");
                }
            });
        },

        style:{
            cursor:"pointer"
        }
    },

    video.author
),

                            React.createElement(
                                "div",
                                {
                                    className:"video-actions"
                                },

                                React.createElement(
                                    "button",
                                    {
                                        className:"like-btn",

                                        onClick:(e)=>{

                                            e.stopPropagation();

                                            likeVideo(video.id);
                                        }
                                    },

                                    `👍 ${video.likes || 0}`
                                ),

                                React.createElement(
                                    "button",
                                    {
                                        className:"dislike-btn",

                                        onClick:(e)=>{

                                            e.stopPropagation();

                                            dislikeVideo(video.id);
                                        }
                                    },

                                    `👎 ${video.dislikes || 0}`
                                )
                            )
                        )
                    )
                )
            )
        ),

        selectedVideo &&

        React.createElement(
            "div",
            {
                className:"video-modal",

                onClick:()=>
                    setSelectedVideo(null),

                style:{
                    position:"fixed",
                    inset:"0",
                    background:"rgba(0,0,0,0.9)",
                    display:"flex",
                    justifyContent:"center",
                    alignItems:"center",
                    zIndex:"9999"
                }
            },

            React.createElement(
                "div",
                {
                    className:"modal-content",

                    onClick:(e)=>
                        e.stopPropagation(),

                    style:{
                        width:"900px",
                        background:"#111",
                        borderRadius:"20px",
                        overflow:"hidden"
                    }
                },

                React.createElement(
                    "video",
                    {
                        className:"modal-video",

                        controls:true,

                        autoPlay:true,

                        src:
                            `${API_URL}/stream/${selectedVideo.filename}`,

                        style:{
                            width:"100%"
                        }
                    }
                ),

                React.createElement(
                    "div",
                    {
                        style:{
                            padding:"20px",
                            color:"#fff"
                        }
                    },

                    React.createElement(
                        "h2",
                        null,
                        selectedVideo.title
                    ),

                    React.createElement(
                        "p",
                        {
                            style:{
                                color:"#aaa"
                            }
                        },

                        selectedVideo.author
                    )
                )
            )
        )
    );
}

root.render(
    React.createElement(App)
);