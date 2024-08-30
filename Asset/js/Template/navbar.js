$(function () {
    var bar = '';
 bar += '<center>';
 bar += '   <!-- NavBar -->                  ';
 bar += '   <nav class="navbar fixed-top navbar-expand-lg navbar-dark bg-dark"  >                   ';
 bar += '   <div class="container-fluid">                   ';
 bar += '       <a class="navbar-brand" href="#">                   ';
 bar += '       <img src="Asset/img/iconfit.png" alt="" width="37" height="35" class="d-inline-block align-text-top rounded-circle">                    ';
 bar += '       YoursTanmay&nbsp;<span class="badge bg-light text-dark">Fitness</span>                 ';
 bar += '       </a>                    ';
 bar += '       <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">                    ';
 bar += '       <span class="navbar-toggler-icon"></span>                   ';
 bar += '       </button>                   ';
 bar += '       <div class="collapse navbar-collapse" id="navbarSupportedContent">                  ';
 bar += '       <ul class="navbar-nav me-auto mb-2 mb-lg-0">                    ';
 bar += '           <li class="nav-item">                   ';
 bar += '           <a class="nav-link active" aria-current="page" href="#DietPlan">Diet Plan</a>                    ';
 bar += '           </li>                   ';
 bar += '           <li class="nav-item">                   ';
 bar += '           <a class="nav-link active" aria-current="page" href="#WorkOut">WorkOut</a>                    ';
 bar += '           </li>                   ';
 bar += '           <li class="nav-item">                   ';
 bar += '           <a class="nav-link active" aria-current="page" href="#CDietPlan">Celebrities Diet</a>                    ';
 bar += '           </li>                   ';
 bar += '           </li>                   ';
 bar += '           <li class="nav-item">                   ';
 bar += '           <a class="nav-link active" aria-current="page" href="#Nutrition&Calories">Nutrition & Calories</a>                    ';
 bar += '           </li>                   ';

 
 bar += '       </ul>                   ';
 bar += '          <a class="nav-link active text-light" aria-current="page" href="mailto:yourstanmay97@gmail.com" target="_blank">☎Contact Me</a>                 ';
 bar += '       </div>                  ';
 bar += '   </div>                  ';
 bar += '   </nav>                  ';
 bar += '</center>';

    $("#navbar").html(bar);

var id = getValueByName("id");
$("#" + id).addClass("active");
});

function getValueByName(name) {
var url = document.getElementById('nav-bar').getAttribute('src');
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
}