/**
 * Created by nicanor.gutierrez on 20/02/14.
 */

$(function () {
    window.swaggerUi = new SwaggerUi({
        url: "http://localhost:3000/api-docs.json",
        dom_id: "swagger-ui-container",
        supportedSubmitMethods: ['get', 'post', 'put', 'delete'],
        onComplete: function(swaggerApi, swaggerUi){
            log("Loaded SwaggerUI")
            $('pre code').each(function(i, e) {hljs.highlightBlock(e)});
        },
        onFailure: function(data) {
            log("Unable to Load SwaggerUI");
        },
        docExpansion: "none"
    });

    $('#input_apiKey').change(function() {
        var key = $('#input_apiKey')[0].value;
        log("key: " + key);
        if(key && key.trim() != "") {
            log("added key " + key);
            window.authorizations.add("key", new ApiKeyAuthorization("api_key", key, "query"));
        }
    })
    window.swaggerUi.load();
});
