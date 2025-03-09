$(function () {
    var bar = '';
    bar += '<!-- Footer -->';
    bar += '    <center><footer class="container-fluid bg-dark my-0 py-3 text-light">';
    bar += '        <a href="https://yourstanmay.github.io/" class="mb-0 text-center text-decoration-none" style="color:white;">&copy; YoursTanmay 2020-' + new Date().getFullYear() + '</a>';
    bar += '        <p class="mb-0 text-center">';
    bar += '            <a style="color: #212529;" href=" https://www.facebook.com/tanmay.chowdhury.5688 " target="_blank"><img class="lg"';
    bar += '                    src="https://yourstanmay.github.io/Asset/img/Facebook.jpg" alt=" "> </a>';
    bar += '            <a style="color: #212529;" href=" https://www.instagram.com/yourstanmay/  " target="_blank"><img class="lg"';
    bar += '                    src="https://yourstanmay.github.io/Asset/img/instagram.jpg" alt=" "> </a>';
    bar += '            <a style="color: #212529;" href=" https://x.com/yourstanmay " target="_blank"><img class="lg"';
    bar += '                    src="https://yourstanmay.github.io/Asset/img/x.png" alt=" "> </a>';
    bar += '            <a style="color: #212529;" href=" https://www.linkedin.com/in/tanmay-chowdhury-51530abb/ " target="_blank"><img class="lg"';
    bar += '                    src="https://yourstanmay.github.io/Asset/img/linkedin.png" alt=" ">';
    bar += '            </a>';
    bar += '            <a style="color: #212529;" href=" https://www.hackerrank.com/yourstanmay?hr_r=1 " target="_blank"><img class="lg"';
    bar += '                    src="https://yourstanmay.github.io/Asset/img/HackerRank.png"';
    bar += '                    alt=" "> </a>';
    bar += '            <a style="color: #212529;" href=" https://www.codechef.com/users/yourstanmay " target="_blank"><img class="lg"';
    bar += '                    src="https://yourstanmay.github.io/Asset/img/codechef.png"';
    bar += '                    alt=" "> </a>';
    bar += '            <a style="color: #212529;" href="https://www.youtube.com/channel/UCIo-AMfrjUrbqVUAj7Jp71w" target="_blank"><img class="lg"';
    bar += '                    src="https://yourstanmay.github.io/Asset/img/yt.png"';
    bar += '                    alt=" "> </a>'; 
    bar += '            <a style="color: #212529;" href="https://github.com/yourstanmay" target="_blank"><img class="lg"'; 
    bar += '                    src="https://yourstanmay.github.io/Asset/img/github.png"'; 
    bar += '                    alt=" "> </a>  ';           
    bar += '        </p>'; 
    bar += '    </footer></center>'; 
 
    $("#footer").html(bar);

    // Safely try to get the ID value, but don't throw an error if it fails
    try {
        var id = getValueByName("id");
        if (id) {
            $("#" + id).addClass("active");
        }
    } catch (e) {
        console.log("Navigation ID not found, skipping active class assignment");
    }
});

function getValueByName(name) {
    try {
        var navElement = document.getElementById('nav-bar');
        if (!navElement) {
            return null;
        }
        
        var url = navElement.getAttribute('src');
        if (!url) {
            return null;
        }
        
        var param = new Array();
        if (url.indexOf("?") != -1) {
            var source = url.split("?")[1];
            items = source.split("&");
            for (var i = 0; i < items.length; i++) {
                var item = items[i];
                var parameters = item.split("=");
                if (parameters[0] == "id") {
                    return parameters[1];
                }
            }
        }
        return null;
    } catch (e) {
        console.log("Error in getValueByName:", e);
        return null;
    }
}