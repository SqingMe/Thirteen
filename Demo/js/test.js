var namespace = {
    data: null
}
Object.defineProperties(namespace, {
    data: {
        configurable: true,
        get: function () {
                console.log("a");
                return "a";
            },
        set: function (data) {
            createDom(data);
        }
    }
});


$(function () {
    getData();
});

function getData(id) {
    $.ajax({
        url: "http://localhost:8080/TestServer/test/" + (id || 1),
        type: "get",
        async: false,
        success: function (data) {
            namespace.data = data.data;
            console.log(data)
        }
    })
}
function createDom(data){
   $.each(data,function (i,o) {
       console.log(o)
       var li = $("<li></li>").text(o.industryval).data("data",o);
       $(".container").append(li);
   })
}