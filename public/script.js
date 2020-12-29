if (document.readyState !== 'loading') {
    ready();
} else {
    document.addEventListener('DOMContentLoaded', ready);
}

function ready () {
    getBlogposts('/get-posts');

    // send posts to server
    var form = document.querySelector('form');
    form.addEventListener('submit', function (event) {

        event.preventDefault(); // prevents the form from contacting our server automatically (we want to do it ourselves)
        var formActionUrl = form.action; // 'form.action' is the url '/create-post'
        var formData = new FormData(form);

        postBlogposts(formActionUrl, formData);
    });
}

/****
 * Function definitions
 ***/
function postBlogposts (url, data) {
    fetch(url, {
        method: 'POST',
        body: data
    })
    .then(function (res) {
        res.json()
            .then(function (json) {
                console.log(json);
                addBlogpostsToPage(json);
                document.querySelector('form').reset();
        })
    })
    .catch(function (err) {
        console.error(err)
    });
}

function getBlogposts (url) {
    fetch(url, {
        method: 'GET'
    })
    .then(function (res) {
        res.json()
        .then(function (json) {
            console.log(json);
            addBlogpostsToPage(json);
        });
    })
    .catch(function (err) {
        console.error(err)
    });
}

function addBlogpostsToPage (data) {
    for (var blogpost in data) {
        if (data.hasOwnProperty(blogpost)) {

            var postDiv         = document.createElement('div');
            var postDate        = document.createElement('p');
            var postText        = document.createElement('p');
            var thumbnail       = document.createElement('img');
            var postContainer   = document.querySelector('.post-container');

            const blogpostDate = new Date(parseInt(Object.keys(data[blogpost])[0])); //TODO find out what these do
            const blogpostText = Object.values(data[blogpost])[0];

            thumbnail.src = "./howlsCastle.jpeg";
            thumbnail.className = "thumbnail";
            postDate.innerText = blogpostDate;
            postText.innerHTML = blogpostText;
            postDiv.className = "post";

            postDiv.appendChild(thumbnail);
            postDiv.appendChild(postDate);
            postDiv.appendChild(postText);
            postContainer.appendChild(postDiv);
        }
    }
}
