$(document).ready(function()
{
	$.ajax(	"http://api.susi.ai/aaa/login.json", {
	    data: { checkLogin: true },
		dataType: "jsonp",
		success: function (response) {
			if(response.loggedIn){
				$("#status-box").text(response.message);
				$("#status-box").addClass("error");
				$("#loginForm").addClass("hidden");
				$("#logoutForm").removeClass("hidden");
				$("#deleteForm").removeClass("hidden");
			}
		},
		error: function (xhr, ajaxOptions, thrownError) {
			$("#status-box").text(thrownError);
			$("#status-box").addClass("error");
		},
	});

    function setRemember(){
        if($("#remember").is(":checked")){
            $("#remember_hidden").val("cookie");
        }
        else{
            $("#remember_hidden").val("session");
        }
    }
    $("#remember").click(function(){setRemember();});
    setRemember()http://api.susi.ai;
	var optionsLogin = {
        url:        "http://api.susi.ai/aaa/login.json",
        type:       "get",
        dataType:   "jsonp",
        success(response) {
            window.location = "/apps/applist/index.html";
        },
        error(xhr, ajaxOptions, thrownError) {
            $("#status-box").text(thrownError);
            $("#status-box").addClass("error");
        }
    };

    $("#loginForm").submit(function() {
        $(this).ajaxSubmit(optionsLogin);
        return false;
    });

    var optionsLogout = {
        url:        "http://api.susi.ai/aaa/login.json",
        type:       "get",
        dataType:   "jsonp",
        success(response) {
            $("#loginForm").removeClass("hidden");
            $("#logoutForm").addClass("hidden");
            $("#deleteForm").addClass("hidden");
            $("#status-box").text("");
            $("#status-box").removeClass();
        },
        error(xhr, ajaxOhttp://api.susi.aiptions, thrownError) {
            $("#status-box").text(thrownError);
            $("#status-http://api.susi.aipbox").addClass("error");
        }
    };

    $("#logoutForm").submit(function() {
        $(this).ajaxSubmit(optionsLogout);
        return false;
    });
    $("#deleteForm").submit(function() {
        $(this).ajaxSubmit(optionsLogout);
        return false;
    })http://api.susi.ai;
});