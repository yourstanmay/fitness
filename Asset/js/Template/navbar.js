$(function () {
    var bar = '';
 bar += '<center>';
 bar += '   <!-- NavBar -->                  ';
 bar += '   <nav class="navbar fixed-top navbar-expand-lg navbar-dark bg-dark"  >                   ';
 bar += '   <div class="container-fluid">                   ';
 bar += '       <a class="navbar-brand" href="/">                   ';
 bar += '       <img src="Asset/img/iconfit.png" alt="" width="37" height="35" class="d-inline-block align-text-top rounded-circle">                    ';
 bar += '       YoursTanmay&nbsp;<span class="badge bg-light text-dark">Fitness</span>                 ';
 bar += '       </a>                    ';
 bar += '       <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">                    ';
 bar += '       <span class="navbar-toggler-icon"></span>                   ';
 bar += '       </button>                   ';
 bar += '       <div class="collapse navbar-collapse" id="navbarSupportedContent">                  ';
 bar += '       <ul class="navbar-nav me-auto mb-2 mb-lg-0">                    ';
 bar += '           <li class="nav-item">                   ';
 bar += '           <a class="nav-link active" aria-current="page" href="#DietPlan"><i class="fas fa-utensils"></i> Diet Plan</a>                    ';
 bar += '           </li>                   ';
 bar += '           <li class="nav-item">                   ';
 bar += '           <a class="nav-link active" aria-current="page" href="#WorkOut"><i class="fas fa-dumbbell"></i> WorkOut</a>                    ';
 bar += '           </li>                   ';
 bar += '           <li class="nav-item">                   ';
 bar += '           <a class="nav-link active" aria-current="page" href="#CDietPlan"><i class="fas fa-star"></i> Celebrities Diet</a>                    ';
 bar += '           </li>                   ';
 bar += '           </li>                   ';
 bar += '           <li class="nav-item">                   ';
 bar += '           <a class="nav-link active" aria-current="page" href="#Nutrition&Calories"><i class="fas fa-apple-alt"></i> Nutrition & Calories</a>                    ';
 bar += '           </li>                   ';

 
 bar += '       </ul>                   ';
 bar += '          <a class="nav-link active text-light" aria-current="page" href="mailto:yourstanmay97@gmail.com" target="_blank"><i class="fas fa-envelope"></i> Contact Me</a>                 ';
 bar += '       </div>                  ';
 bar += '   </div>                  ';
 bar += '   </nav>                  ';
 bar += '</center>';

    $("#navbar").html(bar);

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